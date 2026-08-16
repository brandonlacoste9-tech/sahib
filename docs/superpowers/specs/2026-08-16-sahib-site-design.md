# Sahib.ca — 2026 live replacement

**Date:** 2026-08-16  
**Status:** draft for review  
**Type:** live marketing site (replaces Wix sahib.ca)  
**Stack:** Next.js (App Router) + next-intl + static JSON  
**Locales:** `en` · `fr` · `hi` (Hindi)

## Goal

Replace https://www.sahib.ca with a clean 2026 site that a guest on a phone can use to pick a location, read a menu, reserve, or order. Same business: award-winning West Island Indian restaurant + pub, two rooms, catering.

Success: someone lands from Google Maps, switches to FR or हिन्दी, finds Butter Chicken or a signature cocktail, and taps Reserve or Order without fighting Wix chrome.

## 2026 look (hard constraint)

This is a **visual replacement**, not a restyle of the Wix layout. If a screenshot could be mistaken for 2018 Wix or a stock “Indian restaurant” theme, it fails.

**Do**

- Editorial restaurant layout: one column ~1120px, huge section titles, lots of unused space
- Cream paper background, near-black ink, Sahib teal `#417586` as the only accent (links, chips, focus, active locale)
- Wordmark as-is (gold/teal logo). Do not redraw a trendy logotype
- Headings: high-contrast serif (Libre Baskerville or equivalent). Body/dishes: a current grotesque with tabular figures for prices
- Menus are **type**, not cards. Name left, price right, dotted or hairline leader optional, description under the name in smaller muted type
- Photography: only Sahib rooms and food. Full-bleed home hero, then restraint. Gallery is a tight two-tab grid
- Motion: 200–300ms fades/eases, `prefers-reduced-motion: reduce` disables them. No sliders, no autoplay video
- Color in OKLCH tokens. AA contrast on text and teal-on-cream
- Fluid type (`clamp`). Mobile first. Thumb bar on small screens: Reserve · Order · Menu

**Do not**

- Paisley, mandala watermarks, gold filigree, red-and-gold “Indian buffet” templates
- Dark steakhouse / neon pub clone
- Wix leftovers: skip-to-content dump, “Use tab to navigate”, `001.png` alt, `/copy-of-…` slugs, recaptcha newsletter walls
- Stock “holding hands” / “friends toasting” catering photos
- Boxed shadow cards, 12px grey body, centered everything
- Infinite image carousels

## Non-goals

- No CMS / admin login
- No in-house reservations or online ordering
- No blog, no birthday newsletter popup
- No separate mobile app
- No replacing TBDine, Libro, or the two order vendors

## Information architecture

Locales prefix every path: `/en`, `/fr`, `/hi`. First visit uses `Accept-Language` (`fr` → fr, `hi` → hi, else en). Choice is stored in a cookie and the URL.

| Path | Page |
|---|---|
| `/` | Home |
| `/menu` | Food menu |
| `/pub` | Pub / drinks |
| `/catering` | Catering + quote form |
| `/gallery` | Photo gallery |
| `/contact` | Both locations |

Legacy Wix URLs 301 to the new ones:

- `/restaurant-pub-menu` → `/en/pub`
- `/copy-of-contact-us-pointe-claire` → `/en/contact#dorval`
- `/contact-us` → `/en/contact#pointe-claire`
- `/menu` → `/en/menu`

**Header:** logo · Menu · Pub · Catering · Gallery · Contact · locale switch (EN / FR / हिन्दी).  
**Mobile thumb bar:** Reserve · Order · Menu. Reserve/Order open a two-button sheet (Pointe-Claire / Dorval).

## Pages

**Home**  
Two-location opener, 20 years, buffet (Pointe-Claire only, Wed–Sun 11:30–14:30), trivia Thursday 7pm Dorval ($50, max 6), gift certificates, Best of MTL badge if we have the asset. Primary CTAs: Reserve, Order, Menu. No Wix video player chrome.

**Food menu**  
Sticky section chips: Appetizers, Vegetarian, Tandoor, Seafood, Chicken, Lamb, Balti, Rice & bread, Sides, Desserts. Each item: localized name, localized description, price (CAD, two decimals), optional tags `vegan` | `vegetarian` | `gluten` | `favorite` | `spicy` | `hot`. Source: current Wix menu, copy-edited.

