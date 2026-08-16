import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { LocaleSwitch } from '@/components/layout/LocaleSwitch';

const navItems = [
  { href: '/menu', key: 'menu' },
  { href: '/pub', key: 'pub' },
  { href: '/catering', key: 'catering' },
  { href: '/gallery', key: 'gallery' },
  { href: '/blog', key: 'blog' },
  { href: '/contact', key: 'contact' },
] as const;

export async function SiteHeader() {
  const t = await getTranslations('nav');

  return (
    <header className="relative border-b border-line">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-50 focus:bg-paper focus:px-3 focus:py-2 focus:text-sm focus:text-teal"
      >
        {t('skip')}
      </a>
      <div className="jali h-1.5 w-full border-b border-gold/40" aria-hidden="true" />
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 py-5">
        <Link href="/" className="shrink-0">
          <Image src="/logo.png" alt="Sahib" width={140} height={70} priority />
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm tracking-wide text-ink hover:text-teal"
            >
              {t(item.key)}
            </Link>
          ))}
          <LocaleSwitch />
        </nav>
      </div>
    </header>
  );
}
