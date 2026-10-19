import { business } from '../data/business';
import { services } from '../data/services';
import { emailConfigured } from './booking';

// Lists business details that are still placeholders. Shown only during development.
export function missingSetupItems() {
  const missing = [];
  if (!business.hours) missing.push('Opening hours (business.js → hours)');
  if (!business.geo && !business.mapsUrl) missing.push('Exact map pin (business.js → geo or mapsUrl)');
  if (!business.showPrices) missing.push('Prices hidden (services.js → price, business.js → showPrices)');
  if (services.every((s) => s.items.length === 0)) missing.push('Detailed service menu (services.js → items)');
  if (!emailConfigured) missing.push('Email notifications (.env → VITE_WEB3FORMS_KEY)');
  return missing;
}
