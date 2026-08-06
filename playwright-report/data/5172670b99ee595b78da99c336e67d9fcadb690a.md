# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: flujo-pago.spec.ts >> Flujo de pago con tarjeta de prueba en MercadoPago
- Location: tests\e2e\flujo-pago.spec.ts:3:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('iframe').first().contentFrame().locator('input[id="form-checkout__cardNumber"]')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - button "Open Next.js Dev Tools" [ref=e7] [cursor=pointer]:
    - img [ref=e8]
  - alert [ref=e11]: Golozin | Tu Tienda de Golosinas Premium en Perú
  - generic [ref=e13]:
    - generic [ref=e14]:
      - heading "Resumen de tu pedido" [level=2] [ref=e15]
      - generic [ref=e17]:
        - img "Gaseosa Fanta Lata 355 ML" [ref=e19]
        - generic [ref=e20]:
          - paragraph [ref=e21]: Gaseosa Fanta Lata 355 ML
          - paragraph [ref=e22]: "Cant: 1"
        - paragraph [ref=e23]: S/ 4.60
      - generic [ref=e24]:
        - generic [ref=e25]:
          - generic [ref=e26]: Subtotal
          - generic [ref=e27]: S/ 4.60
        - generic [ref=e28]:
          - generic [ref=e29]: Recargo por tarjeta (5%)
          - generic [ref=e30]: S/ 0.23
        - generic [ref=e31]:
          - generic [ref=e32]: Total a pagar
          - generic [ref=e33]: S/ 4.83
    - generic [ref=e34]:
      - heading "¿Cómo quieres pagar?" [level=2] [ref=e35]
      - generic [ref=e36]:
        - button "yape Yape" [ref=e37]:
          - generic [ref=e38]: yape
          - generic [ref=e39]: Yape
        - button "Tarjeta VISA AMEX" [active] [ref=e40]:
          - img [ref=e41]
          - generic [ref=e43]: Tarjeta
          - generic [ref=e44]:
            - generic [ref=e46]: VISA
            - generic [ref=e51]: AMEX
      - generic [ref=e52]:
        - generic [ref=e53]:
          - img [ref=e54]
          - paragraph [ref=e56]:
            - strong [ref=e57]: ¿Por qué el recargo?
            - text: Las tarjetas cobran comisión. Para mantener nuestros
            - strong [ref=e58]: precios de mayorista
            - text: ", este cargo lo asume el método de pago. Puedes usar Yape para evitarlo."
        - generic [ref=e61]:
          - heading "Medios de pago" [level=1] [ref=e62]
          - generic [ref=e63]:
            - generic [ref=e64] [cursor=pointer]:
              - radio "Tarjeta de crédito, Cuotas sin interés" [ref=e65]
              - img [ref=e67]
              - paragraph [ref=e71]:
                - generic [ref=e72]: Tarjeta de crédito
                - generic [ref=e74]: Cuotas sin interés
            - generic [ref=e75] [cursor=pointer]:
              - radio "Tarjeta de débito" [ref=e76]
              - img [ref=e78]
              - paragraph [ref=e85]:
                - generic [ref=e86]: Tarjeta de débito
          - generic [ref=e87]:
            - button "Pagar" [ref=e89] [cursor=pointer]:
              - generic [ref=e90]:
                - img [ref=e91]
                - generic [ref=e94]: Pagar
            - iframe [ref=e95]:
              
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('Flujo de pago con tarjeta de prueba en MercadoPago', async ({ page }) => {
  4  |   // 1. Preparar el carrito asegurando un producto en stock
  5  |   await page.goto('/tienda');
  6  |   await page.waitForTimeout(2000); 
  7  |   
  8  |   // Agregar un producto (simulando que el cliente compra)
  9  |   await page.locator('button:has-text("Añadir al carrito")').first().click();
  10 |   await page.waitForTimeout(2000);
  11 |   
  12 |   // Ir al checkout COMO USUARIO (clickeando botones) para no perder el estado
  13 |   await page.locator('button[aria-label="Ver carrito de compras"]').click();
  14 |   await page.waitForTimeout(1000);
  15 |   
  16 |   const checkoutBtn = page.locator('button:has-text("Finalizar Compra")').first();
  17 |   await checkoutBtn.click();
  18 |   await page.waitForTimeout(3000);
  19 | 
  20 |   // 2. Seleccionar el método de pago por "Tarjeta"
  21 |   await page.locator('button', { hasText: 'Tarjeta' }).click();
  22 |   
  23 |   // Esperar a que el componente (Brick) de MercadoPago termine de cargar
  24 |   await page.waitForTimeout(3000); 
  25 | 
  26 |   // 3. Rellenar los campos de MercadoPago
  27 |   // Buscamos el iframe que inyecta MercadoPago
  28 |   const iframeMP = page.frameLocator('iframe').first(); 
  29 |   
  30 |   // Tarjeta de prueba genérica de Sandbox (VISA)
> 31 |   await iframeMP.locator('input[id="form-checkout__cardNumber"]').fill('4242424242424242');
     |                                                                   ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  32 |   await iframeMP.locator('input[id="form-checkout__expirationDate"]').fill('11/28');
  33 |   await iframeMP.locator('input[id="form-checkout__securityCode"]').fill('123');
  34 |   await iframeMP.locator('input[id="form-checkout__cardholderName"]').fill('Usuario Prueba');
  35 |   
  36 |   // Si pide DNI o correo
  37 |   const emailInput = iframeMP.locator('input[id="form-checkout__cardholderEmail"]');
  38 |   if (await emailInput.isVisible().catch(() => false)) {
  39 |     await emailInput.fill('test@user.com');
  40 |   }
  41 | 
  42 |   const dniInput = iframeMP.locator('input[id="form-checkout__identificationNumber"]');
  43 |   if (await dniInput.isVisible().catch(() => false)) {
  44 |     await dniInput.fill('12345678');
  45 |   }
  46 |   
  47 |   // 4. Darle click al botón de pagar
  48 |   await iframeMP.locator('button[type="submit"], button#form-checkout__submit').first().click();
  49 |   
  50 |   // 5. Validar la victoria: Esperar a que aparezca nuestra pantalla de éxito
  51 |   await expect(page.locator('h2:has-text("¡Pago Exitoso!")')).toBeVisible({ timeout: 20000 });
  52 | });
  53 | 
```