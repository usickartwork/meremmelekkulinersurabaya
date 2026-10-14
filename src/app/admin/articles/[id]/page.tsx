import React from 'react';
import { notFound } from 'next/navigation';
import { getArticleById, getCategories, getMedia } from '@/lib/store';
import ArticleEditorForm from '@/components/admin/ArticleEditorForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 0;

export default async function EditArticlePage({ params }: PageProps) {
  const { id } = await params;
  const article = getArticleById(id);

  if (!article) {
    notFound();
  }

  const categories = getCategories();
  const media = getMedia();

  return (
    <ArticleEditorForm
      initialArticle={article}
      categories={categories}
      media={media}
    />
  );
}
