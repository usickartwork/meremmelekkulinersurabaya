import React from 'react';
import { Coffee, Laptop, Compass, BookOpen, Utensils, Rocket, Sparkles, ShoppingBag } from 'lucide-react';
import { DummyAd } from '@/data/dummy-ads';

export function AdIcon({ name, className = 'w-5 h-5' }: { name: DummyAd['svgIcon']; className?: string }) {
  switch (name) {
    case 'coffee':
      return <Coffee className={className} />;
    case 'laptop':
      return <Laptop className={className} />;
    case 'compass':
      return <Compass className={className} />;
    case 'book':
      return <BookOpen className={className} />;
    case 'utensils':
      return <Utensils className={className} />;
    case 'rocket':
      return <Rocket className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'bag':
    default:
      return <ShoppingBag className={className} />;
  }
}

