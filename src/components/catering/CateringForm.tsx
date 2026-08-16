'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { parseCatering } from '@/lib/handle-catering';

const fieldKeys = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'guests',
  'occasion',
  'notes',
] as const;

type FieldKey = (typeof fieldKeys)[number];

const errorKeys: Partial<Record<FieldKey, string>> = {
  firstName: 'invalidFirstName',
  lastName: 'invalidLastName',
  email: 'invalidEmail',
  phone: 'invalidPhone',
  guests: 'invalidGuests',
  occasion: 'invalidOccasion',
  notes: 'invalidNotes',
};

const inputClass =
  'mt-2 w-full border border-line bg-transparent px-3 py-3 text-base text-ink placeholder:text-muted/60 focus:border-teal';

export function CateringForm() {
  const t = useTranslations('catering');
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<FieldKey, string>>
  >({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setFieldErrors({});

    const form = event.currentTarget;
    const fd = new FormData(form);
    const payload = {
      firstName: String(fd.get('firstName') ?? ''),
      lastName: String(fd.get('lastName') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      guests: fd.get('guests') === '' ? '' : Number(fd.get('guests')),
      occasion: String(fd.get('occasion') ?? ''),
      notes: String(fd.get('notes') ?? ''),
      honey: String(fd.get('honey') ?? ''),
    };

    const parsed = parseCatering(payload);
    if (!parsed.success) {
      const next: Partial<Record<FieldKey, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? '') as FieldKey;
        const msgKey = errorKeys[key];
        if (msgKey && !next[key]) {
          next[key] = t(msgKey);
        }
      }
      setFieldErrors(next);
      setStatus('idle');
      return;
    }

    try {
      const res = await fetch('/api/catering', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      if (res.status === 204 || res.ok) {
        setStatus('success');
        form.reset();
        return;
      }

      if (res.status === 400) {
        const data = (await res.json()) as {
          issues?: { path: (string | number)[] }[];
        };
        const next: Partial<Record<FieldKey, string>> = {};
        for (const issue of data.issues ?? []) {
          const key = String(issue.path[0] ?? '') as FieldKey;
          const msgKey = errorKeys[key];
          if (msgKey && !next[key]) {
            next[key] = t(msgKey);
          }
        }
        setFieldErrors(next);
        setStatus('idle');
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
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id="firstName"
          label={t('firstName')}
          error={fieldErrors.firstName}
          autoComplete="given-name"
          required
        />
        <Field
          id="lastName"
          label={t('lastName')}
          error={fieldErrors.lastName}
          autoComplete="family-name"
          required
        />
      </div>
      <Field
        id="email"
        label={t('email')}
        type="email"
        error={fieldErrors.email}
        autoComplete="email"
        required
      />
      <Field
        id="phone"
        label={t('phone')}
        type="tel"
        error={fieldErrors.phone}
        autoComplete="tel"
        required
      />
      <Field
        id="guests"
        label={t('guests')}
        type="number"
        error={fieldErrors.guests}
        min={1}
        max={2000}
        required
      />
      <Field
        id="occasion"
        label={t('occasion')}
        error={fieldErrors.occasion}
        required
      />
      <div>
        <label htmlFor="notes" className="block text-sm tracking-wide text-muted">
          {t('notes')}
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className={inputClass}
          aria-invalid={fieldErrors.notes ? true : undefined}
          aria-describedby={fieldErrors.notes ? 'notes-error' : undefined}
        />
        {fieldErrors.notes ? (
          <p id="notes-error" className="mt-2 text-sm text-teal" role="alert">
            {fieldErrors.notes}
          </p>
        ) : null}
      </div>

      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="honey">Leave blank</label>
        <input
          id="honey"
          name="honey"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
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

function Field({
  id,
  label,
  error,
  type = 'text',
  autoComplete,
  min,
  max,
  required,
}: {
  id: FieldKey;
  label: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  min?: number;
  max?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm tracking-wide text-muted">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        min={min}
        max={max}
        required={required}
        className={inputClass}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-teal" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
