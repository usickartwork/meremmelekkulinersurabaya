import { NextRequest, NextResponse } from 'next/server';
import { getArticleById, updateArticle, deleteArticle, getCategories } from '@/lib/store';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const article = getArticleById(id);
    if (!article) {
      return NextResponse.json({ success: false, error: 'Artikel tidak ditemukan' }, { status: 404 });
    }
    return NextResponse.json({ success: true, article });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (body.categoryId) {
      const categories = getCategories();
      const cat = categories.find((c) => c.id === body.categoryId);
      if (cat) {
        body.categoryName = cat.name;
      }
    }

    if (body.content) {
      body.readingTimeMinutes = Math.max(1, Math.ceil(body.content.split(/\s+/).length / 200));
    }

    const updated = updateArticle(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Artikel tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ success: true, article: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ok = deleteArticle(id);
    if (!ok) {
      return NextResponse.json({ success: false, error: 'Gagal menghapus artikel' }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
