import { supabase } from './supabase';

export type Category = string;
export type Segment = 'selectos' | 'fiestas' | 'b2b';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: Category;
  segment: Segment;
  inStock: boolean;
  packSize?: string;
  description?: string;
  idealFor?: string[];
  contents?: string[];
}

function mapProduct(p: any): Product {
  return {
    id: p.id,
    name: p.name,
    brand: p.brand,
    price: Number(p.price),
    originalPrice: p.original_price ? Number(p.original_price) : undefined,
    image: p.image_url,
    category: p.category,
    segment: p.segment as Segment,
    inStock: p.in_stock,
    packSize: p.pack_size || undefined,
    description: p.description,
    contents: p.contents ? p.contents.split(',').map((s: string) => s.trim()) : undefined,
  };
}

// Catálogo migrado completamente a Supabase — ya no se necesitan datos estáticos

export async function getCategories(): Promise<Category[]> {
  const { data } = await supabase.from('products').select('category');
  const categories = (data || []).map(p => p.category);
  return Array.from(new Set(categories.filter(Boolean)));
}

export async function getBrands(): Promise<string[]> {
  const { data } = await supabase.from('products').select('brand');
  const brands = (data || []).map(p => p.brand);
  return Array.from(new Set(brands.filter(Boolean)));
}

export async function getProducts(segment?: Segment): Promise<Product[]> {
  let query = supabase.from('products').select('*');
  if (segment) {
    query = query.eq('segment', segment);
  }
  const { data } = await query;
  return (data || []).map(mapProduct);
}

export async function getRelatedProducts(category: string, excludeId: string, limit: number = 4): Promise<Product[]> {
  const { data } = await supabase.from('products').select('*').eq('category', category).neq('id', excludeId).limit(limit);
  return (data || []).map(mapProduct);
}

export async function getRecentProducts(limit: number = 4): Promise<Product[]> {
  const { data } = await supabase.from('products').select('*').order('id', { ascending: false }).limit(limit);
  return (data || []).map(mapProduct);
}

export interface PaginatedProducts {
  products: Product[];
  total: number;
}

export async function getProductsPaginated(params: {
  page: number;
  limit: number;
  segment?: Segment;
  category?: string;
  brand?: string;
  q?: string;
  sortBy?: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<PaginatedProducts> {
  let query = supabase.from('products').select('*', { count: 'exact' });

  if (params.segment) {
    query = query.eq('segment', params.segment);
  }
  if (params.category) {
    query = query.eq('category', params.category);
  }
  if (params.brand) {
    query = query.eq('brand', params.brand);
  }
  if (params.q) {
    const q = `%${params.q}%`;
    query = query.or(`name.ilike.${q},brand.ilike.${q},category.ilike.${q}`);
  }
  if (params.minPrice !== undefined) {
    query = query.gte('price', params.minPrice);
  }
  if (params.maxPrice !== undefined) {
    query = query.lte('price', params.maxPrice);
  }

  if (params.sortBy === 'precio_menor') {
    query = query.order('price', { ascending: true });
  } else if (params.sortBy === 'precio_mayor') {
    query = query.order('price', { ascending: false });
  } else {
    // default sort by id desc
    query = query.order('id', { ascending: false });
  }

  const from = (params.page - 1) * params.limit;
  const to = from + params.limit - 1;

  query = query.range(from, to);

  const { data, count, error } = await query;
  
  if (error) {
    console.error("Error fetching products", error);
    return { products: [], total: 0 };
  }
  
  let finalProducts = (data || []).map(mapProduct);

  // mock original price for some
  finalProducts = finalProducts.map((p, i) => ({
    ...p,
    originalPrice: i % 3 === 0 ? p.price * 1.5 : undefined
  }));

  return {
    products: finalProducts,
    total: count || 0
  };
}

export async function searchProducts(query: string, segment?: Segment): Promise<Product[]> {
  const q = `%${query}%`;
  let dbQuery = supabase
    .from('products')
    .select('*')
    .or(`name.ilike.${q},brand.ilike.${q},category.ilike.${q}`);
    
  if (segment) {
    dbQuery = dbQuery.eq('segment', segment);
  }
  
  dbQuery = dbQuery.limit(10);
  
  const { data } = await dbQuery;
  return (data || []).map(mapProduct);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const { data } = await supabase.from('products').select('*').eq('id', id).single();
  return data ? mapProduct(data) : undefined;
}
