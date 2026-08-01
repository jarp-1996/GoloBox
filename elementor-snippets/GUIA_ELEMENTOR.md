# 🚀 Guía de Integración: De Prototipo HTML5 + Tailwind CSS a WordPress con Elementor

Este directorio contiene los **Snippets HTML5 optimizados para Elementor**, diseñados para el workflow de un **Desarrollador Web Moderno (Vibecoder)** que combina el maquetado ágil con IA y frameworks de vanguardia, para posteriormente integrarlos en **WordPress + Elementor** y **WooCommerce**.

---

## 🎯 ¿Por qué este Workflow?

1. **Prototipado Ágil y Visualmente Impactante**: Maquetar primero usando HTML5 puro + Tailwind CSS permite lograr interfaces modernas (Glassmorphism, Dark Mode, animaciones fluidas) sin las limitaciones iniciales de las plantillas de WordPress.
2. **Transferibilidad sin Fricción**: Una vez que el diseño y la experiencia de usuario (UX) están aprobados en el MVP estático, se trasladan directamente como módulos o widgets HTML en **Elementor**.
3. **Autonomía para el Cliente/Agencia**: Al integrar el front-end en Elementor y conectar los botones con WooCommerce, el cliente final obtiene su panel de control en WordPress para gestionar inventario, precios y pedidos sin tocar una línea de código.

---

## 📂 Contenido del Directorio `elementor-snippets/`

| Archivo | Página Destino en WordPress | Descripción |
| :--- | :--- | :--- |
| `1_HOME_ELEMENTOR.html` | Página de Inicio (Home) | Hero Banner, cinta Marquee, sección Nuestras Experiencias y CTA B2B. |
| `2_BOXES_ELEMENTOR.html` | Catálogo - Boxes de Regalo | Grilla completa de productos con precios en Soles y botones para WooCommerce. |
| `3_PACKS_ELEMENTOR.html` | Catálogo - Packs Cumpleaños | Grilla de packs para celebraciones y eventos. |
| `4_CORPORATIVO_ELEMENTOR.html` | Landing - Regalos Corporativos | Landing B2B con beneficios empresariales, catálogo exclusivo y formulario/contacto. |
| `5_PRODUCTO_ANTOJOS_ELEMENTOR.html` | Producto - Detalle (Plantilla) | Estructura individual de producto, descripción, precio y botón "Añadir al Carrito". |

---

## 🛠️ Cómo Usar los Snippets en Elementor

1. Abre tu página o plantilla en **WordPress con Elementor**.
2. Arrastra el widget **"Código HTML" (HTML Code)** al área de contenido de tu página.
3. Abre el archivo `.html` correspondiente de esta carpeta (por ejemplo, `1_HOME_ELEMENTOR.html`).
4. **Copia todo el contenido y pégalo** en el campo de texto del widget de Elementor.
5. **¡Listo!** Verás cómo los estilos de Tailwind CSS y las imágenes (servidas en alta velocidad desde la nube de Vercel) se aplican de inmediato en tu maquetador visual.

---

## 🛒 Conexión con WooCommerce

* Los botones de *"Añadir al Carrito"* o *"Comprar"* en las tarjetas de producto pueden enlazar al endpoint estándar de WooCommerce:
  ```
  /checkout/?add-to-cart=ID_DEL_PRODUCTO
  ```
* O bien gestionarse mediante un botón nativo de WooCommerce de Elementor colocado debajo de las tarjetas visuales.
