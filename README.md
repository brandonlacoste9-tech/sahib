# Sahib

2026 live replacement for [sahib.ca](https://www.sahib.ca) — West Island Indian restaurant and pub (Pointe-Claire + Dorval).

English / Français / हिन्दी. Menus in JSON. Reserve, Order, and JustBookMe per location.

## Develop

```bash
npm install
npm test
npm run dev
```

Open `http://localhost:3000/en`.

## Content

- `src/content/menu.json` — food
- `src/content/pub.json` — drinks
- `src/content/locations.ts` — hours, vendor and JustBookMe URLs
- `messages/{en,fr,hi}.json` — chrome copy

Catering quotes: set `RESEND_API_KEY` and `CATERING_FROM` (see `.env.example`). Without them, the API logs the payload locally.
 
