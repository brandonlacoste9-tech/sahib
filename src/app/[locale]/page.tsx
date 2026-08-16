import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ScriptPair } from '@/components/brand/ScriptPair';
import { SectionRule } from '@/components/brand/SectionRule';
import { HomeActions } from '@/components/home/HomeActions';
import { RestaurantJsonLd } from '@/components/jsonld/RestaurantJsonLd';
import { Link } from '@/i18n/navigation';
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
      <section className="relative isolate min-h-[min(92vh,56rem)] w-full overflow-hidden">
        <Image
          src="/hero-thali.jpg"
          alt="Brass thali of butter chicken, saffron rice and naan with an Arabic dallah"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_62%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-paper/70 via-paper/55 to-paper/35"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-[1120px] px-6 py-20 md:py-28">
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
          <HomeActions />
        </div>
      </section>
      <section className="mx-auto max-w-[1120px] px-6 py-20 md:py-28">
        <div className="grid items-start gap-12 md:grid-cols-[1fr_8rem]">
          <div>
            <p className="text-sm tracking-[0.18em] text-teal uppercase">
              {t('houseKicker')}
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl text-ink md:text-5xl">
              {t('houseTitle')}
            </h2>
            <div className="mt-6">
              <SectionRule />
            </div>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
              {t('house')}
            </p>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
              {t('award')}
            </p>
            <Link href="/about" className="mt-10 inline-block text-teal">
              {t('aboutLink')}
            </Link>
          </div>
          <div className="relative mx-auto aspect-square w-28 overflow-hidden md:mx-0">
            <Image
              src="/best-of-mtl-2024.jpg"
              alt={t('award')}
              fill
              sizes="112px"
              className="object-cover object-[center_12%]"
            />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1120px] px-6 pb-20 md:pb-28">
        <p className="text-sm tracking-[0.18em] text-teal uppercase">
          {t('buffetKicker')}
        </p>
        <h2 className="mt-5 text-4xl text-ink md:text-5xl">{t('buffetTitle')}</h2>
        <div className="mt-6">
          <SectionRule />
        </div>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          {t('buffetBody')}
        </p>
      </section>
      <section className="mx-auto max-w-[1120px] px-6 pb-20 md:pb-28">
        <p className="text-sm tracking-[0.18em] text-teal uppercase">
          {t('triviaKicker')}
        </p>
        <h2 className="mt-5 text-4xl text-ink md:text-5xl">{t('triviaTitle')}</h2>
        <div className="mt-6">
          <SectionRule />
        </div>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{t('trivia')}</p>
      </section>
    </>
  );
}
