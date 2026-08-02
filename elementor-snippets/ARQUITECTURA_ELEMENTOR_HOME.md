# 🏗️ Arquitectura Visual en Elementor: Traducción de Tailwind CSS a Flexbox y Widgets Nativos

> **Objetivo Profesional (Agencia)**: Construir páginas 100% autogestionables por el cliente final utilizando **Contenedores Flexbox (`e-con`)** y **Widgets Nativos de Elementor**, tomando el código Tailwind CSS como plano arquitectónico de precisión.

---

## 1️⃣ BLOQUE 1: HERO BANNER (Sección Principal)

### A. Contenedor Padre (Sección Principal del Hero)
* **Pestaña Disposición (Layout)**:
  * **Tipo de Contenedor**: Contenedor Flexbox (Fila / Horizontal `→` en Escritorio).
  * **Ancho del Contenedor**: Ancho Completo (`Full Width`).
  * **Ancho Máximo (Max Width)**: `1800px` (o `1440px` según tu pantalla).
  * **Altura Mínima**: `100vh` (Equivalente a `min-h-screen`).
  * **Dirección (Direction)**: 
    * Escritorio: **Fila (Horizontal `→`)**
    * Móvil / Tablet: **Columna (Vertical `↓`)**
  * **Justificar Contenido (Justify Content)**: `Espacio entre (Space Between)` o `Centro (Center)`.
  * **Alinear Elementos (Align Items)**: `Centro (Center)`.
  * **Espacio entre elementos (Gap)**: `48px` (`3rem` - equivalente a `gap-12`).
* **Pestaña Estilo (Style)**:
  * **Tipo de Fondo**: Clásico `→` Color Hex: `#000000` (Negro).
* **Pestaña Avanzado (Advanced)**:
  * **Relleno (Padding)**:
    * Arriba: `96px` (`6rem` - equivalente a `pt-24`)
    * Abajo: `48px` (`3rem` - equivalente a `pb-12`)
    * Izquierda / Derecha: `48px` en Escritorio / `24px` en Móvil (`px-12 / px-6`).

---

### B. Contenedor Hijo Izquierdo (Columna de Texto y Botón)
* **Pestaña Disposición (Layout)**:
  * **Tipo de Contenedor**: Contenedor Flexbox (Columna / Vertical `↓`).
  * **Ancho del Contenedor**: `50%` (Equivalente a `min-w-[50%]`).
  * **Alinear Elementos (Align Items)**: `Inicio (Flex Start / Izquierda)`.
  * **Espacio entre elementos (Gap)**: `40px` (`2.5rem` - equivalente al espacio entre H1 y Botón).

#### 🔹 Widget 1: Encabezado (Heading Widget - H1)
* **Pestaña Contenido**:
  * **Título**:
    ```html
    <span style="color: #EF4444;">ANTOJOS</span><br>
    PERUANOS<br>
    <span style="color: #EF4444;">EN BOXES.</span>
    ```
    *(Nota: También puedes usar el widget "Título Animado" o usar 3 widgets de encabezado apilados sin margen si prefieres no usar HTML en el texto).*
  * **Etiqueta HTML**: `H1`.
* **Pestaña Estilo -> Tipografía**:
  * **Familia**: `Inter`.
  * **Peso (Weight)**: `900 (Black)` o `800 (Extra Bold)`.
  * **Tamaño (Size)**:
    * Escritorio: `7vw` (o `84px`).
    * Tablet: `60px`.
    * Móvil: `44px` (o `12vw`).
  * **Altura de Línea (Line Height)**: `0.85em` (o `85%` - clave para el look compacto de impacto).
  * **Espaciado entre letras (Letter Spacing)**: `-2px` (`-0.03em` - tracking-tighter).
  * **Transformación**: `Mayúsculas (Uppercase)`.
* **Pestaña Estilo -> Color de Texto**: `#FFFFFF` (Blanco por defecto).

#### 🔹 Widget 2: Botón (Button Widget)
* **Pestaña Contenido**:
  * **Texto**: `VER LOS BOXES`.
  * **Enlace**: URL de tu página de Boxes (`/boxes-de-regalo/`).
  * **Alineación**: Izquierda.
* **Pestaña Estilo -> Tipografía**:
  * **Familia**: `Inter`.
  * **Peso**: `900 (Black)`.
  * **Tamaño**: `18px` (`1.125rem`).
  * **Transformación**: `Mayúsculas (Uppercase)`.
  * **Espaciado de letras**: `2px` (`tracking-widest`).
* **Pestaña Estilo -> Estado Normal**:
  * Color de Texto: `#000000` (Negro).
  * Color de Fondo: `#FFFFFF` (Blanco).
  * Borde: Sólido `1px` `#FFFFFF`.
* **Pestaña Estilo -> Estado Al Pasar el Cursor (Hover)**:
  * Color de Texto: `#FFFFFF` (Blanco).
  * Color de Fondo: `#EF4444` (Rojo Golozin).
  * Borde: Sólido `1px` `#EF4444`.
  * **Duración de transición**: `0.3s`.
* **Pestaña Estilo -> Radio del Borde (Border Radius)**: `50px` o `999px` (`rounded-full`).
* **Pestaña Estilo -> Relleno (Padding)**:
  * Arriba / Abajo: `24px` (`1.5rem`).
  * Izquierda / Derecha: `56px` (`3.5rem`).

---

### C. Contenedor Hijo Derecho (Columna de la Imagen Hero)
* **Pestaña Disposición (Layout)**:
  * **Tipo de Contenedor**: Contenedor estándar o Flexbox.
  * **Ancho**: `45%` a `50%` (Ancho máximo en Avanzado -> Custom: `550px`).
  * **Relación de Aspecto (Aspect Ratio)**: `4 / 3` (Apaisado horizontal).
  * **Desbordamiento (Overflow)**: `Oculto (Hidden)`.
* **Pestaña Estilo**:
  * **Radio del Borde (Border Radius)**: 
    * Escritorio: `48px` (`3rem`)
    * Móvil: `32px` (`2rem`).
* **Pestaña Avanzado**:
  * **Margen**: Automático a izquierda y derecha en móvil para centrar (`mx-auto`).

#### 🔹 Widget: Imagen (Image Widget)
* **Pestaña Contenido**:
  * **Imagen**: Selecciona `premium_box_hero.png` desde la Biblioteca de Medios de WordPress.
  * **Tamaño de Imagen**: `Completo (Full)`.
* **Pestaña Estilo**:
  * **Ancho**: `100%`.
  * **Altura**: `100%`.
  * **Ajuste de Objeto (Object Fit)**: `Cubrir (Cover)`.
* **Pestaña Avanzado -> Efectos de Movimiento / Hover**:
  * Animación al pasar el cursor: `Grow` o Zoom suave (para replicar `hover:scale-[1.02] duration-700`).
