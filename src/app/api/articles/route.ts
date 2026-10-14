import { NextRequest, NextResponse } from 'next/server';
import { getArticles, createArticle, getCategories } from '@/lib/store';
import { getLatestArticles, getPopularArticles, getTrendingArticles } from '@/lib/ranking';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;

    let articles = getArticles();

    if (categorySlug && categorySlug !== 'all') {
      const categories = getCategories();
      const cat = categories.find((c) => c.slug === categorySlug);
      if (cat) {
        articles = articles.filter((a) => a.categoryId === cat.id);
      }
    }

    if (status) {
      articles = articles.filter((a) => a.status === status);
    }

    if (search) {
      const q = search.toLowerCase();
      articles = articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.subtitle.toLowerCase().includes(q) ||
          (a.tags && a.tags.some((t) => t.toLowerCase().includes(q))) ||
          (a.location && a.location.toLowerCase().includes(q))
      );
    }

    if (sort === 'popular') {
      articles = getPopularArticles(articles, limit || articles.length);
    } else if (sort === 'trending') {
      articles = getTrendingArticles(articles, limit || articles.length);
    } else {
      articles = getLatestArticles(articles, limit || articles.length);
    }

    return NextResponse.json({ success: true, articles });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.categoryId || !body.content) {
      return NextResponse.json(
        { success: false, error: 'Judul, Kategori, dan Konten wajib diisi.' },
        { status: 400 }
      );
    }

    const categories = getCategories();
    const cat = categories.find((c) => c.id === body.categoryId);

    // Auto-generate slug if not provided
    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const newArticle = createArticle({
      title: body.title,
      slug,
      subtitle: body.subtitle || '',
      content: body.content,
      status: body.status || 'draft',
      authorId: body.authorId || 'auth-admin',
      authorName: body.authorName || 'Redaksi Merem Kuliner',
      authorAvatar: body.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
      categoryId: body.categoryId,
      categoryName: cat ? cat.name : 'Umum',
      publishedAt: body.status === 'published' ? new Date().toISOString() : '',
      featured: Boolean(body.featured),
      editorPick: Boolean(body.editorPick),
      breaking: Boolean(body.breaking),
      coverImage: body.coverImage || 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80',
      coverImageCaption: body.coverImageCaption || '',
      additionalImages: body.additionalImages || [],
      tags: body.tags || ['kuliner', 'surabaya'],
      readingTimeMinutes: Math.max(1, Math.ceil((body.content || '').split(/\s+/).length / 200)),
      location: body.location || '',
      priceRange: body.priceRange || '',
      openingHours: body.openingHours || '',
      seoTitle: body.seoTitle || body.title,
      seoDescription: body.seoDescription || body.subtitle,
    });

    return NextResponse.json({ success: true, article: newArticle });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
