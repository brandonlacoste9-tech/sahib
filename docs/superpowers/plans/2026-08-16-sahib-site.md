# Sahib.ca 2026 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a live-replacement Next.js site for Sahib (EN/FR/हिन्दी) that looks like 2026, reads menus from JSON, and offers Reserve, Order, and JustBookMe per location.

**Architecture:** App Router with `next-intl` under `[locale]`. Static content in `content/` and `messages/`. Location sheet + thumb bar are shared client components. Catering POST hits a Route Handler that emails `rajiv@sahib.ca`. No CMS, no iframes for vendors.

**Tech Stack:** Next.js 16, React 19, next-intl, Tailwind CSS 4, Zod, Vitest, Resend, TypeScript. Netlify or Vercel.

---

## File map

| File | Responsibility |
|---|---|
| `package.json` | Scripts and deps |
| `src/i18n/routing.ts` | Locales `en` `fr` `hi`, pathnames |
| `src/i18n/request.ts` | `getRequestConfig` |
| `src/middleware.ts` | Locale + 301s |
| `src/app/[locale]/layout.tsx` | Fonts, skip link, header, thumb bar |
| `src/app/[locale]/page.tsx` | Home |
| `src/app/[locale]/menu/page.tsx` | Food menu |
| `src/app/[locale]/pub/page.tsx` | Pub menu |
| `src/app/[locale]/catering/page.tsx` | Catering + form |
| `src/app/[locale]/gallery/page.tsx` | Gallery |
| `src/app/[locale]/contact/page.tsx` | Two location cards |
| `src/app/api/catering/route.ts` | Email quote |
| `src/app/globals.css` | OKLCH tokens, 2026 type, reduced motion |
| `src/lib/money.ts` | Cents → localized CAD |
| `src/lib/menu-schema.ts` | Zod for menu/pub JSON |
| `src/lib/catering-schema.ts` | Zod for form |
| `src/content/locations.ts` | Addresses, hours, vendor + JustBookMe URLs |
| `src/content/menu.json` | Food |
| `src/content/pub.json` | Drinks |
| `messages/{en,fr,hi}.json` | Chrome + pages |
| `src/components/layout/*` | Header, locale switch, thumb bar, location sheet |
| `src/components/menu/MenuList.tsx` | Type-first dish rows |
| `tests/*.test.ts` | Unit tests |

Work from `C:\Users\north\sahib`. Do not touch `AI-Assistant` / JustBookMe app code except the public book URLs already in the spec.

**2026 look (every UI task):** cream paper, teal `#417586` only as accent, Baskerville headings, grotesque + tabular prices, no cards/shadows/paisley/Wix chrome. If it looks like 2018 Wix, rewrite the CSS.

---

### Task 1: Scaffold Next.js + test runner

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `vitest.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `src/app/globals.css`, `src/app/layout.tsx`

- [ ] **Step 1: Scaffold**

```bash
cd C:\Users\north\sahib
npx --yes create-next-app@16 . --typescript --tailwind --eslint --app --src-dir --no-turbopack --import-alias "@/*" --use-npm
```

If the directory is not empty (docs already exist), create files by hand instead of wiping docs. Keep `docs/`.

Install: `next-intl zod resend clsx` and `vitest jsdom @vitejs/plugin-react`.

`package.json` scripts must include `"test": "vitest run"`.

- [ ] **Step 2: Write a failing smoke test**

Create `tests/smoke.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('scaffold', () => {
  it('declares next-intl', () => {
    const pkg = JSON.parse(
      readFileSync(resolve(__dirname, '../package.json'), 'utf8')
    );
    expect(pkg.dependencies['next-intl']).toBeTruthy();
  });
});
```

- [ ] **Step 3: Run test**

Run: `npm test`

Expected: PASS once next-intl is in package.json (if you wrote the test first against a missing dep, it fails, then you add the dep).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 16 with next-intl and vitest"
```

---

### Task 2: Money + menu schema

**Files:**
- Create: `src/lib/money.ts`, `src/lib/menu-schema.ts`, `tests/money.test.ts`, `tests/menu-schema.test.ts`

