import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeading } from '@/components/brand/PageHeading';
import { JustBookMeForm } from '@/components/justbookme/JustBookMeForm';
import { SahibAssistant } from '@/components/justbookme/SahibAssistant';
import { getLocationByBookSlug } from '@/content/locations';
import type { Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return [
    { slug: 'sahib-pointe-claire' },
    { slug: 'sahib-dorval' },
  ];
}

export default async function JustBookMePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const loc = getLocationByBookSlug(slug);
  if (!loc) notFound();

  const t = await getTranslations('justbookme');
  const lang = locale as Locale;

  return (
    <section className="mx-auto max-w-[1120px] px-6 py-20 md:py-28">
      <PageHeading>{t('title')}</PageHeading>
      <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
        {t('lead')}
      </p>
      <p className="mt-4 font-heading text-2xl text-ink">{loc.name[lang]}</p>
      <p className="mt-2 text-sm text-muted">{loc.hours[lang]}</p>
      <SahibAssistant
        slug={loc.justBookMeSlug}
        locationName={loc.name[lang]}
        hours={loc.hours[lang]}
        closedWeekdays={loc.closedWeekdays}
      />
      <details className="mt-16 max-w-xl">
        <summary className="cursor-pointer text-sm tracking-wide text-teal">
          {t('orForm')}
        </summary>
        <JustBookMeForm slug={loc.justBookMeSlug} />
      </details>
    </section>
  );
}
