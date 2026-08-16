import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const locales = ['en', 'fr', 'hi'] as const;

describe('about copy', () => {
  it('keeps 2003, Best Samosa, and the pub facts in every locale', () => {
    for (const locale of locales) {
      const messages = JSON.parse(
        readFileSync(resolve(__dirname, `../messages/${locale}.json`), 'utf8')
      ) as {
        nav: { about: string };
        about: { founded: string; kitchen: string; pub: string; visit: string };
        home: { kicker: string };
      };
      expect(messages.nav.about.length).toBeGreaterThan(2);
      expect(messages.home.kicker).toMatch(/2003/);
      expect(messages.about.founded).toMatch(/2003/);
      expect(messages.about.kitchen.toLowerCase()).toMatch(/samosa|समोसे/);
      expect(messages.about.pub).toMatch(/Taj Mahal|ताज महल/);
      expect(messages.about.pub).toMatch(/Cobra|कोबरा/);
      expect(messages.about.visit.toLowerCase()).toMatch(
        /gift|certificat|गिफ्ट/
      );
    }
  });
});