- [ ] **Step 1: Write failing tests**

`tests/money.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { formatPrice } from '../src/lib/money';

describe('formatPrice', () => {
  it('formats cents as CAD in en', () => {
    expect(formatPrice(2195, 'en')).toMatch(/21\.95/);
  });
  it('formats cents in fr-CA', () => {
    const s = formatPrice(2195, 'fr');
    expect(s.replace(/\u00a0/g, ' ')).toMatch(/21,95/);
  });
  it('rejects non-positive prices at the call site via schema not formatPrice', () => {
    expect(formatPrice(325, 'hi')).toBeTruthy();
  });
});
```

`tests/menu-schema.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { menuItemSchema, menuFileSchema } from '../src/lib/menu-schema';

describe('menuItemSchema', () => {
  it('requires en/fr/hi descriptions and price > 0', () => {
    const bad = {
      id: 'x',
      name: { en: 'X', fr: 'X', hi: 'एक्स' },
      description: { en: 'd', fr: 'd' },
      price: 0,
      tags: [],
    };
    expect(menuItemSchema.safeParse(bad).success).toBe(false);
  });

  it('accepts a valid item', () => {
    const ok = {
      id: 'butter-chicken',
      name: { en: 'Butter Chicken', fr: 'Poulet au beurre', hi: 'बटर चिकन' },
      description: {
        en: 'In a creamy tomato sauce.',
        fr: 'Dans une sauce tomate crémeuse.',
        hi: 'मलाईदार टमाटर की सॉस में।',
      },
      price: 2195,
      tags: ['favorite'],
    };
    expect(menuItemSchema.parse(ok).id).toBe('butter-chicken');
  });

  it('rejects an empty section list', () => {
    expect(menuFileSchema.safeParse({ sections: [] }).success).toBe(false);
  });
});
```

- [ ] **Step 2: Run tests — expect FAIL**

Run: `npm test`

Expected: FAIL — modules not found.

- [ ] **Step 3: Implement**

`src/lib/money.ts`:

```ts
const localeMap = { en: 'en-CA', fr: 'fr-CA', hi: 'hi-IN' } as const;

export function formatPrice(cents: number, locale: 'en' | 'fr' | 'hi'): string {
  return new Intl.NumberFormat(localeMap[locale], {
    style: 'currency',
    currency: 'CAD',
  }).format(cents / 100);
}
```

`src/lib/menu-schema.ts`:

```ts
import { z } from 'zod';

const localized = z.object({
  en: z.string().min(1),
  fr: z.string().min(1),
  hi: z.string().min(1),
});

export const tagSchema = z.enum([
  'vegan',
  'vegetarian',
  'gluten',
  'favorite',
  'spicy',
  'hot',
]);

export const menuItemSchema = z.object({
  id: z.string().min(1),
  name: localized,
  description: localized,
  price: z.number().int().positive(),
  tags: z.array(tagSchema).default([]),
  recipe: localized.optional(),
});

export const menuSectionSchema = z.object({
  id: z.string().min(1),
  title: localized,
  note: localized.optional(),
  items: z.array(menuItemSchema).min(1),
});

export const menuFileSchema = z.object({
  sections: z.array(menuSectionSchema).min(1),
});

export type MenuFile = z.infer<typeof menuFileSchema>;
export type MenuItem = z.infer<typeof menuItemSchema>;
```

- [ ] **Step 4: Run tests — expect PASS**

Run: `npm test`

- [ ] **Step 5: Commit**

```bash
git add src/lib/money.ts src/lib/menu-schema.ts tests/money.test.ts tests/menu-schema.test.ts
git commit -m "feat: CAD price formatter and menu JSON schema"
```

---

### Task 3: Locations + catering schema + redirects

**Files:**
- Create: `src/content/locations.ts`, `src/lib/catering-schema.ts`, `src/lib/redirects.ts`, `tests/locations.test.ts`, `tests/catering-schema.test.ts`, `tests/redirects.test.ts`

