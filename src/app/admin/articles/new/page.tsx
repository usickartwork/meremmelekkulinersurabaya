import React from 'react';
import { getCategories, getMedia } from '@/lib/store';
import ArticleEditorForm from '@/components/admin/ArticleEditorForm';

export const revalidate = 0;

export default async function NewArticlePage() {
  const categories = getCategories();
  const media = getMedia();

  return <ArticleEditorForm categories={categories} media={media} />;
}
