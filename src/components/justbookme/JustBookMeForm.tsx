'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { dinnerSlots, parseJustBookMe } from '@/lib/justbookme-schema';

const fieldKeys = ['name', 'phone', 'email', 'guests', 'date', 'time', 'notes'] as const;
type FieldKey = (typeof fieldKeys)[number];

const errorKeys: Partial<Record<FieldKey, string>> = {
  name: 'invalidName',
  phone: 'invalidPhone',
  email: 'invalidEmail',
  guests: 'invalidGuests',
  date: 'invalidDate',
  time: 'invalidTime',
};

const inputClass =
  'mt-2 w-full border border-line bg-transparent px-3 py-3 text-base text-ink placeholder:text-muted/60 focus:border-teal';

export function JustBookMeForm({ slug }: { slug: string }) {
  const t = useTranslations('justbookme');
  const slots = useMemo(() => dinnerSlots(), []);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle',
  );
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, string>>>(
    {},
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setFieldErrors({});

    const form = event.currentTarget;
    const fd = new FormData(form);
    const payload = {
      slug,
      name: String(fd.get('name') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      email: String(fd.get('email') ?? ''),
      guests: fd.get('guests') === '' ? '' : Number(fd.get('guests')),
      date: String(fd.get('date') ?? ''),
      time: String(fd.get('time') ?? ''),
      notes: String(fd.get('notes') ?? ''),
      honey: String(fd.get('honey') ?? ''),
    };

    const parsed = parseJustBookMe(payload);
    if (!parsed.success) {
      const next: Partial<Record<FieldKey, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? '') as FieldKey;
        const msgKey = errorKeys[key];
        if (msgKey && !next[key]) next[key] = t(msgKey);
      }
      setFieldErrors(next);
      setStatus('idle');
      return;
    }

    try {
      const res = await fetch('/api/justbookme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      if (res.status === 204 || res.ok) {
        setStatus('success');
        form.reset();
        return;
      }
      setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p className="mt-12 text-lg text-teal" role="status">
        {t('success')}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-12 max-w-xl space-y-6" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm tracking-wide text-muted">
          {t('name')}
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          className={inputClass}
          aria-invalid={fieldErrors.name ? true : undefined}
        />
        {fieldErrors.name ? (
          <p className="mt-2 text-sm text-teal" role="alert">
            {fieldErrors.name}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm tracking-wide text-muted">
          {t('phone')}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          className={inputClass}
        />
        {fieldErrors.phone ? (
          <p className="mt-2 text-sm text-teal" role="alert">
            {fieldErrors.phone}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm tracking-wide text-muted">
          {t('email')}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={inputClass}
        />
        {fieldErrors.email ? (
          <p className="mt-2 text-sm text-teal" role="alert">
            {fieldErrors.email}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="guests" className="block text-sm tracking-wide text-muted">
          {t('guests')}
        </label>
        <input
          id="guests"
          name="guests"
          type="number"
          min={1}
          max={20}
          required
          className={inputClass}
        />
        {fieldErrors.guests ? (
          <p className="mt-2 text-sm text-teal" role="alert">
            {fieldErrors.guests}
          </p>
        ) : null}
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className="block text-sm tracking-wide text-muted">
            {t('date')}
          </label>
          <input id="date" name="date" type="date" required className={inputClass} />
          {fieldErrors.date ? (
            <p className="mt-2 text-sm text-teal" role="alert">
              {fieldErrors.date}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="time" className="block text-sm tracking-wide text-muted">
            {t('time')}
          </label>
          <select id="time" name="time" required className={inputClass}>
            <option value="">{t('pickTime')}</option>
            {slots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {fieldErrors.time ? (
            <p className="mt-2 text-sm text-teal" role="alert">
              {fieldErrors.time}
            </p>
          ) : null}
        </div>
      </div>
      <div>
        <label htmlFor="notes" className="block text-sm tracking-wide text-muted">
          {t('notes')}
        </label>
        <textarea id="notes" name="notes" rows={4} className={inputClass} />
      </div>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <input name="honey" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      {status === 'error' ? (
        <p className="text-sm text-teal" role="alert">
          {t('error')}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="text-lg tracking-wide text-teal hover:text-ink disabled:opacity-50"
      >
        {t('send')}
      </button>
    </form>
  );
}
