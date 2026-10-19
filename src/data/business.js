// All parlour details live here. Change a value, save, and the whole site updates.
//
// A value of `null` means "not known yet". The site then shows an honest
// fallback (e.g. "Call to check timings") instead of made-up information.
// In development (npm run dev) a "Setup checklist" pill lists everything still null.

export const business = {
  name: "Queen's Touch",
  tagline: 'Ladies Beauty Parlour',
  taglineHi: 'लेडीज़ ब्यूटी पार्लर',

  // From the flexboard. Verify the number opens WhatsApp before going live.
  phoneDisplay: '+91 91724 13514',
  phoneE164: '+919172413514', // used for tel: links
  whatsappNumber: '919172413514', // country code + number, digits only (wa.me format)

  address: {
    line1: '121–122, 2nd Floor, Pocket 16A',
    line2: 'Sector 22, Rohini',
    city: 'New Delhi',
    pincode: '110086',
  },

  // Exact pin. Stand inside the parlour, open Google Maps on the phone, long-press
  // the blue dot, and copy the two numbers shown, e.g. { lat: 28.71773, lng: 77.05433 }.
  // While null, the map and directions use the address text above.
  geo: { lat: 28.717986, lng: 77.0545468 },

  // Once the Google Business Profile is live, paste its "Share → Copy link" URL here
  // so "Get directions" opens the parlour's own listing (with its reviews).
  mapsUrl: null,

  // Shown on the site. `hoursSchema` is the same timing in Google's format
  // (Mo-Su = every day, 24-hour clock) — update both together.
  hours: [{ days: 'Every day', time: '9:00 am – 9:00 pm' }],
  hoursSchema: 'Mo-Su 09:00-21:00',
  hoursNote: 'Open all 7 days',

  // Kept private on purpose (owner's choice). Fill in only if that changes.
  owner: {
    name: null,
    yearsOfExperience: null,
    photo: null, // e.g. import ownerPhoto from '../assets/owner.webp'
  },

  // Add later, e.g. { label: 'Instagram', url: 'https://instagram.com/...' }
  socials: [],

  // Prices are hidden until the owner finalises them. Set to true after
  // filling `price` values in services.js.
  showPrices: false,
};

const fullAddress = [business.address.line1, business.address.line2, business.address.city, business.address.pincode]
  .filter(Boolean)
  .join(', ');

// Exact coordinates when known, otherwise the address text.
const mapQuery = business.geo ? `${business.geo.lat},${business.geo.lng}` : fullAddress;

export const links = {
  call: `tel:${business.phoneE164}`,
  whatsapp: (text = '') =>
    `https://wa.me/${business.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`,
  directions:
    business.mapsUrl ?? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`,
  mapEmbed: `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=17&output=embed`,
};

export { fullAddress };
