import { NextRequest, NextResponse } from 'next/server';
import { incrementArticleShares } from '@/lib/store';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const newShares = incrementArticleShares(id);
    return NextResponse.json({ success: true, shares: newShares });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
