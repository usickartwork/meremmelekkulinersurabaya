import { NextRequest, NextResponse } from 'next/server';
import { getMedia, createMediaItem, deleteMediaItem } from '@/lib/store';

export async function GET() {
  try {
    const media = getMedia();
    return NextResponse.json({ success: true, media });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.url) {
      return NextResponse.json({ success: false, error: 'URL gambar wajib diisi' }, { status: 400 });
    }

    const newItem = createMediaItem({
      filename: body.filename || `foto-${Date.now()}.jpg`,
      url: body.url,
      alt: body.alt || 'Foto Kuliner Surabaya',
      caption: body.caption || '',
      sizeBytes: body.sizeBytes || 250000,
    });

    return NextResponse.json({ success: true, media: newItem });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID media wajib disertakan' }, { status: 400 });
    }

    const ok = deleteMediaItem(id);
    if (!ok) {
      return NextResponse.json({ success: false, error: 'Media tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