- [ ] **Step 1: Write failing tests**

`tests/locations.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { locations } from '../src/content/locations';

describe('locations', () => {
  it('has pointe-claire and dorval with three actions', () => {
    expect(locations.map((l) => l.id)).toEqual(['pointe-claire', 'dorval']);
    for (const loc of locations) {
      expect(loc.reserveUrl.startsWith('http')).toBe(true);
      expect(loc.orderUrl.startsWith('http')).toBe(true);
      expect(loc.justBookMeUrl).toContain('justbookme.ca/book/sahib-');
      expect(loc.phone).toMatch(/^514/);
    }
  });
});
```

`tests/catering-schema.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { cateringSchema } from '../src/lib/catering-schema';

describe('cateringSchema', () => {
  it('rejects invalid email', () => {
    const r = cateringSchema.safeParse({
      firstName: 'A',
      lastName: 'B',
      email: 'nope',
      phone: '5144261121',
      guests: 20,
      occasion: 'wedding',
      notes: '',
      honey: '',
    });
    expect(r.success).toBe(false);
  });

  it('accepts a valid payload and flags bots via honey', () => {
    const ok = cateringSchema.parse({
      firstName: 'Raj',
      lastName: 'K',
      email: 'raj@example.com',
      phone: '514-426-1121',
      guests: 40,
      occasion: 'corporate',
      notes: 'Buffet',
      honey: '',
    });
    expect(ok.email).toBe('raj@example.com');
    expect(
      cateringSchema.safeParse({ ...ok, honey: 'spam' }).success
    ).toBe(false);
  });
});
```

`tests/redirects.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { legacyRedirects } from '../src/lib/redirects';

describe('legacyRedirects', () => {
  it('maps Wix slugs to /en pages', () => {
    const map = Object.fromEntries(legacyRedirects.map((r) => [r.source, r.destination]));
    expect(map['/restaurant-pub-menu']).toBe('/en/pub');
    expect(map['/copy-of-contact-us-pointe-claire']).toBe('/en/contact#dorval');
    expect(map['/contact-us']).toBe('/en/contact#pointe-claire');
    expect(map['/menu']).toBeUndefined();
  });
});
```

Note: Next.js cannot 301 `/menu` to `/en/menu` if `/[locale]/menu` owns `/en/menu`. Bare `/menu` is handled by next-intl middleware (prefix). Only the Wix-only slugs live in `legacyRedirects`. `/menu` without locale is rewritten by middleware to `/{locale}/menu`.

- [ ] **Step 2: Run tests — expect FAIL**

- [ ] **Step 3: Implement**

`src/content/locations.ts`:

```ts
export type LocationId = 'pointe-claire' | 'dorval';

export type Location = {
  id: LocationId;
  name: { en: string; fr: string; hi: string };
  addressLines: string[];
  postal: string;
  phone: string;
  phoneHref: string;
  hours: { en: string; fr: string; hi: string };
  reserveUrl: string;
  orderUrl: string;
  justBookMeUrl: string;
  mapUrl: string;
  note?: { en: string; fr: string; hi: string };
};

export const locations: Location[] = [
  {
    id: 'pointe-claire',
    name: { en: 'Pointe-Claire', fr: 'Pointe-Claire', hi: 'प्वाइंट-क्लेयर' },
    addressLines: ['225B Hymus Blvd.', 'Pointe-Claire, QC'],
    postal: 'H9R 1G4',
    phone: '514.426.1121',
    phoneHref: 'tel:+15144261121',
    hours: {
      en: 'Wed–Sun 11:30–22:00. Closed Mon–Tue.',
      fr: 'Mer–dim 11 h 30–22 h. Fermé lun–mar.',
      hi: 'बुध–रवि 11:30–22:00. सोम–मंगल बंद।',
    },
    reserveUrl:
      'https://www.tbdine.com/book/restaurant/sahib?idApp=1390&language=en-us',
    orderUrl: 'http://orderonline.sahib.ca/',
    justBookMeUrl: 'https://justbookme.ca/book/sahib-pointe-claire',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=225B+Hymus+Blvd+Pointe-Claire+QC',
  },
  {
    id: 'dorval',
    name: { en: 'Dorval', fr: 'Dorval', hi: 'डोरवाल' },
    addressLines: ['636 Chem. du Bord-du-Lac-Lakeshore', 'Dorval, QC'],
    postal: 'H9S 2B6',
    phone: '514.307.2442',
    phoneHref: 'tel:+15143072442',
    hours: {
      en: 'Tue–Sun 11:30–22:00. Closed Mon.',
      fr: 'Mar–dim 11 h 30–22 h. Fermé lundi.',
      hi: 'मंगल–रवि 11:30–22:00. सोमवार बंद।',
    },
    reserveUrl: 'https://widgets.libroreserve.com/WEB/QC014745582811/book',
    orderUrl: 'https://sahibindianrestaurant.order-online.ai/',
    justBookMeUrl: 'https://justbookme.ca/book/sahib-dorval',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=636+Chemin+du+Bord-du-Lac+Dorval+QC',
    note: {
      en: 'Outdoor seating is not guaranteed.',
      fr: 'Les places en terrasse ne sont pas garanties.',
      hi: 'बाहर की सीट की गारंटी नहीं है।',
    },
  },
];

export const cateringEmail = 'rajiv@sahib.ca';
```

