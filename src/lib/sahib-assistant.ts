export type AssistantStep =
  | 'guests'
  | 'date'
  | 'time'
  | 'name'
  | 'phone'
  | 'confirm'
  | 'done';

export type AssistantDraft = {
  guests?: number;
  date?: string;
  time?: string;
  name?: string;
  phone?: string;
};

export type AssistantLocale = 'en' | 'fr' | 'hi';

const weekdayNames: Record<AssistantLocale, string[]> = {
  en: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
  fr: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
  hi: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],
};

export function parseGuests(raw: string): number | null {
  const digits = raw.match(/(\d{1,2})/);
  if (!digits) return null;
  const n = Number(digits[1]);
  if (n < 1 || n > 20) return null;
  return n;
}

export function parsePhone(raw: string): string | null {
  const compact = raw.replace(/[^\d+]/g, '');
  const digits = compact.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) return null;
  return raw.trim();
}

export function parseTime(raw: string): string | null {
  const text = raw.trim().toLowerCase().replace('h', ':');
  const ampm = text.match(/^(\d{1,2})(?::(\d{2}))?\s*(a\.?m\.?|p\.?m\.?)?$/i);
  if (!ampm) return null;
  let hour = Number(ampm[1]);
  const minute = ampm[2] ? Number(ampm[2]) : 0;
  const mer = (ampm[3] ?? '').toLowerCase();
  if (mer.startsWith('p') && hour < 12) hour += 12;
  if (mer.startsWith('a') && hour === 12) hour = 0;
  if (hour > 23 || minute > 59) return null;
  const minutes = hour * 60 + minute;
  if (minutes < 11 * 60 + 30 || minutes > 21 * 60 + 30) return null;
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

export function parseDate(
  raw: string,
  closedWeekdays: number[],
  now = new Date(),
  locale: AssistantLocale = 'en',
): string | null {
  const text = raw.trim().toLowerCase();
  const iso = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) {
    const day = new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3])).getDay();
    if (closedWeekdays.includes(day)) return null;
    return `${iso[1]}-${iso[2]}-${iso[3]}`;
  }

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (/today|aujourd|आज/.test(text)) {
    if (closedWeekdays.includes(today.getDay())) return null;
    return isoDate(today);
  }
  if (/tomorrow|demain|कल/.test(text)) {
    const next = addDays(today, 1);
    if (closedWeekdays.includes(next.getDay())) return null;
    return isoDate(next);
  }

  const names = weekdayNames[locale];
  const idx = names.findIndex((n) => text.includes(n));
  if (idx >= 0) {
    let delta = (idx - today.getDay() + 7) % 7;
    if (delta === 0) delta = 7;
    const next = addDays(today, delta);
    if (closedWeekdays.includes(next.getDay())) return null;
    return isoDate(next);
  }
  return null;
}

export function openingLine(locationName: string, locale: AssistantLocale): string {
  if (locale === 'fr') {
    return `Bonjour, Sahib ${locationName}, j’écoute. Pour combien de personnes?`;
  }
  if (locale === 'hi') {
    return `नमस्ते, साहिब ${locationName}। कितने लोग आएंगे?`;
  }
  return `Hello, Sahib ${locationName}, this is Sahib. How many will be dining?`;
}

export function promptFor(
  step: AssistantStep,
  draft: AssistantDraft,
  locale: AssistantLocale,
): string {
  const lines = copy(locale);
  if (step === 'guests') return lines.askGuests;
  if (step === 'date') return lines.askDate;
  if (step === 'time') return lines.askTime;
  if (step === 'name') return lines.askName;
  if (step === 'phone') return lines.askPhone;
  if (step === 'confirm') {
    return lines.confirm
      .replace('{guests}', String(draft.guests ?? ''))
      .replace('{date}', draft.date ?? '')
      .replace('{time}', draft.time ?? '')
      .replace('{name}', draft.name ?? '');
  }
  return lines.done;
}

