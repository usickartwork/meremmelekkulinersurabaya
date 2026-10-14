import mammoth from 'mammoth';
import { ImportPreviewArticle } from '@/types';

/**
 * PRD Section 7: DOCX Bulk Import Parser
 * Reads structured markers: [TITLE], [CATEGORY], [AUTHOR], [TAGS], [FEATURED_IMAGE], [CONTENT], [BREAKING], [EDITOR_PICK]
 */
export async function parseDocxBuffer(buffer: Buffer): Promise<ImportPreviewArticle[]> {
  const result = await mammoth.extractRawText({ buffer });
  const rawText = result.value;

  return parseArticlesFromText(rawText);
}

export function parseArticlesFromText(text: string): ImportPreviewArticle[] {
  // Normalize line breaks
  const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Split by [TITLE] delimiter
  const segments = normalized.split(/(?=\[TITLE\])/i).filter((s) => s.trim().length > 0);

  const parsedArticles: ImportPreviewArticle[] = [];

  for (const segment of segments) {
    if (!segment.toUpperCase().includes('[TITLE]')) continue;

    const getField = (tag: string): string => {
      // Matches [TAG] followed by content until next [NEXT_TAG] or end of string
      const regex = new RegExp(`\\[${tag}\\]\\s*([\\s\\S]*?)(?=\\[[A-Z_]+\\]|$)`, 'i');
      const match = segment.match(regex);
      return match ? match[1].trim() : '';
    };

    const title = getField('TITLE');
    const category = getField('CATEGORY');
    const author = getField('AUTHOR') || 'Redaksi Merem Kuliner';
    const tagsRaw = getField('TAGS');
    const tags = tagsRaw
      ? tagsRaw
          .split(',')
          .map((t) => t.trim())
          .filter((t) => t.length > 0)
      : ['surabaya', 'kuliner'];
    const featuredImage =
      getField('FEATURED_IMAGE') ||
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80';
    const content = getField('CONTENT');
    const breaking = getField('BREAKING').toUpperCase() === 'YES';
    const editorPick = getField('EDITOR_PICK').toUpperCase() === 'YES';

    const missingFields: string[] = [];
    if (!title) missingFields.push('TITLE');
    if (!category) missingFields.push('CATEGORY');
    if (!content) missingFields.push('CONTENT');

    parsedArticles.push({
      title,
      category,
      author,
      tags,
      featuredImage,
      content,
      breaking,
      editorPick,
      isValid: missingFields.length === 0,
      missingFields,
    });
  }

  return parsedArticles;
}

export const SAMPLE_DOCX_TEMPLATE_TEXT = `[TITLE]
5 Kuliner Legendaris Surabaya yang Wajib Dicoba Sekali Seumur Hidup

[CATEGORY]
Kuliner Legendaris

[AUTHOR]
Filius Patris

[TAGS]
surabaya, rawon, legendaris, rujak cingur

[FEATURED_IMAGE]
https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80

[CONTENT]
Surabaya bukan hanya kota pahlawan, tetapi juga surga cita rasa dengan rempah yang kuat dan berani. Dari rawon berkuah hitam pekat hingga rujak cingur yang kaya petis, berikut panduan lengkap mencicipi kuliner legendaris Surabaya yang tidak boleh dilewatkan.

[BREAKING]
NO

[EDITOR_PICK]
YES

---

[TITLE]
Eksplorasi Kafe Vintage di Sudut Kota Tua Surabaya

[CATEGORY]
Cafe & Resto

[AUTHOR]
Siti Rahmawati

[TAGS]
cafe, kopi, kota tua, nongkrong

[FEATURED_IMAGE]
https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80

[CONTENT]
Kawasan kota tua Surabaya kini semakin hidup dengan hadirnya deretan kafe berkonsep kolonial yang menyajikan racikan kopi artisan lokal Jawa Timur.

[BREAKING]
NO

[EDITOR_PICK]
NO
`;