`src/lib/catering-schema.ts`:

```ts
import { z } from 'zod';

export const cateringSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7).max(30),
  guests: z.coerce.number().int().min(1).max(2000),
  occasion: z.string().trim().min(1).max(80),
  notes: z.string().trim().max(2000).optional().default(''),
  honey: z.literal(''),
});

export type CateringInput = z.infer<typeof cateringSchema>;
```

`src/lib/redirects.ts`:

```ts
export const legacyRedirects = [
  { source: '/restaurant-pub-menu', destination: '/en/pub', permanent: true },
  {
    source: '/copy-of-contact-us-pointe-claire',
    destination: '/en/contact#dorval',
    permanent: true,
  },
  { source: '/contact-us', destination: '/en/contact#pointe-claire', permanent: true },
];
```

Wire `legacyRedirects` into `next.config.ts` `redirects()`.

- [ ] **Step 4: Tests PASS**

- [ ] **Step 5: Commit**

```bash
git add src/content/locations.ts src/lib/catering-schema.ts src/lib/redirects.ts next.config.ts tests
git commit -m "feat: locations, catering schema, and Wix 301s"
```

---

### Task 4: next-intl chrome + 2026 shell

**Files:**
- Create: `src/i18n/routing.ts`, `src/i18n/request.ts`, `src/middleware.ts`, `messages/en.json`, `messages/fr.json`, `messages/hi.json`
- Create: `src/components/layout/SiteHeader.tsx`, `LocaleSwitch.tsx`, `LocationSheet.tsx`, `ThumbBar.tsx`, `SiteFooter.tsx`
- Modify: `src/app/globals.css`, `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Write failing test for locale list**

`tests/i18n.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { routing } from '../src/i18n/routing';

