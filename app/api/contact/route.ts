import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

async function verifyTurnstile(token: unknown, ip: string | null) {
  if (typeof token !== 'string' || !token) return false;

  const body = new URLSearchParams({
    secret: process.env.TURNSTILE_SECRET_KEY ?? '',
    response: token,
  });
  if (ip) body.append('remoteip', ip);

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  });
  if (!res.ok) return false;

  const data: { success?: boolean } = await res.json();
  return data.success === true;
}

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, message, turnstileToken } = await req.json();

  if (!firstName || !lastName || !email || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  if (!(await verifyTurnstile(turnstileToken, req.headers.get('cf-connecting-ip')))) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Sheet1!A:E',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[new Date().toISOString(), firstName, lastName, email, message]],
    },
  });

  return NextResponse.json({ success: true });
}
