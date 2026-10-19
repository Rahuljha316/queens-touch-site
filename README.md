# Queen's Touch – website

Single-page site for Queen's Touch Ladies Beauty Parlour (Sector 22, Rohini).
React + Vite + JavaScript, CSS Modules, no backend.

## Run

```bash
npm install          # first time only
npm run dev          # http://localhost:5173 on this computer
npm run dev:phone    # also reachable from a phone on the same Wi-Fi (use the "Network" URL it prints)
npm run build        # production build into dist/
npm run preview      # serve dist/ locally (also on the network) to check the build
```

In development, a yellow **"Setup: N to do"** pill (bottom-left) lists every detail that is still a
placeholder. It never appears on the live site.

## Where to change things

| What | File |
| --- | --- |
| Phone, WhatsApp, address, hours, Maps link, owner info, socials, show/hide prices | `src/data/business.js` |
| Services, descriptions, sub-items, prices, booking time options | `src/data/services.js` |
| Service photos | `src/assets/services/*.webp` (keep the same names, square ~400×400) |
| Hero image | `src/assets/hero.webp` |
| Colours, fonts, spacing | `src/styles/tokens.css` |
| Page title, description, social preview | `index.html`, `public/og-image.jpg` |

**Prices:** add `items: [{ name: 'Eyebrows', price: '₹50' }]` to a service in `services.js`, then set
`showPrices: true` in `business.js`.

## Booking flow

1. The customer fills the form, which is validated in the browser.
2. The customer sees a review screen with a **Send request on WhatsApp** button. It opens WhatsApp with the
   details typed in, and the customer must press Send. The site never claims the message was sent.
3. At the same time, if `VITE_WEB3FORMS_KEY` is set, an email copy goes to the parlour through
   [Web3Forms](https://web3forms.com) (free, 250/month). Failures are shown with a retry button.
   Identical repeat submissions are not emailed twice.
4. The site always says this is a **request**. The owner confirms on WhatsApp or by phone.

### Email setup

1. Go to https://web3forms.com, enter the parlour's email address and get the access key from that inbox.
2. Copy `.env.example` to `.env` and paste the key: `VITE_WEB3FORMS_KEY=xxxxxxxx-...`
3. Restart `npm run dev`. On the hosting site, add the same variable under environment variables.

## Deploy (free)

Netlify or Cloudflare Pages: connect the GitHub repo, build command `npm run build`, output folder `dist`,
and add the env variable `VITE_WEB3FORMS_KEY`. After connecting a domain, add the canonical/og:url tags
noted in `index.html` and make the og:image URL absolute.

Images in `src/assets` are AI-generated illustrations from the flexboard and are labelled "illustrative"
on the site. Replace them with real photos of the parlour's work when available.