describe('routing', () => {
  it('exposes en, fr, hi', () => {
    expect(routing.locales).toEqual(['en', 'fr', 'hi']);
    expect(routing.defaultLocale).toBe('en');
  });
});
```

- [ ] **Step 2: FAIL then implement routing**

`src/i18n/routing.ts`:

```ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr', 'hi'],
  defaultLocale: 'en',
  localePrefix: 'always',
});
```

Follow next-intl v4 App Router setup: `src/i18n/request.ts`, `src/i18n/navigation.ts` (`createNavigation(routing)`), `src/middleware.ts` using `createMiddleware(routing)`.

`messages/en.json` (minimum keys — expand as pages are built):

```json
{
  "meta": { "site": "Sahib" },
  "nav": {
    "menu": "Menu",
    "pub": "Pub",
    "catering": "Catering",
    "gallery": "Gallery",
    "contact": "Contact",
    "reserve": "Reserve",
    "order": "Order",
    "justbookme": "JustBookMe",
    "justbookmeHint": "Can't get through? JustBookMe answers and takes your request."
  },
  "sheet": { "pickLocation": "Choose a location" },
  "home": {
    "kicker": "West Island · Est. 20 years",
    "title": "Indian restaurant and pub.",
    "lead": "Two rooms. Award-winning cooking. A proper bar.",
    "buffet": "Buffet lunch, Pointe-Claire only, Wednesday to Sunday 11:30–14:30.",
    "trivia": "Trivia night, Dorval, Thursdays 7:00 PM. Teams of up to 6. $50 prize. Reserve recommended."
  },
  "catering": {
    "title": "Catering",
    "send": "Send request",
    "success": "Sent. We will write you back.",
    "error": "Could not send — call 514.426.1121"
  },
  "contact": { "email": "rajiv@sahib.ca" }
}
```

`messages/fr.json` and `messages/hi.json` must have the **same keys**. Hindi chrome in Devanagari (e.g. `"menu": "मेनू"`, `"reserve": "रिज़र्व"`, `"justbookmeHint": "फ़ोन नहीं लगा? JustBookMe जवाब देकर आपका अनुरोध ले लेता है।"`).

- [ ] **Step 3: 2026 CSS**

`src/app/globals.css` tokens (do not invent extra brand colors):

```css
:root {
  --paper: oklch(0.97 0.015 85);
  --ink: oklch(0.22 0.02 55);
  --muted: oklch(0.45 0.02 55);
  --teal: oklch(0.48 0.07 220);
  --line: oklch(0.88 0.015 85);
}
html { background: var(--paper); color: var(--ink); }
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

Load **Libre Baskerville** + **Geist** (or Inter) via `next/font`. Headings Baskerville. Dish rows: name left, price right, `font-variant-numeric: tabular-nums`. Max width 1120px. No box-shadow cards.

- [ ] **Step 4: Shell components**

`LocationSheet`: props `{ action: 'reserve' | 'order' | 'justbookme' }`. Renders two links from `locations`. JustBookMe links use `justBookMeUrl` and show `nav.justbookmeHint`.

`ThumbBar`: three buttons Reserve · Order · JustBookMe that open the sheet. Hidden at `md+`. Label is always “JustBookMe”.

`SiteHeader`: wordmark (download current logo from `https://static.wixstatic.com/media/3ad470_0a9f6271e23e4f1181d98cef04a1ce9a~mv2.png` into `public/logo.png`, alt “Sahib”), nav links via `next-intl` `Link`, `LocaleSwitch` that keeps the same pathname.

Skip link: one visually-hidden “Skip to content” control, not a Wix dump.

- [ ] **Step 5: `npm test` PASS + `npm run build` succeeds**

- [ ] **Step 6: Commit**

```bash
git add src messages tests src/app
git commit -m "feat: EN/FR/HI chrome, 2026 tokens, location sheet and thumb bar"
```

---

### Task 5: Menu + pub JSON and type-first lists

**Files:**
- Create: `src/content/menu.json`, `src/content/pub.json`, `src/lib/load-menu.ts`, `src/components/menu/MenuList.tsx`, `src/app/[locale]/menu/page.tsx`, `src/app/[locale]/pub/page.tsx`, `tests/menu-files.test.ts`

- [ ] **Step 1: Failing test that JSON parses**

```ts
import { describe, it, expect } from 'vitest';
import menu from '../src/content/menu.json';
import pub from '../src/content/pub.json';
import { menuFileSchema } from '../src/lib/menu-schema';

describe('menu files', () => {
  it('food JSON is valid and has required sections', () => {
    const data = menuFileSchema.parse(menu);
    const ids = data.sections.map((s) => s.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        'appetizers',
        'vegetarian',
        'tandoor',
        'seafood',
        'chicken',
        'lamb',
        'balti',
        'rice-bread',
        'sides',
        'desserts',
      ])
    );
    for (const section of data.sections) {
      for (const item of section.items) {
        expect(item.price).toBeGreaterThan(0);
      }
    }
  });

  it('pub JSON is valid and has signatures', () => {
    const data = menuFileSchema.parse(pub);
    expect(data.sections.some((s) => s.id === 'signatures')).toBe(true);
    const names = data.sections.flatMap((s) => s.items.map((i) => i.name.en));
    expect(names).toContain('While My Sitar Gently Weeps');
    expect(names).not.toContain('CHADONNAY');
  });
});
```

