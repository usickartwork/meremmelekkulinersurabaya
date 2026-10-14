import React from 'react';
import { getArticles, getCategories } from '@/lib/store';
import ArticlesClient from './ArticlesClient';

export const revalidate = 0;

export default async function AdminArticlesPage() {
  const articles = getArticles();
  const categories = getCategories();

  return <ArticlesClient initialArticles={articles} categories={categories} />;
}
