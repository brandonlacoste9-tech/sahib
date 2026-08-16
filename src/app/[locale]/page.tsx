import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ScriptPair } from '@/components/brand/ScriptPair';
import { SectionRule } from '@/components/brand/SectionRule';
import { HomeActions } from '@/components/home/HomeActions';
import { RestaurantJsonLd } from '@/components/jsonld/RestaurantJsonLd';
import { locations } from '@/content/locations';
import type { Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const loc = locale as Locale;

  return (
    <>
      <RestaurantJsonLd />
      <section className="mx-auto max-w-[1120px] px-6 py-20 md:py-28">
        <ScriptPair />
        <p className="mt-6 text-sm tracking-[0.18em] text-teal uppercase">
          {t('kicker')}
        </p>
        <h1 className="mt-6 max-w-4xl text-5xl leading-[1.05] text-ink md:text-7xl lg:text-8xl">
          {t('title')}
        </h1>
        <div className="mt-8">
          <SectionRule />
        </div>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
          {t('lead')}
        </p>
        <p className="mt-12 font-heading text-2xl text-ink md:text-3xl">
          {locations.map((room) => room.name[loc]).join('  ·  ')}
        </p>
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted">
          {t('buffet')}
        </p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          {t('trivia')}
        </p>
        <HomeActions />
      </section>
      <div className="relative h-[min(80vh,52rem)] w-full">
        <Image
          src="/hero-thali.jpg"
          alt="Brass thali of butter chicken, saffron rice and naan with an Arabic dallah"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </>
  );
}