- [ ] **Step 2: FAIL (files missing)**

- [ ] **Step 3: Write `menu.json` and `pub.json`**

Populate **every dish and drink from the live Wix scrape** in `docs/superpowers/specs/2026-08-16-sahib-site-design.md` source (sahib.ca/menu and /restaurant-pub-menu). Copy-edit EN/FR. Write Hindi descriptions (reviewed, not an unedited dump). Prices in **cents**. Corrections required:

- Chardonnay, Sauvignon Blanc, Cabernet, José Cuervo, Crown Royal, Jägermeister, Autriche
- Omit Mouton Cadet 750ml if price is $0; do not invent a price
- One tap block only: Lager, Pilsner, Cobra Blonde, IPA, King Cobra at 12oz $8 / pint $10 / pitcher $27 unless the restaurant confirms otherwise
- Signatures include `recipe` localized one-liners

`src/lib/load-menu.ts`:

```ts
import { menuFileSchema, type MenuFile } from './menu-schema';
import menu from '@/content/menu.json';
import pub from '@/content/pub.json';

export function loadFood(): MenuFile {
  return menuFileSchema.parse(menu);
}
export function loadPub(): MenuFile {
  return menuFileSchema.parse(pub);
}
```

`MenuList`: sticky chips from section titles in the active locale; skip empty sections; each row is type (no card). Tags render as text marks, not emoji soup.

- [ ] **Step 4: Tests PASS**

- [ ] **Step 5: Commit**

```bash
git add src/content/menu.json src/content/pub.json src/lib/load-menu.ts src/components/menu src/app/[locale]/menu src/app/[locale]/pub tests/menu-files.test.ts
git commit -m "feat: food and pub menus from copy-edited JSON"
```

---

### Task 6: Home, contact, gallery

**Files:**
- Create: `src/app/[locale]/page.tsx`, `src/app/[locale]/contact/page.tsx`, `src/app/[locale]/gallery/page.tsx`, `src/components/jsonld/RestaurantJsonLd.tsx`
- Create: `public/gallery/dorval/*.jpg`, `public/gallery/pointe-claire/*.jpg` (download existing Sahib Wix photos listed on `/gallery`, not stock)

- [ ] **Step 1: Contact page renders both phones (component test or smoke)**

`tests/contact-data.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { locations } from '../src/content/locations';

describe('contact data', () => {
  it('exposes both rooms for JSON-LD', () => {
    expect(locations).toHaveLength(2);
    expect(locations[0].justBookMeUrl).toContain('sahib-pointe-claire');
    expect(locations[1].justBookMeUrl).toContain('sahib-dorval');
  });
});
```

- [ ] **Step 2: Implement pages**

**Home:** kicker, huge title, lead, two location names, buffet + trivia lines, four text CTAs (Reserve, Order, JustBookMe, Menu) that reuse `LocationSheet` / `Link`. Full-bleed hero from an existing interior photo. No video player chrome.

**Contact:** two editorial blocks (`#pointe-claire`, `#dorval`), hours, phone, map, Reserve, Order, JustBookMe, `rajiv@sahib.ca`. Dorval outdoor note.

**RestaurantJsonLd:** two `Restaurant` nodes (or `hasMap` + `department`) with name, address, telephone, `servesCuisine: Indian`, opening hours.

**Gallery:** tabs Dorval | Pointe-Claire; `next/image`; lightbox with Escape to close; no stock.

- [ ] **Step 3: Tests PASS**

- [ ] **Step 4: Commit**

```bash
git add src/app/[locale]/page.tsx src/app/[locale]/contact src/app/[locale]/gallery src/components/jsonld public/gallery tests/contact-data.test.ts
git commit -m "feat: home, contact, gallery, and Restaurant JSON-LD"
```

