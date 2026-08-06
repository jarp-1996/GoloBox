/**
 * Script de Seed: Migra los 112 productos del catalog.ts a Supabase
 * Ejecutar con: npx ts-node scripts/seed.ts
 * (Solo se ejecuta UNA VEZ después de crear las tablas)
 */

import { createClient } from '@supabase/supabase-js';
import { catalog } from '../lib/catalog';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Faltan variables de entorno: NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
  console.log('🌱 Iniciando migración de', catalog.length, 'productos a Supabase...\n');

  // Transformar los productos al formato de la base de datos
  const products = catalog.map(p => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    price: p.price,
    original_price: p.originalPrice ?? null,
    image_url: p.image,
    category: p.category,
    segment: p.segment,
    in_stock: p.inStock,
    pack_size: p.packSize ?? null,
  }));

  // Insertar en lotes de 20 para no saturar la API
  const chunkSize = 20;
  for (let i = 0; i < products.length; i += chunkSize) {
    const chunk = products.slice(i, i + chunkSize);
    const { error } = await supabase
      .from('products')
      .upsert(chunk, { onConflict: 'id' });

    if (error) {
      console.error(`❌ Error en lote ${i / chunkSize + 1}:`, error.message);
    } else {
      console.log(`✅ Lote ${i / chunkSize + 1}: ${chunk.length} productos migrados`);
    }
  }

  console.log('\n🎉 ¡Migración completa! Ya puedes ver los productos en el panel de Supabase.');
}

seed().catch(console.error);
