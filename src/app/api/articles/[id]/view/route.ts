import { NextRequest, NextResponse } from 'next/server';
import { incrementArticleViews } from '@/lib/store';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const newViews = incrementArticleViews(id);
    return NextResponse.json({ success: true, views: newViews });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
