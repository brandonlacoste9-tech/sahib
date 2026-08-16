import type { ReactNode } from 'react';
import { StarMark } from '@/components/brand/StarMark';
import type { MenuItem } from '@/lib/menu-schema';
import type { Locale } from '@/i18n/routing';

export const tagLabels: Record<Locale, Record<MenuItem['tags'][number], string>> = {
  en: {
    vegan: 'Vegan',
    vegetarian: 'Vegetarian',
    gluten: 'Contains gluten',
    favorite: 'Favourite',
    spicy: 'Spicy',
    hot: 'Hot',
  },
  fr: {
    vegan: 'Végane',
    vegetarian: 'Végétarien',
    gluten: 'Contient du gluten',
    favorite: 'Coup de cœur',
    spicy: 'Épicé',
    hot: 'Très piquant',
  },
  hi: {
    vegan: 'वीगन',
    vegetarian: 'शाकाहारी',
    gluten: 'ग्लूटेन है',
    favorite: 'पसंदीदा',
    spicy: 'तीखा',
    hot: 'बहुत तीखा',
  },
};

export const tagOrder: MenuItem['tags'][number][] = [
  'vegetarian',
  'vegan',
  'gluten',
  'spicy',
  'hot',
  'favorite',
];

type MarkProps = {
  title: string;
  className?: string;
};

function Frame({ children, title, className = 'h-4 w-4' }: MarkProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      className={`shrink-0 ${className}`}
    >
      <title>{title}</title>
      {children}
    </svg>
  );
}

function VegetarianMark({ title }: MarkProps) {
  return (
    <Frame title={title} className="h-4 w-4 text-teal">
      <rect
        x="4.2"
        y="4.2"
        width="15.6"
        height="15.6"
        rx="1.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="12" cy="12" r="4.2" fill="currentColor" />
    </Frame>
  );
}

function VeganMark({ title }: MarkProps) {
  return (
    <Frame title={title} className="h-4 w-4 text-teal">
      <rect
        x="4.2"
        y="4.2"
        width="15.6"
        height="15.6"
        rx="1.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M12 16.4 V9.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M12 12.2 C11.2 9.6 8.6 9.2 8.2 11 C9.2 10.8 11.4 11.4 12 13.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M12 12.2 C12.8 9.6 15.4 9.2 15.8 11 C14.8 10.8 12.6 11.4 12 13.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </Frame>
  );
}

function GlutenMark({ title }: MarkProps) {
  return (
    <Frame title={title} className="h-4 w-4 text-muted">
      <path
        d="M12 19.5 V5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M12 8.2 C10.2 6.8 8.4 7.4 8.2 9 C9.6 8.6 11.2 9.2 12 10.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M12 8.2 C13.8 6.8 15.6 7.4 15.8 9 C14.4 8.6 12.8 9.2 12 10.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M12 11.6 C10.2 10.2 8.4 10.8 8.2 12.4 C9.6 12 11.2 12.6 12 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M12 11.6 C13.8 10.2 15.6 10.8 15.8 12.4 C14.4 12 12.8 12.6 12 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </Frame>
  );
}

function Chili({ className }: { className?: string }) {
  return (
    <path
      className={className}
      d="M13.2 6.2 C13.2 6.2 14.6 5 16.2 5.6 C15.4 6.8 14.2 7.2 13.4 7.4 C15.8 8.6 17.4 11.4 16.6 14.8 C15.6 18.6 11.8 20 9.4 18.6 C7 17.2 6.4 13.4 7.6 10.4 C8.6 8 10.8 6.8 13.2 6.2 Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
  );
}

function SpicyMark({ title }: MarkProps) {
  return (
    <Frame title={title} className="h-4 w-4 text-gold">
      <Chili />
    </Frame>
  );
}

function HotMark({ title }: MarkProps) {
  return (
    <Frame title={title} className="h-4 w-4 text-gold">
      <g transform="translate(-2.2 0.4) scale(0.86)">
        <Chili />
      </g>
      <g transform="translate(4.4 1.2) scale(0.78)">
        <Chili />
      </g>
    </Frame>
  );
}

export function visibleTags(
  tags: MenuItem['tags']
): MenuItem['tags'][number][] {
  const vegan = tags.includes('vegan');
  return tagOrder.filter((tag) => {
    if (!tags.includes(tag)) return false;
    if (tag === 'vegetarian' && vegan) return false;
    return true;
  });
}

function Mark({ tag, title }: { tag: MenuItem['tags'][number]; title: string }) {
  if (tag === 'vegetarian') return <VegetarianMark title={title} />;
  if (tag === 'vegan') return <VeganMark title={title} />;
  if (tag === 'gluten') return <GlutenMark title={title} />;
  if (tag === 'spicy') return <SpicyMark title={title} />;
  if (tag === 'hot') return <HotMark title={title} />;
  return <StarMark className="h-4 w-4 text-gold" title={title} />;
}

type DishMarksProps = {
  tags: MenuItem['tags'];
  locale: Locale;
};

export function DishMarks({ tags, locale }: DishMarksProps) {
  const shown = visibleTags(tags);
  if (shown.length === 0) return null;

  return (
    <span className="inline-flex items-center gap-1.5">
      {shown.map((tag) => (
        <Mark key={tag} tag={tag} title={tagLabels[locale][tag]} />
      ))}
    </span>
  );
}

type LegendProps = {
  tags: Iterable<MenuItem['tags'][number]>;
  locale: Locale;
};

export function MenuLegend({ tags, locale }: LegendProps) {
  const present = new Set(tags);
  const shown = tagOrder.filter((tag) => present.has(tag));
  if (shown.length === 0) return null;

  return (
    <ul className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
      {shown.map((tag) => (
        <li key={tag} className="inline-flex items-center gap-2">
          <Mark tag={tag} title={tagLabels[locale][tag]} />
          <span>{tagLabels[locale][tag]}</span>
        </li>
      ))}
    </ul>
  );
}
