// The eight services shown on the flexboard.
//
// Images are AI-generated illustrations reused from the flexboard — they are
// labelled "illustrative" on the site. Replace them with real photos later by
// dropping new files into src/assets/services/ with the same names.
//
// `items` (optional) lists individual services inside a category. Leave it empty
// until the owner confirms the menu. Each item: { name: 'Eyebrows', price: null }.
// `price` is a display string such as '₹50' or 'from ₹500'. Prices only appear
// when `showPrices` is true in business.js.

import threading from '../assets/services/threading.webp';
import facial from '../assets/services/facial.webp';
import waxing from '../assets/services/waxing.webp';
import hairstyling from '../assets/services/hairstyling.webp';
import manicure from '../assets/services/manicure.webp';
import pedicure from '../assets/services/pedicure.webp';
import mehndi from '../assets/services/mehndi.webp';
import bridal from '../assets/services/bridal.webp';

export const services = [
  {
    id: 'threading',
    name: 'Threading',
    image: threading,
    description: 'Eyebrow shaping and facial hair removal with thread.',
    items: [],
  },
  {
    id: 'facial',
    name: 'Facial',
    image: facial,
    description: 'Cleansing and facial treatments for fresh, cared-for skin.',
    items: [],
  },
  {
    id: 'waxing',
    name: 'Waxing',
    image: waxing,
    description: 'Hair removal for arms, legs and more.',
    items: [],
  },
  {
    id: 'hair-styling',
    name: 'Hair Styling',
    image: hairstyling,
    description: 'Blow-dry, styling and hair care.',
    items: [],
  },
  {
    id: 'manicure',
    name: 'Manicure',
    image: manicure,
    description: 'Hand and nail care for neat, polished nails.',
    items: [],
  },
  {
    id: 'pedicure',
    name: 'Pedicure',
    image: pedicure,
    description: 'Relaxing foot soak, nail and skin care.',
    items: [],
  },
  {
    id: 'mehndi',
    name: 'Mehndi Art',
    image: mehndi,
    description: 'Mehndi designs for festivals, functions and weddings.',
    items: [],
  },
  {
    id: 'bridal',
    name: 'Bridal Makeup',
    image: bridal,
    description: 'Makeup and styling for brides and wedding functions.',
    items: [],
  },
];

// Time preferences offered in the booking form. Labels avoid exact clock times
// because the parlour's hours aren't finalised yet.
export const timeSlots = ['Morning', 'Afternoon', 'Evening', 'Any time'];
