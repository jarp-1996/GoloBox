# Guía del Proyecto GoloBox — Para Agentes IA

## ⚠️ ADVERTENCIA CRÍTICA
**Este repositorio es GOLOBOX (versión Boxes/Cajas con diseño brutalista de fondo negro).
NO ES la versión Mayorista (B2B Wholesales). ¡NO sobrescribir con código mayorista!**

El commit `83b882a` ("Restaurar version B2B Mayorista") fue un error que sobrescribió
todo el código GoloBox con la versión mayorista. Fue revertido en el commit `0cdc6d0`.

---

## 🏗️ Arquitectura del Proyecto

### Stack Tecnológico
- **Framework**: Next.js 15.x (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: CSS puro (globals.css) — diseño brutalista, fondo negro, tipografía bold
- **Base de datos**: Supabase (PostgreSQL)
- **Pagos**: MercadoPago SDK
- **Notificaciones**: Telegram Bot API
- **Deploy**: Vercel (proyecto: `golo-box`)

### URLs de Producción
- **GoloBox (este proyecto)**: `golo-box.vercel.app`
- **Golozin Wholesales (otro repo)**: `golozin-wholesales.vercel.app`

---

## 📁 Estructura de Archivos Clave

```
GoloBox/
├── app/
│   ├── page.tsx              # Landing principal (hero brutalista "ANTOJOS PERUANOS EN BOXES")
│   ├── layout.tsx            # Layout raíz con fuentes y metadata
│   ├── globals.css           # Estilos globales — diseño brutalista oscuro
│   ├── boxes-de-regalo/      # Página de Boxes de Regalo
│   ├── packs-cumpleanos/     # Página de Packs de Cumpleaños
│   ├── corporativo/          # Página Corporativa
│   ├── producto/[id]/        # Detalle de producto dinámico
│   │   ├── page.tsx
│   │   └── ProductDetail.tsx
│   ├── checkout/             # Flujo de compra
│   ├── admin/                # Panel de administración
│   │   ├── page.tsx          # Dashboard admin
│   │   ├── login/page.tsx    # Login de admin
│   │   └── pedidos/          # Gestión de pedidos
│   └── api/
│       ├── admin/login/      # API de autenticación admin
│       ├── mp/create-payment/ # Crear pago con MercadoPago
│       └── webhooks/mercadopago/ # Webhook de confirmación MP
├── components/
│   ├── Header.tsx            # Navbar con menú: INICIO, BOXES, PACKS, CORPORATIVO
│   ├── Footer.tsx            # Footer brutalista
│   ├── CartDrawer.tsx        # Carrito lateral deslizable
│   ├── CheckoutModal.tsx     # Modal de checkout
│   ├── ProductCard.tsx       # Tarjeta de producto
│   └── CursorFollower.tsx    # Efecto cursor personalizado
├── lib/
│   ├── supabase.ts           # Cliente Supabase + tipos DB
│   └── catalog.ts            # Funciones para obtener productos/categorías
├── middleware.ts             # Middleware de Next.js
└── public/
    └── images/               # Imágenes de boxes (antojos, chocolates, mesa, etc.)
```

---

## 🔑 Variables de Entorno

### Archivo `.env.local` (desarrollo local)
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

# MercadoPago
MP_ACCESS_TOKEN=APP_USR-xxxx

# Admin
ADMIN_EMAIL=admin@golozin.com

# Telegram
TELEGRAM_BOT_TOKEN=xxxx:xxxx
TELEGRAM_CHAT_ID=xxxx

# Site URL (para webhooks)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### En Vercel (producción)
Las mismas variables deben estar configuradas en:
**Vercel > Settings > Environment Variables**

⚠️ Las variables `NEXT_PUBLIC_*` son accesibles en el cliente (browser).
Las variables sin ese prefijo solo están disponibles en el servidor (API routes).

---

## 🎨 Estilo Visual — Diseño Brutalista

El diseño de GoloBox es **brutalista** inspirado en Beech Agency:
- **Fondo**: Negro (#000) o muy oscuro
- **Texto**: Blanco, tipografía bold/black gigante
- **Acentos**: Rojo (#E3001B) para CTAs y elementos destacados
- **Hero**: Texto en 3 líneas grandes ("ANTOJOS / PERUANOS / EN BOXES.")
- **Navegación**: INICIO | BOXES ↓ | PACKS ↓ | CORPORATIVO
- **Sin barra de categorías lateral** (eso es de la versión mayorista)

---

## 🗄️ Base de Datos (Supabase)

### Tablas principales
- **products**: Catálogo de productos (id, name, brand, price, image_url, category, segment, in_stock, etc.)
- **orders**: Pedidos (id, status, customer_email, customer_name, total_amount, payment_id, items, telegram_notified)

### Segmentos de productos
- `selectos`: Productos selectos
- `fiestas`: Productos para fiestas
- `b2b`: Productos al por mayor

---

## 🛒 Flujo de Compra

1. Usuario navega boxes/packs → agrega productos al carrito (CartDrawer)
2. Abre checkout → ingresa datos personales (CheckoutModal)
3. Se crea un pago con MercadoPago vía `/api/mp/create-payment`
4. El pedido se guarda en Supabase con status "pending"
5. MP procesa el pago y envía webhook a `/api/webhooks/mercadopago`
6. El webhook actualiza el status del pedido y notifica por Telegram

---

## 🚀 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor local
npm run dev
# → http://localhost:3000

# Build de producción
npm run build

# Nota: En Windows con PowerShell, si npm falla por permisos,
# usar: cmd /c npm run dev
```

---

## 📋 Historial de Commits Importantes

| Commit | Descripción |
|--------|-------------|
| `0cdc6d0` | ✅ Restauración de GoloBox (versión actual correcta) |
| `83b882a` | ❌ Sobreescritura con mayorista (REVERTIDO) |
| `9d60050` | SEO: Google Search Console |
| `3110b10` | UI: Grilla de productos en Boxes y Packs |
| `c0f0b74` | Rediseño brutalista completo (Beech Agency) |
| `da23747` | Limpieza total de componentes viejos |

---

## 🔧 Problemas Conocidos y Soluciones

### Error: "supabaseUrl is required" en Vercel
**Causa**: Variables de entorno no configuradas en Vercel.
**Solución**: Agregar `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, y `SUPABASE_SERVICE_ROLE_KEY` en Vercel > Settings > Environment Variables. Luego hacer Redeploy.

### Error: "npm.ps1 está deshabilitado" en PowerShell
**Causa**: Política de ejecución de scripts de Windows.
**Solución**: Usar `cmd /c npm run dev` en lugar de `npm run dev`.

### Next.js no encuentra "next" después de clonar
**Causa**: Falta `node_modules`.
**Solución**: Ejecutar `npm install` primero.

---

## ⚠️ Reglas para Agentes IA

1. **NUNCA** sobrescribir este código con la versión mayorista (golozin-b2b/wholesales).
2. **SIEMPRE** mantener el diseño brutalista (fondo negro, texto gigante blanco/rojo).
3. **NO** agregar barra lateral de categorías, filtros de precio, ni elementos de la versión mayorista.
4. Las páginas principales son: Landing, Boxes de Regalo, Packs Cumpleaños, Corporativo.
5. El menú del Header debe ser: INICIO | BOXES | PACKS | CORPORATIVO + carrito.
6. Antes de hacer cambios grandes, verificar que estás en la rama correcta con `git log --oneline -3`.
