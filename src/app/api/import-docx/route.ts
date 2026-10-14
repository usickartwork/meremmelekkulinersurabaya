import { NextRequest, NextResponse } from 'next/server';
import { parseDocxBuffer, parseArticlesFromText } from '@/lib/docx-parser';
import { createArticle, getCategories } from '@/lib/store';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const commit = request.nextUrl.searchParams.get('commit') === 'true';

    const file = formData.get('file') as File | null;
    const rawText = formData.get('rawText') as string | null;

    let parsedArticles = [];

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      parsedArticles = await parseDocxBuffer(buffer);
    } else if (rawText) {
      parsedArticles = parseArticlesFromText(rawText);
    } else {
      return NextResponse.json(
        { success: false, error: 'Silakan lampirkan file .docx atau teks template.' },
        { status: 400 }
      );
    }

    if (commit) {
      const categories = getCategories();
      const createdArticles = [];

      for (const item of parsedArticles) {
        if (!item.isValid) continue;

        // Find or fallback category
        let cat = categories.find(
          (c) => c.name.toLowerCase() === item.category.toLowerCase()
        );
        if (!cat) {
          cat = categories[0];
        }

        const slug = item.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');

        const created = createArticle({
          title: item.title,
          slug,
          subtitle: item.content.slice(0, 150) + '...',
          content: item.content,
          status: 'draft', // PRD: Imported articles are saved as Draft
          authorId: 'auth-import',
          authorName: item.author || 'Redaksi Merem Kuliner',
          authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
          categoryId: cat.id,
          categoryName: cat.name,
          publishedAt: '',
          featured: false,
          editorPick: item.editorPick,
          breaking: item.breaking,
          coverImage: item.featuredImage || 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80',
          coverImageCaption: item.title,
          tags: item.tags,
          readingTimeMinutes: Math.max(1, Math.ceil(item.content.split(/\s+/).length / 200)),
          location: 'Surabaya',
          priceRange: 'Menyesuaikan',
          seoTitle: item.title,
          seoDescription: item.content.slice(0, 150),
        });

        createdArticles.push(created);
      }

      return NextResponse.json({
        success: true,
        committed: true,
        count: createdArticles.length,
        articles: createdArticles,
      });
    }

    return NextResponse.json({
      success: true,
      parsedArticles,
      totalParsed: parsedArticles.length,
      validCount: parsedArticles.filter((a) => a.isValid).length,
    });
  } catch (error: any) {
    console.error('Import DOCX error:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal memproses file DOCX: ' + error.message },
      { status: 500 }
    );
  }
}
