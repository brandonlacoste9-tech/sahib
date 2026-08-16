import { getLocale, getTranslations } from 'next-intl/server';
import { ScriptPair } from '@/components/brand/ScriptPair';
import { SocialLinks } from '@/components/layout/SocialLinks';
import { cateringEmail, locations } from '@/content/locations';
import type { Locale } from '@/i18n/routing';

export async function SiteFooter() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('contact');

  return (
    <footer className="mt-auto border-t border-line">
      <div className="jali h-1.5 w-full border-b border-gold/40" aria-hidden="true" />
      <div className="mx-auto grid max-w-[1120px] gap-10 px-6 py-14 md:grid-cols-3">
        {locations.map((loc) => (
          <div key={loc.id}>
            <h2 className="font-heading text-2xl text-ink">{loc.name[locale]}</h2>
            <address className="mt-3 not-italic text-sm leading-relaxed text-muted">
              {loc.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="block">{loc.postal}</span>
              <a href={loc.phoneHref} className="mt-2 block text-teal">
                {loc.phone}
              </a>
              <span className="mt-2 block">{loc.hours[locale]}</span>
            </address>
          </div>
        ))}
        <div>
          <ScriptPair size="sm" />
          <h2 className="mt-4 font-heading text-2xl text-ink">Sahib</h2>
          <a href={`mailto:${t('email')}`} className="mt-3 block text-sm text-teal">
            {cateringEmail}
          </a>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
