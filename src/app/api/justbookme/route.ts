import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { cateringEmail, getLocationByBookSlug } from '@/content/locations';
import { cateringSendResult } from '@/lib/handle-catering';
import { parseJustBookMe } from '@/lib/justbookme-schema';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const honey =
    body && typeof body === 'object' && 'honey' in body
      ? (body as { honey: unknown }).honey
      : undefined;

  if (typeof honey === 'string' && honey !== '') {
    return new NextResponse(null, { status: 204 });
  }

  const parsed = parseJustBookMe(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid', issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const loc = getLocationByBookSlug(data.slug);
  if (!loc) {
    return NextResponse.json({ error: 'Unknown location' }, { status: 400 });
  }

  const summary = [
    `Location: ${loc.name.en}`,
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email || '—'}`,
    `Guests: ${data.guests}`,
    `When: ${data.date} ${data.time}`,
    `Notes: ${data.notes || '—'}`,
  ].join('\n');

  const remote = process.env.JUSTBOOKME_BOOK_URL;
  if (remote) {
    try {
      await fetch(remote, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: data.slug,
          customer_name: data.name,
          customer_phone: data.phone,
          customer_email: data.email || null,
          notes: `Party of ${data.guests}. ${data.notes}`.trim(),
          requested_for: `${data.date}T${data.time}:00`,
        }),
      });
    } catch {
      // Local request still succeeds via email / log.
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const from = process.env.CATERING_FROM;
    if (!from) {
      return NextResponse.json(
        { error: 'CATERING_FROM is not configured' },
        { status: 502 },
      );
    }
    const resend = new Resend(apiKey);
    const resendResponse = await resend.emails.send({
      from,
      to: cateringEmail,
      replyTo: data.email || undefined,
      subject: `Sahib booking · ${loc.name.en} · ${data.guests} guests`,
      text: summary,
    });
    const send = cateringSendResult(resendResponse);
    if (!send.ok) {
      return NextResponse.json({ error: send.message }, { status: 502 });
    }
  } else {
    console.info('[justbookme]', data);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