---

### Task 7: Catering form + API

**Files:**
- Create: `src/app/[locale]/catering/page.tsx`, `src/components/catering/CateringForm.tsx`, `src/app/api/catering/route.ts`, `tests/catering-route.test.ts`

- [ ] **Step 1: Failing test for honeypot + validation on the route**

Extract a pure function `src/lib/handle-catering.ts`:

```ts
import { cateringSchema } from './catering-schema';

export function parseCatering(input: unknown) {
  return cateringSchema.safeParse(input);
}
```

Test invalid email and honey as in Task 3 (already covered). Add:

```ts
import { describe, it, expect } from 'vitest';
import { parseCatering } from '../src/lib/handle-catering';

describe('parseCatering', () => {
  it('rejects missing first name', () => {
    expect(
      parseCatering({
        firstName: '',
        lastName: 'K',
        email: 'a@b.com',
        phone: '5144261121',
        guests: 10,
        occasion: 'wedding',
        notes: '',
        honey: '',
      }).success
    ).toBe(false);
  });
});
```

- [ ] **Step 2: Implement form + POST**

`CateringForm`: fields firstName, lastName, email, phone, guests, occasion, notes, hidden `honey`. Client posts JSON to `/api/catering`. Inline errors from Zod issues mapped through `useTranslations('catering')`. Success: `catering.success`. Fail: `catering.error` (mentions 514.426.1121).

`route.ts`: parse body; if honey not empty return 204 (pretend success); if invalid 400; else send via Resend to `rajiv@sahib.ca` when `RESEND_API_KEY` is set; if no key, `console.info` the payload and return 200 so local demo works. Never iframe anything.

Three copy blocks above the form: weddings, corporate, private (from messages).

- [ ] **Step 3: Tests PASS**

- [ ] **Step 4: Commit**

```bash
git add src/app/api/catering src/app/[locale]/catering src/components/catering src/lib/handle-catering.ts tests/catering-route.test.ts
git commit -m "feat: catering quote form emails Rajiv"
```

---

### Task 8: Verify 2026 + locales + actions

**Files:** none required unless a bug is found.

- [ ] **Step 1: Automated**

```bash
npm test
npm run build
```

Expected: all tests green; build includes `/en` `/fr` `/hi` for `/` `/menu` `/pub` `/catering` `/gallery` `/contact`.

- [ ] **Step 2: Manual in the browser**

`npm run dev` then:

1. `/en/menu` — type-first rows, chips work, no pinch-zoom needed at 390px
2. Locale switch to FR and HI on the same page
3. Thumb bar: Reserve → TBDine (PC) / Libro (Dorval); Order → the two vendors; JustBookMe → the two `justbookme.ca/book/sahib-*` URLs
4. `/restaurant-pub-menu` 301 → `/en/pub`
5. No paisley, no Wix “Use tab to navigate”, no floating chat
6. Catering invalid email shows inline error; valid submit returns success copy

- [ ] **Step 3: Commit only if you fixed something**

```bash
git commit -m "fix: issues found in Sahib 2026 smoke"
```

---

## Spec coverage

| Spec | Task |
|---|---|
| 2026 look / tokens / no Wix | 4, 5, 6, 8 |
| EN/FR/HI URLs + cookie/header | 4 |
| Pages: home, menu, pub, catering, gallery, contact | 5–7 |
| Thumb bar Reserve · Order · JustBookMe | 4, 8 |
| locations + hours + vendors | 3, 6 |
| menu.json / pub.json cents + tags | 2, 5 |
| Catering email + honeypot | 3, 7 |
| 301s | 3 |
| JSON-LD | 6 |
| Hindi chrome Devanagari | 4 |
| Menu Hindi descriptions | 5 |
| No CMS / no vendor iframes | all |
| Tests: schema, price, smoke, form | 2, 3, 5, 7, 8 |

No TBD. Types stay `Location`, `MenuFile`, `CateringInput`, `formatPrice(cents, locale)`.
