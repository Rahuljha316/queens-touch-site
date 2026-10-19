import { business, links } from '../data/business';
import { services } from '../data/services';

// Adds schema.org BeautySalon data so Google understands the business.
// Only includes fields that are actually known (no invented hours or ratings).
export function injectStructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: business.name,
    description: `${business.tagline} in ${business.address.line2}, ${business.address.city}.`,
    telephone: business.phoneE164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.line1,
      addressLocality: business.address.line2,
      addressRegion: business.address.city,
      addressCountry: 'IN',
      ...(business.address.pincode && { postalCode: business.address.pincode }),
    },
    hasMap: links.directions,
    ...(business.hoursSchema && { openingHours: business.hoursSchema }),
    ...(business.geo && {
      geo: { '@type': 'GeoCoordinates', latitude: business.geo.lat, longitude: business.geo.lng },
    }),
    knowsAbout: services.map((s) => s.name),
    ...(business.socials.length && { sameAs: business.socials.map((s) => s.url) }),
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}
