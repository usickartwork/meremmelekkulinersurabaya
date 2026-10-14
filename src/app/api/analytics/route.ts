import { NextResponse } from 'next/server';
import { getAnalyticsSummary } from '@/lib/store';

export async function GET() {
  try {
    const summary = getAnalyticsSummary();
    return NextResponse.json({ success: true, analytics: summary });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