**Pub**  
Sections: Signatures, Classics, Mocktails, White wine, Red wine, Rosé, Beer, Gin, Rum, Tequila, Vodka, Whiskey, Digestifs, Specialty coffees. Signatures include the one-line recipe. Fix live errors (`CHADONNAY`, `SAUVIGNONS BLAN`, `CARBERNET`, `Jose Cuerco`, `Crown Royale`, `Jaegermeister`, `Austriche`, `$0.00` Mouton Cadet 750ml — omit or confirm price before publish). Collapse the two conflicting tap blocks into one list after we confirm tap list with the restaurant.

**Catering**  
Three blocks: weddings, corporate, private. Quote form: first name, last name, email, phone, guest count, occasion, notes. POST `/api/catering` emails `rajiv@sahib.ca`. Success and validation in the active locale. No recaptcha unless spam appears.

**Gallery**  
Tabs: Dorval | Pointe-Claire. Existing on-site photos only. Lightbox, keyboard close, no stock.

**Contact**  
Two cards.

| | Pointe-Claire | Dorval |
|---|---|---|
| Address | 225B Hymus Blvd, H9R 1G4 | 636 Chem. du Bord-du-Lac-Lakeshore, H9S 2B6 |
| Phone | 514.426.1121 | 514.307.2442 |
| Hours | Wed–Sun 11:30–22:00. Closed Mon–Tue | Tue–Sun 11:30–22:00. Closed Mon |
| Reserve | [TBDine](https://www.tbdine.com/book/restaurant/sahib?idApp=1390&language=en-us) | [Libro](https://widgets.libroreserve.com/WEB/QC014745582811/book) |
| Order | [orderonline.sahib.ca](http://orderonline.sahib.ca/) | [order-online.ai](https://sahibindianrestaurant.order-online.ai/) |
| Map | Google Maps pin | Google Maps pin |

Dorval note: outdoor seating not guaranteed. Email: `rajiv@sahib.ca`.

## Language

UI chrome, section titles, CTAs, form, hours, and dish **descriptions** exist in `en`, `fr`, and `hi`.

Dish **names** stay the names guests search (Butter Chicken, Naan, While My Sitar Gently Weeps) in all locales, with the localized description underneath. Hindi uses Devanagari for chrome and descriptions (`नैन`, not “Hinglish” UI). `lang` + `dir` on `<html>`. Locale switcher keeps the same page.

## Data

No database.

```
content/menu.json     // food sections + items
content/pub.json      // drinks
content/locations.ts  // addresses, hours, external URLs
messages/en.json
messages/fr.json
messages/hi.json
```

Item shape:

```json
{
  "id": "butter-chicken",
  "name": { "en": "Butter Chicken", "fr": "Poulet au beurre", "hi": "बटर चिकन" },
  "description": { "en": "…", "fr": "…", "hi": "…" },
  "price": 2195,
  "tags": ["favorite"]
}
```

Prices are integer cents. Format with `Intl.NumberFormat` per locale. Menu edits: change JSON, deploy. They email updates.

## Technical

- Next.js App Router, `next-intl` middleware, `[locale]` segment
- Netlify or Vercel on `sahib.ca` (DNS cutover after they approve staging)
- Catering API: server route, Resend or SMTP, honeypot field
- `next/image` for gallery/hero (AVIF/WebP). Logo SVG/PNG from current wordmark
- Semantic HTML, skip link that is not a Wix dump, visible focus rings
- Sitemap + JSON-LD Restaurant for both locations
- 301s listed above

## Errors and empty states

| Case | Behavior |
|---|---|
| Catering validation | Inline field errors in active locale |
| Catering send fail | “Could not send — call 514.426.1121” (localized) |
| Missing menu section | Omit the chip; do not render an empty heading |
| Unknown locale | Redirect to `/en/…` |
| External reserve/order down | Still a normal link; we do not iframe vendors |

## Testing

- Unit: price formatter, locale prefix, menu JSON schema (every item has en/fr/hi description, price > 0)
- Smoke: all six pages × three locales render 200
- Form: invalid email rejected; valid payload hits the route
- Visual: mobile 390px and desktop 1280px — menus readable without pinch-zoom
- Manual: Reserve/Order sheets hit the correct vendor per location
- Lighthouse (staging): LCP &lt; 2.5s on home, no horizontal scroll

## Launch content rules

- Copy-edit EN/FR from the live Wix menus; write Hindi descriptions (do not machine-dump unreviewed)
- Confirm Dorval tap list and the Mouton Cadet 750ml price before go-live
- Keep Best of MTL / “best samosa” only if we have the badge file

## Risks

- Hindi for ~80 dishes is the long pole. Chrome + home + contact can ship first; menu Hindi can follow in the same JSON without a redesign
- DNS/Wix cutover needs their registrar access
- Two order systems and two reserve systems stay awkward by design — do not hide that behind one fake checkout
