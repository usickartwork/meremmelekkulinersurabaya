import React from 'react';
import { getMedia } from '@/lib/store';
import MediaClient from './MediaClient';

export const revalidate = 0;

export default async function AdminMediaPage() {
  const media = getMedia();
  return <MediaClient initialMedia={media} />;
}