export function applyTurn(
  step: AssistantStep,
  raw: string,
  draft: AssistantDraft,
  closedWeekdays: number[],
  locale: AssistantLocale,
): { step: AssistantStep; draft: AssistantDraft; reply: string } {
  const lines = copy(locale);
  const text = raw.trim();

  if (step === 'guests') {
    const guests = parseGuests(text);
    if (!guests) return { step, draft, reply: lines.badGuests };
    const next = { ...draft, guests };
    return { step: 'date', draft: next, reply: lines.askDate };
  }

  if (step === 'date') {
    const date = parseDate(text, closedWeekdays, new Date(), locale);
    if (!date) return { step, draft, reply: lines.badDate };
    const next = { ...draft, date };
    return { step: 'time', draft: next, reply: lines.askTime };
  }

  if (step === 'time') {
    const time = parseTime(text);
    if (!time) return { step, draft, reply: lines.badTime };
    const next = { ...draft, time };
    return { step: 'name', draft: next, reply: lines.askName };
  }

  if (step === 'name') {
    if (text.length < 2) return { step, draft, reply: lines.badName };
    const next = { ...draft, name: text };
    return { step: 'phone', draft: next, reply: lines.askPhone };
  }

  if (step === 'phone') {
    const phone = parsePhone(text);
    if (!phone) return { step, draft, reply: lines.badPhone };
    const next = { ...draft, phone };
    return {
      step: 'confirm',
      draft: next,
      reply: promptFor('confirm', next, locale),
    };
  }

  if (step === 'confirm') {
    if (/^(n|no|non|नहीं)/i.test(text)) {
      return { step: 'guests', draft: {}, reply: lines.restart };
    }
    if (/^(y|yes|oui|ok|हाँ|हां)/i.test(text)) {
      return { step: 'done', draft, reply: lines.done };
    }
    return { step, draft, reply: lines.sayYes };
  }

  return { step, draft, reply: lines.done };
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function isoDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function copy(locale: AssistantLocale) {
  if (locale === 'fr') {
    return {
      askGuests: 'Pour combien de personnes?',
      askDate: 'Quel jour? (par ex. vendredi ou 2026-08-21)',
      askTime: 'À quelle heure? Entre 11 h 30 et 21 h 30.',
      askName: 'À quel nom?',
      askPhone: 'Un numéro de téléphone pour confirmer?',
      badGuests: 'Dites un nombre entre 1 et 20.',
      badDate: 'Ce jour-là on est fermé, ou je n’ai pas compris. Un autre jour?',
      badTime: 'Je n’ai pas cette heure. Essayez 19 h ou 19:00.',
      badName: 'Pouvez-vous répéter le nom?',
      badPhone: 'Il me faut un numéro à au moins 7 chiffres.',
      sayYes: 'Dites oui pour confirmer, ou non pour recommencer.',
      restart: 'D’accord, on recommence. Pour combien de personnes?',
      confirm:
        'Je réserve {guests} personnes le {date} à {time} pour {name}. Oui pour envoyer?',
      done: 'C’est noté. Nous confirmons sous peu. Merci, à bientôt chez Sahib.',
    };
  }
  if (locale === 'hi') {
    return {
      askGuests: 'कितने लोग?',
      askDate: 'कौन सा दिन? (जैसे शुक्रवार या 2026-08-21)',
      askTime: 'कितने बजे? 11:30 से 21:30 के बीच।',
      askName: 'किस नाम से?',
      askPhone: 'पुष्टि के लिए फ़ोन नंबर?',
      badGuests: '1 से 20 के बीच संख्या बताएँ।',
      badDate: 'उस दिन बंद हैं, या समझ नहीं आया। दूसरा दिन?',
      badTime: 'यह समय नहीं मिला। 19:00 आज़माएँ।',
      badName: 'नाम दोबारा कहें।',
      badPhone: 'कम से कम 7 अंकों का नंबर दें।',
      sayYes: 'हाँ कहें या नहीं कहकर फिर शुरू करें।',
      restart: 'ठीक है, फिर से। कितने लोग?',
      confirm: '{date} को {time} पर {name} के नाम से {guests} लोग। हाँ?',
      done: 'हो गया। हम जल्द पुष्टि करेंगे। साहिब में फिर मिलेंगे।',
    };
  }
  return {
    askGuests: 'How many will be dining?',
    askDate: 'Which day? (Friday, tomorrow, or 2026-08-21)',
    askTime: 'What time? Between 11:30 and 21:30.',
    askName: 'What name should I put?',
    askPhone: 'A phone number so we can confirm?',
    badGuests: 'Give me a number between 1 and 20.',
    badDate: 'We’re closed that day, or I didn’t catch it. Another day?',
    badTime: 'I don’t have that time. Try 7pm or 19:00.',
    badName: 'Could you say the name again?',
    badPhone: 'I need at least 7 digits.',
    sayYes: 'Say yes to send it, or no to start over.',
    restart: 'No problem. How many will be dining?',
    confirm: 'That’s {guests} guests on {date} at {time} for {name}. Shall I send that?',
    done: 'Noted. We’ll confirm shortly. Thank you for calling Sahib.',
  };
}
