import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeading } from '@/components/brand/PageHeading';
import { RestaurantJsonLd } from '@/components/jsonld/RestaurantJsonLd';
import { cateringEmail, locations } from '@/content/locations';
import type { Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const tNav = await getTranslations('nav');
  const tContact = await getTranslations('contact');

  return (
    <>
      <RestaurantJsonLd />
      <section className="mx-auto max-w-[1120px] px-6 py-20 md:py-28">
        <PageHeading>{tNav('contact')}</PageHeading>
        <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-24">
          {locations.map((room) => (
            <article
              key={room.id}
              id={room.id}
              className="scroll-mt-24"
            >
              <h2 className="text-4xl text-ink">{room.name[loc]}</h2>
              <address className="mt-6 not-italic leading-relaxed text-muted">
                {room.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <span className="block">{room.postal}</span>
              </address>
              <p className="mt-6 leading-relaxed text-muted">
                {room.hours[loc]}
              </p>
              <a href={room.phoneHref} className="mt-4 block text-teal">
                {room.phone}
              </a>
              <a
                href={room.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 block text-teal"
              >
                {tContact('map')}
              </a>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                <li>
                  <a
                    href={room.reserveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal"
                  >
                    {tNav('reserve')}
                  </a>
                </li>
                <li>
                  <a
                    href={room.orderUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal"
                  >
                    {tNav('order')}
                  </a>
                </li>
                <li>
                  <a
                    href={room.justBookMeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal"
                  >
                    JustBookMe
                  </a>
                </li>
              </ul>
              <a
                href={`mailto:${tContact('email')}`}
                className="mt-8 block text-teal"
              >
                {cateringEmail}
              </a>
              {room.note ? (
                <p className="mt-6 text-sm leading-relaxed text-muted">
                  {room.note[loc]}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
