import React from 'react';
import AdSlot from './ads/AdSlot';

/**
 * Parses inline Markdown formatting:
 * - **bold text**
 * - *italic text*
 * - [link text](url)
 */
export function renderFormattedInline(text: string): React.ReactNode {
  if (!text) return text;

  // Split by bold (**...**), italic (*...*), or links ([...](...))
  const regex = /(\*\*.*?\*\*|\*.*?\*|\[.*?\]\(.*?\))/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Bold: **text**
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const inner = part.slice(2, -2);
      return (
        <strong key={index} className="font-bold text-neutral-950">
          {renderFormattedInline(inner)}
        </strong>
      );
    }

    // Italic: *text*
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      const inner = part.slice(1, -1);
      return (
        <em key={index} className="italic text-neutral-800">
          {inner}
        </em>
      );
    }

    // Link: [text](url)
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-600 hover:underline font-medium"
        >
          {linkMatch[1]}
        </a>
      );
    }

    return part;
  });
}

/**
 * Formats multi-paragraph Markdown content with:
 * - Headings (##, ###)
 * - Blockquotes (>)
 * - Bullet lists (- or *)
 * - Paragraphs with bold and italics
 */
export function MarkdownRenderer({
  content,
  className = '',
  showInArticleAd = false,
}: {
  content: string;
  className?: string;
  showInArticleAd?: boolean;
}) {
  if (!content) return null;

  const rawBlocks = content.split(/\n\s*\n/).filter((b) => b.trim().length > 0);

  // Count standard paragraphs to determine insertion point
  let totalParagraphs = 0;
  for (const block of rawBlocks) {
    const trimmed = block.trim();
    const isHeading = trimmed.startsWith('#');
    const isQuote = trimmed.startsWith('>');
    const lines = trimmed.split('\n').filter((l) => l.trim().length > 0);
    const isList =
      lines.length > 0 &&
      lines.every((line) => line.trim().startsWith('- ') || line.trim().startsWith('* '));

    if (!isHeading && !isQuote && !isList) {
      totalParagraphs++;
    }
  }

  // Insert after paragraph 3 if >= 4 paragraphs, or after paragraph 2 if 2-3 paragraphs. Omit if < 2 paragraphs.
  const adTargetParagraph =
    totalParagraphs >= 4 ? 3 : totalParagraphs >= 2 ? 2 : -1;

  let paragraphCounter = 0;
  let adRendered = false;

  return (
    <div className={`space-y-6 ${className}`}>
      {rawBlocks.map((block, blockIdx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Heading 2: ##
        if (trimmed.startsWith('## ')) {
          return (
            <h2
              key={blockIdx}
              className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-10 mb-4 font-editorial-serif border-b border-neutral-200 pb-2"
            >
              {renderFormattedInline(trimmed.replace(/^##\s+/, ''))}
            </h2>
          );
        }

        // Heading 3: ###
        if (trimmed.startsWith('### ')) {
          return (
            <h3
              key={blockIdx}
              className="text-xl sm:text-2xl font-bold text-neutral-900 mt-8 mb-3 font-editorial-serif border-b border-neutral-200 pb-2"
            >
              {renderFormattedInline(trimmed.replace(/^###\s+/, ''))}
            </h3>
          );
        }

        // Blockquote: >
        if (trimmed.startsWith('> ')) {
          const quoteText = trimmed.replace(/^>\s*/, '').replace(/\n>\s*/g, ' ');
          return (
            <blockquote
              key={blockIdx}
              className="border-l-4 border-orange-500 pl-5 py-3 italic text-neutral-800 my-6 bg-orange-50/50 rounded-r-sm text-base sm:text-lg font-medium leading-relaxed"
            >
              {renderFormattedInline(quoteText)}
            </blockquote>
          );
        }

        // Bullet list: lines starting with "- " or "* "
        const lines = trimmed.split('\n').filter((l) => l.trim().length > 0);
        const isList =
          lines.length > 0 &&
          lines.every((line) => line.trim().startsWith('- ') || line.trim().startsWith('* '));

        if (isList) {
          return (
            <ul key={blockIdx} className="space-y-2 my-4 pl-1">
              {lines.map((line, liIdx) => {
                const itemText = line.trim().replace(/^[-*]\s+/, '');
                return (
                  <li key={liIdx} className="flex items-start gap-2.5 text-neutral-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2.5 shrink-0" />
                    <span className="flex-1">{renderFormattedInline(itemText)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // Standard Paragraph
        paragraphCounter++;
        const shouldInsertAd =
          showInArticleAd &&
          !adRendered &&
          adTargetParagraph > 0 &&
          paragraphCounter === adTargetParagraph;

        if (shouldInsertAd) {
          adRendered = true;
        }

        return (
          <React.Fragment key={blockIdx}>
            <p className="leading-relaxed">
              {trimmed.split('\n').map((line, lineIdx) => (
                <React.Fragment key={lineIdx}>
                  {lineIdx > 0 && <br />}
                  {renderFormattedInline(line)}
                </React.Fragment>
              ))}
            </p>
            {shouldInsertAd && (
              <div className="my-8 not-prose">
                <AdSlot placement="in-article" />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default MarkdownRenderer;

