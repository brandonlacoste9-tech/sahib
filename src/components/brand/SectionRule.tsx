import { StarMark } from '@/components/brand/StarMark';

export function SectionRule() {
  return (
    <div className="flex max-w-xs items-center gap-3" aria-hidden="true">
      <span className="h-px flex-1 bg-gold/50" />
      <StarMark className="h-3.5 w-3.5 text-teal" />
      <span className="h-px flex-1 bg-gold/50" />
    </div>
  );
}
