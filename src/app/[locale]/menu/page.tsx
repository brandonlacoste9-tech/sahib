import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MenuList } from '@/components/menu/MenuList';
import type { Locale } from '@/i18n/routing';
import { loadFood } from '@/lib/load-menu';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function MenuPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('nav');
  const data = loadFood();

  return (
    <section className="mx-auto max-w-[1120px] px-6 py-16 md:py-20">
      <h1 className="text-5xl text-ink md:text-6xl">{t('menu')}</h1>
      <div className="mt-10">
        <MenuList data={data} locale={locale as Locale} />
      </div>
    </section>
  );
}
