import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import {
  Inter,
  Libre_Baskerville,
  Noto_Naskh_Arabic,
  Noto_Serif_Devanagari,
} from 'next/font/google';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { SpicePrint } from '@/components/brand/SpicePrint';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ThumbBar } from '@/components/layout/ThumbBar';
import { routing } from '@/i18n/routing';

const heading = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-heading',
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const arabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '600'],
  variable: '--font-arabic',
});

const deva = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '600'],
  variable: '--font-deva',
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: {
      default: t('site'),
      template: `%s · ${t('site')}`,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${heading.variable} ${body.variable} ${arabic.variable} ${deva.variable}`}
    >
      <body className="relative flex min-h-dvh flex-col antialiased">
        <NextIntlClientProvider messages={messages}>
          <SpicePrint />
          <div className="relative z-10 flex min-h-dvh flex-col">
            <SiteHeader />
            <main id="content" tabIndex={-1} className="flex-1 pb-24 outline-none md:pb-0">
              {children}
            </main>
            <SiteFooter />
            <ThumbBar />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
