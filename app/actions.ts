'use server';

import { searchProducts } from '@/lib/catalog';
import type { Segment } from '@/lib/catalog';

export async function searchProductsAction(query: string, segment?: string) {
  return searchProducts(query, segment as Segment);
}
