import type { ReactNode } from 'react';
import { ScriptPair } from '@/components/brand/ScriptPair';
import { SectionRule } from '@/components/brand/SectionRule';

type Props = {
  children: ReactNode;
};

export function PageHeading({ children }: Props) {
  return (
    <header className="max-w-3xl">
      <ScriptPair size="sm" />
      <h1 className="mt-5 text-5xl text-ink md:text-6xl">{children}</h1>
      <div className="mt-6">
        <SectionRule />
      </div>
    </header>
  );
}
