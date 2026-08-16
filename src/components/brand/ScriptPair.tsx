import { StarMark } from '@/components/brand/StarMark';

type Props = {
  size?: 'sm' | 'md';
};

export function ScriptPair({ size = 'md' }: Props) {
  const type =
    size === 'sm'
      ? 'text-lg leading-none md:text-xl'
      : 'text-2xl leading-none md:text-3xl';

  return (
    <p
      className={`flex items-center gap-3 text-gold ${type}`}
      translate="no"
    >
      <span className="font-arabic" lang="ar" dir="rtl">
        صاحب
      </span>
      <StarMark className="h-4 w-4 shrink-0 text-teal" />
      <span className="font-deva" lang="hi">
        साहिब
      </span>
    </p>
  );
}
