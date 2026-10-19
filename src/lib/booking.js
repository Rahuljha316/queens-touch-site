import { business, links } from '../data/business';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY?.trim() || '';
export const emailConfigured = WEB3FORMS_KEY.length > 0;

// Accepts 98765 43210, +91 98765 43210, 098765-43210 … and returns 10 digits or null.
export function normalizeIndianMobile(input) {
  let digits = input.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

export function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export function addDaysISO(iso, days) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function formatDate(iso) {
  const d = new Date(`${iso}T00:00:00`);
  const part = (opts) => d.toLocaleDateString('en-IN', opts);
  return `${part({ weekday: 'short' })}, ${part({ day: 'numeric' })} ${part({ month: 'short' })} ${part({ year: 'numeric' })}`;
}

export function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!normalizeIndianMobile(values.phone)) errors.phone = 'Please enter a valid 10-digit mobile number.';
  if (!values.service) errors.service = 'Please choose a service.';
  if (!values.date) errors.date = 'Please choose a preferred date.';
  else if (values.date < todayISO()) errors.date = 'Please choose today or a later date.';
  if (!values.time) errors.time = 'Please choose a preferred time.';
  if (values.message.length > 500) errors.message = 'Please keep the message under 500 characters.';
  return errors;
}

export function buildWhatsAppMessage(v) {
  const lines = [
    `Hello ${business.name}, I'd like to request an appointment.`,
    '',
    `*Name:* ${v.name.trim()}`,
    `*Phone:* ${normalizeIndianMobile(v.phone)}`,
    `*Service:* ${v.service}`,
    `*Preferred date:* ${formatDate(v.date)}`,
    `*Preferred time:* ${v.time}`,
  ];
  if (v.message.trim()) lines.push(`*Message:* ${v.message.trim()}`);
  lines.push('', 'Please confirm if this slot is available. Thank you!');
  return lines.join('\n');
}

export function whatsAppLink(values) {
  return links.whatsapp(buildWhatsAppMessage(values));
}

// Sends an email copy of the request to the parlour via Web3Forms.
// Resolves to { ok: true } or { ok: false, error }. Never throws.
export async function sendEmailNotification(values, botcheck) {
  if (!emailConfigured) return { ok: false, error: 'not-configured' };
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `Appointment request: ${values.service} – ${formatDate(values.date)}`,
        from_name: `${business.name} website`,
        Name: values.name.trim(),
        Phone: normalizeIndianMobile(values.phone),
        Service: values.service,
        'Preferred date': formatDate(values.date),
        'Preferred time': values.time,
        Message: values.message.trim() || '—',
        Note: 'This is a REQUEST, not a confirmed booking. Please call or WhatsApp the customer to confirm.',
        botcheck,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) return { ok: true };
    return { ok: false, error: data.message || `Server responded ${res.status}` };
  } catch {
    return { ok: false, error: 'network' };
  }
}
