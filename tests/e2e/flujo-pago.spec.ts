import { test, expect } from '@playwright/test';

test('Flujo de pago con tarjeta de prueba en MercadoPago', async ({ page }) => {
  // 1. Preparar el carrito asegurando un producto en stock
  await page.goto('/tienda');
  
  // Agregar un producto (simulando que el cliente compra)
  const addBtn = page.locator('button:has-text("Añadir al carrito")').first();
  await addBtn.waitFor({ state: 'visible' });
  await addBtn.click();
  
  // Ir al checkout COMO USUARIO (clickeando botones) para no perder el estado
  const cartBtn = page.locator('button[aria-label="Ver carrito de compras"]');
  await cartBtn.waitFor({ state: 'visible' });
  await cartBtn.click({ force: true });
  
  const checkoutBtn = page.locator('button:has-text("Finalizar Compra")').first();
  await checkoutBtn.waitFor({ state: 'visible' });
  await checkoutBtn.click();

  // 2. Seleccionar el método de pago por "Tarjeta"
  const cardBtn = page.locator('button', { hasText: 'Tarjeta' });
  await cardBtn.waitFor({ state: 'visible' });
  await cardBtn.click();
  
  // 3. Rellenar los campos de MercadoPago
  // Buscamos el iframe que inyecta MercadoPago y esperamos a que los inputs estén visibles
  const iframeMP = page.frameLocator('iframe').first(); 
  
  const cardNumberInput = iframeMP.locator('input[id="form-checkout__cardNumber"]');
  await cardNumberInput.waitFor({ state: 'visible', timeout: 15000 }); // Esperamos que cargue el componente
  
  // Tarjeta de prueba genérica de Sandbox (VISA)
  await cardNumberInput.fill('4242424242424242');
  await iframeMP.locator('input[id="form-checkout__expirationDate"]').fill('11/28');
  await iframeMP.locator('input[id="form-checkout__securityCode"]').fill('123');
  await iframeMP.locator('input[id="form-checkout__cardholderName"]').fill('Usuario Prueba');
  
  // Si pide DNI o correo
  const emailInput = iframeMP.locator('input[id="form-checkout__cardholderEmail"]');
  if (await emailInput.isVisible().catch(() => false)) {
    await emailInput.fill('test@user.com');
  }

  const dniInput = iframeMP.locator('input[id="form-checkout__identificationNumber"]');
  if (await dniInput.isVisible().catch(() => false)) {
    await dniInput.fill('12345678');
  }
  
  // 4. Darle click al botón de pagar
  await iframeMP.locator('button[type="submit"], button#form-checkout__submit').first().click();
  
  // 5. Validar la victoria: Esperar a que aparezca nuestra pantalla de éxito
  await expect(page.locator('h2:has-text("¡Pago Exitoso!")')).toBeVisible({ timeout: 20000 });
});
