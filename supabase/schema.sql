-- ================================================
-- GOLOZIN E-COMMERCE — Schema SQL para Supabase
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ================================================

-- Tabla de Productos (reemplaza catalog.ts hardcoded)
CREATE TABLE IF NOT EXISTS products (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  brand       TEXT NOT NULL,
  price       NUMERIC(10, 2) NOT NULL,
  original_price NUMERIC(10, 2),
  image_url   TEXT NOT NULL,
  category    TEXT NOT NULL,
  segment     TEXT NOT NULL CHECK (segment IN ('selectos', 'fiestas', 'b2b')),
  in_stock    BOOLEAN NOT NULL DEFAULT TRUE,
  pack_size   TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Pedidos
CREATE TABLE IF NOT EXISTS orders (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  status          TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  customer_email  TEXT NOT NULL,
  customer_name   TEXT,
  total_amount    NUMERIC(10, 2) NOT NULL,
  payment_id      TEXT,
  payment_status  TEXT,
  items           JSONB NOT NULL DEFAULT '[]',
  telegram_notified BOOLEAN DEFAULT FALSE
);

-- Índices para consultas frecuentes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_segment ON products(segment);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_id ON orders(payment_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Habilitar Row Level Security (buena práctica)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Política: cualquiera puede leer productos (tienda pública)
CREATE POLICY "Public can read products"
  ON products FOR SELECT
  USING (TRUE);

-- Política: solo el backend puede insertar/actualizar pedidos (via service_role key)
-- Los pedidos NO son accesibles desde el frontend directamente
CREATE POLICY "Service role can manage orders"
  ON orders FOR ALL
  USING (auth.role() = 'service_role');

-- Política: solo el backend puede gestionar productos
CREATE POLICY "Service role can manage products"
  ON products FOR ALL
  USING (auth.role() = 'service_role');
