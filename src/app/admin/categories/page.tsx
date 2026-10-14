import React from 'react';
import { getCategories, getArticles } from '@/lib/store';
import CategoriesClient from './CategoriesClient';

export const revalidate = 0;

export default async function AdminCategoriesPage() {
  const categories = getCategories();
  const articles = getArticles();

  return <CategoriesClient initialCategories={categories} articles={articles} />;
}
