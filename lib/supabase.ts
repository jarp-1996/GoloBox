import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Cliente para el lado del browser (componentes 'use client')
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos de la base de datos
export type DbProduct = {
  id: string;
  name: string;
  brand: string;
  price: number;
  original_price: number | null;
  image_url: string;
  category: string;
  segment: 'selectos' | 'fiestas' | 'b2b';
  in_stock: boolean;
  pack_size: string | null;
  created_at: string;
};

export type DbOrder = {
  id: string;
  created_at: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  customer_email: string;
  customer_name: string;
  total_amount: number;
  payment_id: string | null;
  payment_status: string | null;
  items: OrderItem[];
  telegram_notified: boolean;
};

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};
