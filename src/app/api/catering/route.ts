import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { cateringEmail } from '@/content/locations';
import { parseCatering } from '@/lib/handle-catering';

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

  const parsed = parseCatering(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid', issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: 'Sahib Catering <onboarding@resend.dev>',
      to: cateringEmail,
      replyTo: data.email,
      subject: `Catering quote: ${data.occasion} · ${data.guests} guests`,
      text: [
        `Name: ${data.firstName} ${data.lastName}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Guests: ${data.guests}`,
        `Occasion: ${data.occasion}`,
        `Notes: ${data.notes || '—'}`,
      ].join('\n'),
    });
  } else {
    console.info('[catering]', data);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
