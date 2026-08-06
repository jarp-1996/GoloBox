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
}

// Función helper para mapear de BD a frontend
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
  };
}

export const catalog: Product[] = [
  { id: '1', name: "Gaseosa Fanta Lata 355 ML", brand: "COCA COLA COMPANY", price: 4.6, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Gaseosa-Fanta-Lata-355-ML.jpg", category: "Gaseosa", segment: "fiestas", inStock: true },
  { id: '2', name: "Gaseosa Sprite Lata 355 ML", brand: "COCA COLA COMPANY", price: 4.6, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Gaseosa-Sprite-Lata-355-ML.jpg", category: "Gaseosa", segment: "fiestas", inStock: true },
  { id: '3', name: "Gaseosa Inka Cola Lata 355 ML", brand: "COCA COLA COMPANY", price: 4.6, image: "https://vegastoreperu.com/wp-content/uploads/2024/03/Inka-Cola-Lata-355-ML.jpg", category: "Gaseosa", segment: "fiestas", inStock: true },
  { id: '4', name: "Gaseosa Coca Cola Lata 355 ML", brand: "COCA COLA COMPANY", price: 4.6, image: "https://vegastoreperu.com/wp-content/uploads/2024/03/Coca-Cola-Lata-355-ML-1.jpg", category: "Gaseosa", segment: "fiestas", inStock: true },
  { id: '5', name: "Snickers Bar 52.7g", brand: "SNICKERS", price: 3.2, image: "https://vegastoreperu.com/wp-content/uploads/2022/09/snickers-barra.jpg", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '6', name: "Caramelos Skittles Wild Berry 61.5g", brand: "MARS", price: 3.4, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Caramelos-Skittles-Wild-Berry-61.5g.jpg", category: "Caramelos", segment: "fiestas", inStock: true },
  { id: '7', name: "Caramelos Skittles Original 61.5g", brand: "MARS", price: 3.4, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Caramelos-Skittles-Original-61.5g.jpg", category: "Caramelos", segment: "fiestas", inStock: true },
  { id: '8', name: "Chicle Bubble Tap 56.7g", brand: "COLOMBINA", price: 8.5, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/huba-bubba-2.jpg", category: "Chicles", segment: "fiestas", inStock: true },
  { id: '9', name: "Pringles Sabor Original 37g", brand: "PRINGLES", price: 3.5, image: "https://vegastoreperu.com/wp-content/uploads/2024/03/pringles-original-37gr.jpg", category: "Snacks", segment: "selectos", inStock: true },
  { id: '10', name: "MilkyWay 52.2g", brand: "MARS", price: 3.8, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Milky-Way-53g.jpg", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '11', name: "Twix Cookie Barra 50.7g", brand: "MARS", price: 3.8, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Twix-Cookie-Barra-50.7g-1.jpg", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '12', name: "M&M'S Milk Chocolate 47.9g", brand: "MARS", price: 3.8, image: "https://vegastoreperu.com/wp-content/uploads/2022/09/mm-chocolate-47.9g.png", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '13', name: "M&M'S Peanut 49.3g", brand: "MARS", price: 3.8, image: "https://vegastoreperu.com/wp-content/uploads/2022/09/mm-mani-49.3g.jpg", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '14', name: "Snickers Peanut 50gr", brand: "SNICKERS", price: 3.8, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Snickers-Peanut-Butter-50gr.jpg", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '15', name: "Monfer Corazón Rojo T3", brand: "MONFER", price: 4, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Monfer-Corazon-T3-Rojo.jpg", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '16', name: "Monfer Corazón Dorado T3", brand: "MONFER", price: 4, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Monfer-Corazon-T3-Dorado-1.jpg", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '17', name: "Finos Bombones 60gr", brand: "MONFER", price: 4.2, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Caja-chocolate-60gr-3.jpg", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '18', name: "Pirucream Display 24und", brand: "COSTA", price: 29.9, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Pirucream-Display-24und.jpg", category: "Galletas", segment: "b2b", inStock: true },
  { id: '19', name: "Vizzio Costa Caja 63g", brand: "COSTA", price: 4.4, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Vizzio-Costa-Caja-69gr.jpg", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '20', name: "Finos Bombones Rosa 30g", brand: "MONFER", price: 5, image: "https://vegastoreperu.com/wp-content/uploads/2026/04/BOMBONES-ROSA-30G-PECACHON-PWEB.png", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '21', name: "Monfer Rosa T4", brand: "MONFER", price: 5.2, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Monfer-con-Rosa.jpg", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '22', name: "Ferrero Rocher T3", brand: "FERRERO", price: 5.8, image: "https://vegastoreperu.com/wp-content/uploads/2022/09/Ferrero-Rocher-T3.jpg", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '23', name: "Pirucream Multipack Bolsa x 06und", brand: "COSTA", price: 5.9, image: "https://vegastoreperu.com/wp-content/uploads/2026/06/PIRUCREAM-MULTIPACK-BOL-X06-PWEB.png", category: "Galletas", segment: "b2b", inStock: true },
  { id: '24', name: "Monfer Corazón T5", brand: "MONFER", price: 6.2, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Monfer-corazon-T5-1.jpg", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '25', name: "Chupetines Bon Bon Bum Fresa 24und", brand: "COLOMBINA", price: 6.3, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Bon-Bon-Bum-fresa-24und.jpg", category: "Chupetines", segment: "b2b", inStock: true },
  { id: '26', name: "Chupetines Bon Bon Bum Surtido 24und", brand: "COLOMBINA", price: 6.3, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Bon-Bon-Bum-Surtido-24und.jpg", category: "Chupetines", segment: "b2b", inStock: true },
  { id: '27', name: "Gomas Chupa Chups Bites Display 09un x 57g", brand: "COLOMBINA", price: 6.9, image: "https://vegastoreperu.com/wp-content/uploads/2026/06/CHUPA-CHUPS-DSX09-57G-PWEB.png", category: "Caramelos", segment: "b2b", inStock: true },
  { id: '28', name: "Pringles Sabor Original 104g", brand: "PRINGLES", price: 8, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/p-original2.png", category: "Snacks", segment: "selectos", inStock: true },
  { id: '29', name: "Vizzio Costa Caja 122g", brand: "COSTA", price: 8.2, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Vizzio-Costa-Caja-122gr.jpg", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '30', name: "Hershey's Kisses Chocolate 74g", brand: "HERSHEY'S", price: 8.5, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/KISSES-74G-CHOC-NEW-PWEB.png", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '31', name: "La Ibérica Corazón 35g", brand: "LA IBÉRICA", price: 8.5, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/La-Iberica-Corazon-35g.jpg", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '32', name: "Hershey's Kisses Cookies 74g", brand: "HERSHEY'S", price: 8.5, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/KISSES-74G-COOKIES-NEW-PWEB.png", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '33', name: "Monfer Corazón T8", brand: "MONFER", price: 8.6, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Monfer-Corazon-T8.jpg", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '34', name: "Pack x3 Ice Breakers Menta 42g", brand: "COLOMBINA", price: 8.9, image: "https://vegastoreperu.com/wp-content/uploads/2026/01/ICE-BREAKERS-42G-MENTA-X3-PWEB.png", category: "Chicles", segment: "b2b", inStock: true },
  { id: '35', name: "Hershey's Doypack Nuggets 120g", brand: "HERSHEY'S", price: 10.2, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/hersheys-Doypack-Nuggets-120-gr.jpg", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '36', name: "Hershey's Miniatures Doypack 120g", brand: "HERSHEY'S", price: 10.2, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Hersheys-Miniatures-Doypack-120g-1.jpg", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '37', name: "Pack x3 Hershey's Wafer Cookies 102g", brand: "HERSHEY'S", price: 8.9, image: "https://vegastoreperu.com/wp-content/uploads/2025/04/WAFER-COOKIES-102G.png", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '38', name: "Pack x3 Hershey's Wafer Chocolate 102g", brand: "HERSHEY'S", price: 8.9, image: "https://vegastoreperu.com/wp-content/uploads/2025/04/WAFER-CHOC-102G.png", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '39', name: "Pack x6 Tiny Mini 35g Pretties Pretzels", brand: "WINTER", price: 8.9, image: "https://vegastoreperu.com/wp-content/uploads/2024/06/Mini-pretzels-1.jpg", category: "Snacks", segment: "b2b", inStock: true },
  { id: '40', name: "Monfer Botella T5", brand: "MONFER", price: 9.8, image: "https://vegastoreperu.com/wp-content/uploads/2026/01/MONFER-BOTELLA-T5-PWEB-3.png", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '41', name: "Pack x3 Bubble Tape 56.7g", brand: "COLOMBINA", price: 9.9, image: "https://vegastoreperu.com/wp-content/uploads/2024/06/Bubble-Tape-x3.jpg", category: "Chicles", segment: "b2b", inStock: true },
  { id: '42', name: "Pack x3 Skittles Original 61.5g", brand: "MARS", price: 9.9, image: "https://vegastoreperu.com/wp-content/uploads/2024/08/Skittles-original-promo.png", category: "Caramelos", segment: "b2b", inStock: true },
  { id: '43', name: "Pack x3 Skittles Wild Berry 61.5g", brand: "MARS", price: 9.9, image: "https://vegastoreperu.com/wp-content/uploads/2024/11/SKITTLES-WB-X3-PWEBOF.png", category: "Caramelos", segment: "b2b", inStock: true },
  { id: '44', name: "Pringles Cebolla 40g x 3un", brand: "PRINGLES", price: 9.9, image: "https://vegastoreperu.com/wp-content/uploads/2025/11/PRINGLES-CEBOLLA-40G-X2-PWEB.png", category: "Snacks", segment: "b2b", inStock: true },
  { id: '45', name: "Pringles Queso 40g x 3un", brand: "PRINGLES", price: 9.9, image: "https://vegastoreperu.com/wp-content/uploads/2025/08/PRINGLES-40G-QUESO-X3-PWEB.png", category: "Snacks", segment: "b2b", inStock: true },
  { id: '46', name: "Huevo Kinder Joy display x12und", brand: "KINDER", price: 72, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Huevo-Kinder-Joy-display-x12und.jpg", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '47', name: "Pringles BBQ 40g x 3un", brand: "PRINGLES", price: 9.9, image: "https://vegastoreperu.com/wp-content/uploads/2025/07/bbq.png", category: "Snacks", segment: "b2b", inStock: true },
  { id: '48', name: "Pack x2 Galletas Navideñas 200g", brand: "WINTER", price: 9.9, image: "https://vegastoreperu.com/wp-content/uploads/2026/06/GALLETAS-NAVIDENAS-200G-X2-PWEB.png", category: "Navideños", segment: "fiestas", inStock: true },
  { id: '49', name: "Ferrero Rocher T4", brand: "FERRERO", price: 10, image: "https://vegastoreperu.com/wp-content/uploads/2024/02/Ferrero-Rocher-T4.jpg", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '50', name: "Hershey's Chocotubes Chocolate Display 15un x 25gr", brand: "HERSHEY'S", price: 10.9, image: "https://vegastoreperu.com/wp-content/uploads/2026/06/CHOCOTUBES-DSX15-25G-PWEB2.png", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '51', name: "Vizzio Costa Bolsa 21g Display x 10", brand: "COSTA", price: 11.5, image: "https://vegastoreperu.com/wp-content/uploads/2026/01/VIZZIO-21G-DSX10-PWEB.png", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '52', name: "Pack x2 Pringles Original + Crema y Cebolla", brand: "PRINGLES", price: 12.9, image: "https://vegastoreperu.com/wp-content/uploads/2024/11/PACK2-PRINGLES-ORI-CEBOLLA-PWEB.png", category: "Snacks", segment: "b2b", inStock: true },
  { id: '53', name: "Monfer Corazón T12", brand: "MONFER", price: 13.2, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Monfer-Corazon-T12.jpg", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '54', name: "Monfer Cuadrado Surtido T12", brand: "MONFER", price: 13.3, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Monfer-Cuadrado-Surtido-T12-1.jpg", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '55', name: "Act II. Popcorn Natural 80g", brand: "MARS", price: 3.6, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Act-II.-Popcorn-Natural-1.jpg", category: "Snacks", segment: "selectos", inStock: true },
  { id: '56', name: "Nutella Frasco 140g", brand: "NUTELLA", price: 13.4, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/nut-140g-3.png", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '57', name: "Kisses Corazón Cookies 102gr", brand: "HERSHEY'S", price: 13.8, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/KISSES-CORAZON-102-COOKIES-26-PWEB.png", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '58', name: "Kisses Corazón Chocolate 102g", brand: "HERSHEY'S", price: 13.8, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/KISSES-CORAZON-102-CHOC-26-PWEB.png", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '59', name: "Monfer Botella T12", brand: "MONFER", price: 14.5, image: "https://vegastoreperu.com/wp-content/uploads/2024/11/MONFER-BOTELLA.png", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '60', name: "M&M'S Milk Minis Tubos 30.6g", brand: "MARS", price: 3.8, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Mms-Milk-Minis-Tubos-30.6gr.jpg", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '61', name: "Pack x3 Kisses 74g Cookies", brand: "HERSHEY'S", price: 14.9, image: "https://vegastoreperu.com/wp-content/uploads/2026/01/KISSES-74G-COOKIES-NEW-26-X3-PWEB.png", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '62', name: "King Cookies Vainilla Display 24un x 46g", brand: "ELVAN", price: 16.9, image: "https://vegastoreperu.com/wp-content/uploads/2026/06/KING-COOKIES-VAINILLA-DSX24-46G-PWEB.png", category: "Galletas", segment: "b2b", inStock: true },
  { id: '63', name: "King Cookies Galleta Chocolate Display 24un x 46g", brand: "ELVAN", price: 16.9, image: "https://vegastoreperu.com/wp-content/uploads/2026/06/KING-COOKIES-CHOC-DSX24-46G-PWEB.png", category: "Galletas", segment: "b2b", inStock: true },
  { id: '64', name: "Bolsa Mixta Chocolate Minis 235g", brand: "MARS", price: 25.7, image: "https://vegastoreperu.com/wp-content/uploads/2025/04/bolsa-mixta-235g-minis.png", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '65', name: "Granuts Party Mix Display 12un x 50g", brand: "MARS", price: 32, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Granuts-party-mix-50g.jpg", category: "Snacks", segment: "b2b", inStock: true },
  { id: '66', name: "Pack x2 Kisses Corazón Chocolate 102gr 2026", brand: "HERSHEY'S", price: 16.9, image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=800&auto=format&fit=crop", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '67', name: "La Ibérica Corazón 80g", brand: "LA IBÉRICA", price: 17, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/La-Iberica-Corazon-80g-2.jpg", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '68', name: "Costa Vizzio Lata 182g", brand: "COSTA", price: 17.2, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Costa-Vizzio-Lata-182-Gr-1.jpg", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '69', name: "Truffete Bolsa x100und", brand: "COLOMBINA", price: 18.9, image: "https://vegastoreperu.com/wp-content/uploads/2024/06/Truffete-1000g.jpg", category: "Caramelos", segment: "b2b", inStock: true },
  { id: '70', name: "Multipack Nestle Surtido 320gr (Oferta)", brand: "NESTLE", price: 18.9, image: "https://vegastoreperu.com/wp-content/uploads/2026/04/MULTIPACK-SURTIDO-320G-PWEB3-1.png", category: "Chocolates", segment: "fiestas", inStock: true },
  { id: '71', name: "Ferrero Rocher T8", brand: "FERRERO", price: 19.2, image: "https://vegastoreperu.com/wp-content/uploads/2022/09/bom-ferrero-rocher-t8.jpg", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '72', name: "Multipack Nestle Surtido 320g", brand: "NESTLE", price: 20.5, image: "https://vegastoreperu.com/wp-content/uploads/2026/04/MULTIPACK-SURTIDO-320G-PWEB3-1.png", category: "Chocolates", segment: "fiestas", inStock: true },
  { id: '73', name: "Truffle Bolsa x100und", brand: "COLOMBINA", price: 20.9, image: "https://vegastoreperu.com/wp-content/uploads/2026/01/truffle-100un-PWEB.png", category: "Caramelos", segment: "b2b", inStock: true },
  { id: '74', name: "Monfer Estrella T5", brand: "MONFER", price: 6.2, image: "https://vegastoreperu.com/wp-content/uploads/2024/11/MONFER-ESTRELLA.png", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '75', name: "Tic Tac Menta Display 12und x16g", brand: "FERRERO", price: 21, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Tic-Tac-Menta-Display-12und-x16g-1.jpg", category: "Chicles", segment: "b2b", inStock: true },
  { id: '76', name: "Nutella Frasco 350g", brand: "NUTELLA", price: 22.4, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Nutella-350gr.jpg", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '77', name: "Pack x2 Nutella Frasco 140g", brand: "NUTELLA", price: 23.9, image: "https://vegastoreperu.com/wp-content/uploads/2025/09/NUTELLA-140G-X2-PWEB.png", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '78', name: "Granuts Oriental Display 12un x 50g", brand: "MARS", price: 24, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Granouts-Oriental-50g.jpg", category: "Snacks", segment: "b2b", inStock: true },
  { id: '79', name: "Ferrero Rocher T8 Corazon", brand: "FERRERO", price: 27.8, image: "https://vegastoreperu.com/wp-content/uploads/2025/04/ferrero-t8-corazon-web2.png", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '80', name: "Ferrero Rocher T12", brand: "FERRERO", price: 29.8, image: "https://vegastoreperu.com/wp-content/uploads/2022/09/Ferrero-Rocher-T12-1.jpg", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '81', name: "Hershey's Chocolate Display 18un x 20g", brand: "HERSHEY'S", price: 30, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Hershey-Chocolate-Display-18un-x-20g.jpg", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '82', name: "Hershey's Cookies Display 18un x 20g", brand: "HERSHEY'S", price: 30, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/hershey-20-gramos-sin-promo.jpg", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '83', name: "Snickers Snack Display 24un x 21.5g (Oferta)", brand: "SNICKERS", price: 30.9, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Display-Snicker-Barra-21.5gr-.jpg", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '84', name: "Granuts Maní con Pasas Display 12un x 50g", brand: "MARS", price: 32, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Granouts-Mani-con-Pasas.jpg", category: "Snacks", segment: "b2b", inStock: true },
  { id: '85', name: "Granuts Arándanos Display 12un x 50g", brand: "MARS", price: 32, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Granouts-Arandanos-50g.jpg", category: "Snacks", segment: "b2b", inStock: true },
  { id: '86', name: "Nutella 25g", brand: "NUTELLA", price: 5.2, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/nut-25g.png", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '87', name: "Nutella & Go 52g", brand: "NUTELLA", price: 7.4, image: "https://vegastoreperu.com/wp-content/uploads/2024/10/NUTELLA-GO.jpg", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '88', name: "Pringles Original 37g x 12un", brand: "PRINGLES", price: 37.9, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Pringles-37gr-1.jpg", category: "Snacks", segment: "b2b", inStock: true },
  { id: '89', name: "Pack x2 Nutella Frasco 350g", brand: "NUTELLA", price: 38.9, image: "https://vegastoreperu.com/wp-content/uploads/2024/05/Nutella-promo.jpg", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '90', name: "Milky la ibérica Display 10und x 50g (Oferta)", brand: "LA IBÉRICA", price: 39.9, image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=800&auto=format&fit=crop", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '91', name: "Fondy la ibérica Display 10und x 50g (Oferta)", brand: "LA IBÉRICA", price: 39.9, image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=800&auto=format&fit=crop", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '92', name: "Kit Kat Display 12un x 41.5g", brand: "NESTLE", price: 39.9, image: "https://vegastoreperu.com/wp-content/uploads/2026/04/P-AF-PROMO-0-KITKAT-DSX12-41.5G.png", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '93', name: "Fondy la ibérica Display 10und x 50g", brand: "LA IBÉRICA", price: 40.9, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Fondy-la-iberica-Display-10und-x-50g-1.jpg", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '94', name: "Milky la ibérica Display 10und x 50g", brand: "LA IBÉRICA", price: 40.9, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Milky-la-iberica-Display-10und-x-50g-1-1.jpg", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '95', name: "Kit Kat 41.5g Display 12und", brand: "NESTLE", price: 42, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Kit-Kat-41.5g.jpg", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '96', name: "Monfer Bolsa 1 Kg", brand: "MONFER", price: 42.9, image: "https://vegastoreperu.com/wp-content/uploads/2026/01/MONFER-BOLSA-1KG-PWEB.png", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '97', name: "Pack x3 Ferrero Rocher T8", brand: "FERRERO", price: 49.9, image: "https://vegastoreperu.com/wp-content/uploads/2026/03/FERREROR-ROCHER-T8-X3-PWEB.png", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '98', name: "Hershey's Cookies 18un x 43g", brand: "HERSHEY'S", price: 50, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/h-43g-cookies-usa-1.png", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '99', name: "Hershey's Milk Chocolate 18un x 43g", brand: "HERSHEY'S", price: 50, image: "https://vegastoreperu.com/wp-content/uploads/2024/07/h-43g-choc-usa-1.png", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '100', name: "Pack x2 Ferrero Rocher T12", brand: "FERRERO", price: 50.9, image: "https://vegastoreperu.com/wp-content/uploads/2026/01/FERRERO-ROCHER-T12-X2-PWEB.png", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '101', name: "Reese's Nutrageous Barra 47g", brand: "REESES", price: 3, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Reeses-Nutrageous-Barra-47-g-3.jpg", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '102', name: "Corazon Dream 8un 124g", brand: "MONFER", price: 52.9, image: "https://vegastoreperu.com/wp-content/uploads/2026/01/CORAZON-DREAM-124G-X12-PWEB.png", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '103', name: "Ferrero Rocher T3 x 16un", brand: "FERRERO", price: 89.9, image: "https://vegastoreperu.com/wp-content/uploads/2024/07/Ferrero-rocher-promocion.jpg", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '104', name: "Snickers Fun Size 300.2g", brand: "SNICKERS", price: 17.5, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Snicker-Fun-Size-300.2gr.jpg", category: "Chocolates", segment: "selectos", inStock: true },
  { id: '105', name: "Pringles Sabor Crema y Cebolla 109g x 18un", brand: "PRINGLES", price: 89.9, image: "https://vegastoreperu.com/wp-content/uploads/2024/12/PRINGLES-CEBOLLA-109G-X12-PWEB2.png", category: "Snacks", segment: "b2b", inStock: true },
  { id: '106', name: "Snickers Snack Display 24un x 21.5g", brand: "SNICKERS", price: 32, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Display-Snicker-Barra-21.5gr-.jpg", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '107', name: "Pretties Pretzels Tiny Mini 35g", brand: "WINTER", price: 1.6, image: "https://vegastoreperu.com/wp-content/uploads/2024/03/Pretties-Pretzels-Tiny-Mini-35gr-1.jpg", category: "Snacks", segment: "selectos", inStock: true },
  { id: '108', name: "Galletas Moments 280g", brand: "WINTER", price: 5.4, image: "https://vegastoreperu.com/wp-content/uploads/2024/03/Galletas-Moments-280g-1.jpg", category: "Galletas", segment: "selectos", inStock: true },
  { id: '109', name: "Galletas Surtidas Navideñas 200g", brand: "WINTER", price: 6, image: "https://vegastoreperu.com/wp-content/uploads/2024/11/COLOMBINA-NAV-200G-PWEB.png", category: "Navideños", segment: "fiestas", inStock: true },
  { id: '110', name: "Galleta ChocoDonuts 204g", brand: "WINTER", price: 6.8, image: "https://vegastoreperu.com/wp-content/uploads/2024/04/Galleta-ChocoDonuts-204gr.jpg", category: "Galletas", segment: "selectos", inStock: true },
  { id: '111', name: "Ferrero Rocher T4 x 10un", brand: "FERRERO", price: 95.9, image: "https://vegastoreperu.com/wp-content/uploads/2024/06/Ferrero-Rocher-T4-2.jpg", category: "Chocolates", segment: "b2b", inStock: true },
  { id: '112', name: "Pringles Original 104g x 18un", brand: "PRINGLES", price: 130.9, image: "https://vegastoreperu.com/wp-content/uploads/2026/04/PRINGLES-ROJO-X18-PWEB.png", category: "Snacks", segment: "b2b", inStock: true },
];

// Array original comentado para evitar errores de despliegue si se necesita de fallback rápido
// export const catalog: Product[] = [...]

export async function getCategories(): Promise<Category[]> {
  const { data } = await supabase.from('products').select('category');
  if (!data) return [];
  return Array.from(new Set(data.map(p => p.category)));
}

export async function getBrands(): Promise<string[]> {
  const { data } = await supabase.from('products').select('brand');
  if (!data) return [];
  return Array.from(new Set(data.map(p => p.brand)));
}

export async function getProducts(segment?: Segment): Promise<Product[]> {
  let query = supabase.from('products').select('*');
  if (segment) {
    query = query.eq('segment', segment);
  }
  const { data } = await query;
  return (data || []).map(mapProduct);
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
  
  const { data } = await dbQuery;
  return (data || []).map(mapProduct);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const { data } = await supabase.from('products').select('*').eq('id', id).single();
  return data ? mapProduct(data) : undefined;
}
