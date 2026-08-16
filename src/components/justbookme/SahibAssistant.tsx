'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  applyTurn,
  openingLine,
  type AssistantDraft,
  type AssistantLocale,
  type AssistantStep,
} from '@/lib/sahib-assistant';

type Props = {
  slug: string;
  locationName: string;
  hours: string;
  closedWeekdays: number[];
};

type Line = { from: 'sahib' | 'guest'; text: string };

export function SahibAssistant({
  slug,
  locationName,
  hours,
  closedWeekdays,
}: Props) {
  const locale = useLocale() as AssistantLocale;
  const t = useTranslations('justbookme');
  const hello = openingLine(locationName, locale);
  const [step, setStep] = useState<AssistantStep>('guests');
  const [draft, setDraft] = useState<AssistantDraft>({});
  const [lines, setLines] = useState<Line[]>([{ from: 'sahib', text: hello }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [lines]);

  useEffect(() => {
    void speak(hello);
    return () => {
      audioRef.current?.pause();
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      if (typeof window !== 'undefined') window.speechSynthesis?.cancel();
    };
  }, [hello, locale]);

  async function speak(text: string) {
    if (typeof window === 'undefined') return;
    window.speechSynthesis?.cancel();
    audioRef.current?.pause();
    try {
      const res = await fetch('/api/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, locale }),
      });
      if (!res.ok) throw new Error('voice');
      const blob = await res.blob();
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      const url = URL.createObjectURL(blob);
      objectUrlRef.current = url;
      const audio = new Audio(url);
      audioRef.current = audio;
      await audio.play();
      return;
    } catch {
      if (!window.speechSynthesis) return;
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = locale === 'fr' ? 'fr-CA' : locale === 'hi' ? 'hi-IN' : 'en-CA';
      utter.rate = 0.96;
      window.speechSynthesis.speak(utter);
    }
  }

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy || step === 'done') return;
    setInput('');
    setLines((prev) => [...prev, { from: 'guest', text: trimmed }]);

    const next = applyTurn(step, trimmed, draft, closedWeekdays, locale);
    setDraft(next.draft);
    setStep(next.step);
    setLines((prev) => [...prev, { from: 'sahib', text: next.reply }]);
    void speak(next.reply);

    if (next.step === 'done') {
      setBusy(true);
      try {
        const res = await fetch('/api/justbookme', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            slug,
            name: next.draft.name,
            phone: next.draft.phone,
            email: '',
            guests: next.draft.guests,
            date: next.draft.date,
            time: next.draft.time,
            notes: 'Via fake Sahib assistant (demo until voice is live)',
            honey: '',
          }),
        });
        if (!res.ok && res.status !== 204) {
          setLines((prev) => [
            ...prev,
            { from: 'sahib', text: t('error') },
          ]);
        }
      } catch {
        setLines((prev) => [...prev, { from: 'sahib', text: t('error') }]);
      } finally {
        setBusy(false);
      }
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(input);
  }

  return (
    <div className="mt-12 max-w-xl border border-line">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <p className="text-sm tracking-[0.16em] text-teal uppercase">
          {t('connected')}
        </p>
        <p className="text-sm text-muted">Sahib · {locationName}</p>
      </div>
      <p className="border-b border-line px-4 py-2 text-xs text-muted">{hours}</p>
      <div className="flex max-h-[28rem] flex-col gap-3 overflow-y-auto px-4 py-5">
        {lines.map((line, index) => (
          <p
            key={`${line.from}-${index}`}
            className={
              line.from === 'sahib'
                ? 'max-w-[90%] font-heading text-lg text-gold'
                : 'ml-auto max-w-[90%] text-right text-ink'
            }
          >
            {line.text}
          </p>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={onSubmit} className="flex border-t border-line">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={t('typeHere')}
          disabled={step === 'done' || busy}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base text-ink placeholder:text-muted/60"
        />
        <button
          type="submit"
          disabled={step === 'done' || busy}
          className="px-4 text-sm tracking-wide text-teal disabled:opacity-40"
        >
          {t('say')}
        </button>
      </form>
    </div>
  );
}
