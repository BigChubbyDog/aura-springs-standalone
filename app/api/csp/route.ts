import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'CSP headers are configured in next.config.js'
  });
}