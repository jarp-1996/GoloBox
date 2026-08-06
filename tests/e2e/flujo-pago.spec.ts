import { test, expect } from '@playwright/test';

test('Flujo de pago con tarjeta de prueba en MercadoPago', async ({ page }) => {
  // 1. Preparar el carrito asegurando un producto en stock
  await page.goto('/tienda');
  await page.waitForTimeout(2000); 
  
  // Agregar un producto (simulando que el cliente compra)
  await page.locator('button:has-text("Añadir al carrito")').first().click();
  await page.waitForTimeout(2000);
  
  // Ir al checkout COMO USUARIO (clickeando botones) para no perder el estado
  await page.locator('button[aria-label="Ver carrito de compras"]').click();
  await page.waitForTimeout(1000);
  
  const checkoutBtn = page.locator('button:has-text("Finalizar Compra")').first();
  await checkoutBtn.click();
  await page.waitForTimeout(3000);

  // 2. Seleccionar el método de pago por "Tarjeta"
  await page.locator('button', { hasText: 'Tarjeta' }).click();
  
  // Esperar a que el componente (Brick) de MercadoPago termine de cargar
  await page.waitForTimeout(3000); 

  // 3. Rellenar los campos de MercadoPago
  // Buscamos el iframe que inyecta MercadoPago
  const iframeMP = page.frameLocator('iframe').first(); 
  
  // Tarjeta de prueba genérica de Sandbox (VISA)
  await iframeMP.locator('input[id="form-checkout__cardNumber"]').fill('4242424242424242');
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
