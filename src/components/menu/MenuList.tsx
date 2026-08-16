import { SectionRule } from '@/components/brand/SectionRule';
import { StarMark } from '@/components/brand/StarMark';
import { formatPrice } from '@/lib/money';
import type { MenuFile, MenuItem } from '@/lib/menu-schema';
import type { Locale } from '@/i18n/routing';

const tagLabels: Record<Locale, Record<MenuItem['tags'][number], string>> = {
  en: {
    vegan: 'Vegan',
    vegetarian: 'Vegetarian',
    gluten: 'Gluten',
    favorite: 'Favourite',
    spicy: 'Spicy',
    hot: 'Hot',
  },
  fr: {
    vegan: 'Végane',
    vegetarian: 'Végétarien',
    gluten: 'Gluten',
    favorite: 'Coup de cœur',
    spicy: 'Épicé',
    hot: 'Très piquant',
  },
  hi: {
    vegan: 'वीगन',
    vegetarian: 'शाकाहारी',
    gluten: 'ग्लूटेन',
    favorite: 'पसंदीदा',
    spicy: 'तीखा',
    hot: 'बहुत तीखा',
  },
};

type Props = {
  data: MenuFile;
  locale: Locale;
};

export function MenuList({ data, locale }: Props) {
  const sections = data.sections.filter((section) => section.items.length > 0);

  return (
    <div>
      <nav
        aria-label="Sections"
        className="sticky top-0 z-10 -mx-6 mb-4 border-b border-line bg-paper/95 px-6 py-3 backdrop-blur-sm"
      >
        <ul className="flex gap-x-5 gap-y-2 overflow-x-auto text-sm">
          {sections.map((section) => (
            <li key={section.id} className="shrink-0">
              <a href={`#${section.id}`} className="text-teal hover:text-ink">
                {section.title[locale]}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-16 pt-14">
          <div className="flex items-center gap-3">
            <StarMark className="h-4 w-4 shrink-0 text-gold" />
            <h2 className="text-3xl text-ink md:text-4xl">{section.title[locale]}</h2>
          </div>
          <div className="mt-4">
            <SectionRule />
          </div>
          {section.note ? (
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              {section.note[locale]}
            </p>
          ) : null}

          <ul className="mt-8">
            {section.items.map((item) => (
              <li
                key={item.id}
                className="grid grid-cols-[1fr_auto] gap-x-6 border-b border-line py-5 first:border-t"
              >
                <h3 className="text-lg leading-snug text-ink">{item.name[locale]}</h3>
                <p className="tabular-price text-lg text-ink">
                  {formatPrice(item.price, locale)}
                </p>
                <p className="col-span-2 mt-1 max-w-2xl text-sm leading-relaxed text-muted">
                  {item.description[locale]}
                </p>
                {item.recipe ? (
                  <p className="col-span-2 mt-1 max-w-2xl text-sm leading-relaxed text-muted italic">
                    {item.recipe[locale]}
                  </p>
                ) : null}
                {item.tags.length > 0 ? (
                  <p className="col-span-2 mt-2 text-xs tracking-[0.14em] text-teal uppercase">
                    {item.tags.map((tag) => tagLabels[locale][tag]).join(' · ')}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
