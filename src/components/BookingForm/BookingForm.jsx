import { useEffect, useRef, useState } from 'react';
import { business, links } from '../../data/business';
import { services, timeSlots } from '../../data/services';
import {
  addDaysISO,
  emailConfigured,
  formatDate,
  normalizeIndianMobile,
  sendEmailNotification,
  todayISO,
  validate,
  whatsAppLink,
} from '../../lib/booking';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import SectionTitle from '../ui/SectionTitle';
import styles from './BookingForm.module.css';

const EMPTY = { name: '', phone: '', service: '', date: '', time: '', message: '' };
const FIELD_ORDER = ['name', 'phone', 'service', 'date', 'time', 'message'];
const OTHER_SERVICE = 'Other / not sure';

export default function BookingForm({ preselect }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null); // snapshot of values once validated
  const [email, setEmail] = useState({ status: 'idle' }); // idle | sending | sent | failed
  const [waOpened, setWaOpened] = useState(false);
  const [botcheck, setBotcheck] = useState(false);

  const formRef = useRef(null);
  const reviewRef = useRef(null);
  const sending = useRef(false);
  const lastEmailed = useRef(null); // key of the last request emailed successfully

  // A service card's "Request" link pre-fills the service.
  useEffect(() => {
    if (!preselect) return;
    setValues((v) => ({ ...v, service: preselect.name }));
    setErrors((e) => ({ ...e, service: undefined }));
    setSubmitted(null);
  }, [preselect]);

  useEffect(() => {
    if (submitted) reviewRef.current?.focus();
  }, [submitted]);

  const today = todayISO();

  function update(e) {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    // Once a field has shown an error, re-check it as the user types.
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: validate(next)[name] }));
  }

  async function emailRequest(snapshot) {
    const key = JSON.stringify({ ...snapshot, phone: normalizeIndianMobile(snapshot.phone) });
    if (!emailConfigured || botcheck || sending.current || lastEmailed.current === key) return;

    sending.current = true;
    setEmail({ status: 'sending' });
    const result = await sendEmailNotification(snapshot, botcheck);
    sending.current = false;

    if (result.ok) {
      lastEmailed.current = key;
      setEmail({ status: 'sent' });
    } else {
      setEmail({ status: 'failed', error: result.error });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (sending.current) return;

    const found = validate(values);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((f) => found[f]);
    if (firstInvalid) {
      formRef.current.elements[firstInvalid]?.focus();
      return;
    }

    const snapshot = { ...values };
    setSubmitted(snapshot);
    setWaOpened(false);
    emailRequest(snapshot);
  }

  function startOver() {
    setValues(EMPTY);
    setErrors({});
    setSubmitted(null);
    setEmail({ status: 'idle' });
  }

  function fieldProps(name) {
    return {
      id: `book-${name}`,
      name,
      value: values[name],
      onChange: update,
      'aria-invalid': errors[name] ? true : undefined,
      'aria-describedby': errors[name] ? `book-${name}-error` : undefined,
    };
  }

  const error = (name) =>
    errors[name] && (
      <p id={`book-${name}-error`} className={styles.error}>
        {errors[name]}
      </p>
    );

  return (
    <section id="book" className={styles.section} aria-labelledby="book-title">
      <div className="container">
        <SectionTitle
          id="book-title"
          eyebrow="Book your"
          intro="Fill in your details and send them to us on WhatsApp. We'll reply to confirm your appointment."
        >
          Appointment
        </SectionTitle>

        <div className={styles.card}>
          {submitted ? (
            <div className={styles.review}>
              <h3 ref={reviewRef} tabIndex={-1} className={styles.reviewTitle}>
                Almost done — your request is not sent yet
              </h3>

              <ol className={styles.steps}>
                <li>
                  <p>
                    Tap the button below. WhatsApp will open with your details already typed.{' '}
                    <strong>Press Send in WhatsApp</strong> to send your request to us.
                  </p>
                  <Button
                    href={whatsAppLink(submitted)}
                    variant="whatsapp"
                    className={styles.waButton}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setWaOpened(true)}
                  >
                    <Icon name="whatsapp" /> Send request on WhatsApp
                  </Button>
                  {waOpened && (
                    <p className={styles.hint}>
                      Didn&apos;t see WhatsApp open, or not using WhatsApp? Call us on{' '}
                      <a href={links.call}>{business.phoneDisplay}</a>.
                    </p>
                  )}
                </li>
              </ol>

              <EmailStatus email={email} onRetry={() => emailRequest(submitted)} />

              <dl className={styles.summary}>
                <dt>Name</dt>
                <dd>{submitted.name.trim()}</dd>
                <dt>Phone</dt>
                <dd>{normalizeIndianMobile(submitted.phone)}</dd>
                <dt>Service</dt>
                <dd>{submitted.service}</dd>
                <dt>Preferred</dt>
                <dd>
                  {formatDate(submitted.date)}, {submitted.time}
                </dd>
                {submitted.message.trim() && (
                  <>
                    <dt>Message</dt>
                    <dd>{submitted.message.trim()}</dd>
                  </>
                )}
              </dl>

              <p className={styles.notice}>
                <strong>This is a request, not a confirmed booking.</strong> Your appointment is confirmed only when we
                reply on WhatsApp or call you.
              </p>

              <div className={styles.reviewActions}>
                <Button variant="outline" size="small" onClick={() => setSubmitted(null)}>
                  Edit details
                </Button>
                <Button variant="ghost" size="small" onClick={startOver}>
                  New request
                </Button>
              </div>
            </div>
          ) : (
            <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label htmlFor="book-name">Your name</label>
                <input {...fieldProps('name')} type="text" autoComplete="name" maxLength={60} />
                {error('name')}
              </div>

              <div className={styles.field}>
                <label htmlFor="book-phone">Mobile number</label>
                <input
                  {...fieldProps('phone')}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="10-digit number"
                  maxLength={16}
                />
                {error('phone')}
              </div>

              <div className={styles.field}>
                <label htmlFor="book-service">Service</label>
                <select {...fieldProps('service')}>
                  <option value="" disabled>
                    Choose a service
                  </option>
                  {services.map((s) => (
                    <option key={s.id}>{s.name}</option>
                  ))}
                  <option>{OTHER_SERVICE}</option>
                </select>
                {error('service')}
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="book-date">Preferred date</label>
                  <input {...fieldProps('date')} type="date" min={today} max={addDaysISO(today, 90)} />
                  {error('date')}
                </div>

                <div className={styles.field}>
                  <label htmlFor="book-time">Preferred time</label>
                  <select {...fieldProps('time')}>
                    <option value="" disabled>
                      Choose
                    </option>
                    {timeSlots.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  {error('time')}
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="book-message">
                  Message <span className={styles.optional}>(optional)</span>
                </label>
                <textarea
                  {...fieldProps('message')}
                  rows={3}
                  maxLength={500}
                  placeholder="e.g. bridal trial, number of people, any questions"
                />
                {error('message')}
              </div>

              {/* Honeypot for spam bots — hidden from people and screen readers. */}
              <input
                type="checkbox"
                name="botcheck"
                className={styles.honeypot}
                tabIndex={-1}
                aria-hidden="true"
                checked={botcheck}
                onChange={(e) => setBotcheck(e.target.checked)}
              />

              <Button type="submit" className={styles.submit}>
                Continue
              </Button>
              <p className={styles.small}>
                Next, you&apos;ll send your request to us on WhatsApp. We reply to confirm the time.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function EmailStatus({ email, onRetry }) {
  if (!emailConfigured) {
    return import.meta.env.DEV ? (
      <p className={`${styles.emailStatus} ${styles.dev}`}>
        Dev note: email copy is off — add VITE_WEB3FORMS_KEY to .env to turn it on.
      </p>
    ) : null;
  }

  return (
    <div className={styles.emailStatus} role="status" aria-live="polite">
      {email.status === 'sending' && <p>Also emailing a copy of your request to the parlour…</p>}
      {email.status === 'sent' && <p className={styles.ok}>✓ A copy of your request was also emailed to the parlour.</p>}
      {email.status === 'failed' && (
        <>
          <p className={styles.fail}>
            We couldn&apos;t email a copy of your request
            {email.error === 'network' ? ' (no internet connection)' : ''}. Please send it on WhatsApp, or call{' '}
            <a href={links.call}>{business.phoneDisplay}</a>.
          </p>
          <Button variant="ghost" size="small" onClick={onRetry}>
            Try email again
          </Button>
        </>
      )}
    </div>
  );
}
