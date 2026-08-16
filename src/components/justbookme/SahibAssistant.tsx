'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  applyTurn,
  isSahibEcho,
  openingLine,
  type AssistantDraft,
  type AssistantLocale,
  type AssistantStep,
} from '@/lib/sahib-assistant';
import {
  getSpeechRecognitionCtor,
  speechLang,
  type SpeechRecognitionLike,
} from '@/lib/speech-input';

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
  const [listening, setListening] = useState(false);
  const [micReady, setMicReady] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const speakTokenRef = useRef(0);
  const recogRef = useRef<SpeechRecognitionLike | null>(null);
  const sendRef = useRef<(text: string) => void>(() => undefined);
  const speakingRef = useRef(false);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [lines]);

  useEffect(() => {
    setMicReady(Boolean(getSpeechRecognitionCtor()));
  }, []);

  useEffect(() => {
    void speak(hello);
    return () => {
      speakTokenRef.current += 1;
      audioRef.current?.pause();
      recogRef.current?.abort();
      if (typeof window !== 'undefined') window.speechSynthesis?.cancel();
    };
  }, [hello, locale]);

  async function speak(text: string) {
    if (typeof window === 'undefined') return;
    const token = ++speakTokenRef.current;
    window.speechSynthesis?.cancel();
    audioRef.current?.pause();
    recogRef.current?.abort();
    setListening(false);
    speakingRef.current = true;
    try {
      const res = await fetch('/api/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, locale }),
      });
      if (!res.ok) throw new Error('voice');
      const blob = await res.blob();
      if (token !== speakTokenRef.current) return;
      const prevUrl = objectUrlRef.current;
      const url = URL.createObjectURL(blob);
      objectUrlRef.current = url;
      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = url;
      audioRef.current = audio;
      await new Promise<void>((resolve, reject) => {
        audio.addEventListener('canplaythrough', () => resolve(), { once: true });
        audio.addEventListener('error', () => reject(new Error('audio')), {
          once: true,
        });
        audio.load();
      });
      if (token !== speakTokenRef.current) return;
      audio.currentTime = 0;
      audio.onended = () => {
        if (token === speakTokenRef.current) speakingRef.current = false;
      };
      await audio.play();
      if (prevUrl) URL.revokeObjectURL(prevUrl);
      return;
    } catch {
      if (token !== speakTokenRef.current) return;
      speakingRef.current = false;
      if (!window.speechSynthesis) return;
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = locale === 'fr' ? 'fr-CA' : locale === 'hi' ? 'hi-IN' : 'en-CA';
      utter.rate = 0.96;
      utter.onend = () => {
        if (token === speakTokenRef.current) speakingRef.current = false;
      };
      window.speechSynthesis.speak(utter);
    }
  }

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy || step === 'done') return;
    if (isSahibEcho(trimmed)) return;
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
            notes: 'Via Sahib booking',
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

  sendRef.current = (text: string) => {
    void send(text);
  };

  function stopListening() {
    recogRef.current?.stop();
    recogRef.current = null;
    setListening(false);
  }

  function toggleMic() {
    if (step === 'done' || busy) return;
    if (listening) {
      stopListening();
      return;
    }
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) return;
    speakTokenRef.current += 1;
    audioRef.current?.pause();
    window.speechSynthesis?.cancel();
    const recog = new Ctor();
    recog.lang = speechLang(locale);
    recog.interimResults = true;
    recog.continuous = false;
    recog.onresult = (event) => {
      const last = event.results[event.results.length - 1];
      if (!last) return;
      const heard = last[0].transcript.trim();
      setInput(heard);
      if (last.isFinal && heard) {
        if (speakingRef.current || isSahibEcho(heard)) return;
        stopListening();
        sendRef.current(heard);
      }
    };
    recog.onerror = () => {
      stopListening();
    };
    recog.onend = () => {
      setListening(false);
      recogRef.current = null;
    };
    recogRef.current = recog;
    try {
      recog.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    stopListening();
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
          placeholder={listening ? t('listening') : t('typeHere')}
          disabled={step === 'done' || busy}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base text-ink placeholder:text-muted/60"
        />
        {micReady ? (
          <button
            type="button"
            onClick={toggleMic}
            disabled={step === 'done' || busy}
            aria-pressed={listening}
            aria-label={listening ? t('listening') : t('listen')}
            className={`px-3 disabled:opacity-40 ${listening ? 'text-gold' : 'text-teal'}`}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="9" y="3.5" width="6" height="11" rx="3" />
              <path d="M6.5 11.5a5.5 5.5 0 0 0 11 0" />
              <path d="M12 17v3.5" />
            </svg>
          </button>
        ) : null}
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
