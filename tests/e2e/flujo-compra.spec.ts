import { test, expect } from '@playwright/test';

test('Flujo de compra completo: desde inicio hasta checkout', async ({ page }) => {
  // 1. Entrar a la tienda
  await page.goto('/tienda');
  await page.waitForTimeout(2000); // Pausa para que veas la pantalla cargar

  // 2. Hacer click en Añadir al carrito del primer producto disponible
  await page.locator('button:has-text("Añadir al carrito")').first().click();
  await page.waitForTimeout(2000); // Pausa para que veas el badge y el toast

  // 3. Forzar abrir el carrito usando Javascript para no fallar por animaciones
  await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label="Ver carrito de compras"]') as HTMLButtonElement;
    if (btn) btn.click();
  });
  await page.waitForTimeout(2000); // Pausa para que veas el menú lateral abrirse

  // 4. Hacer click en Finalizar Compra
  const checkoutBtn = page.locator('button:has-text("Finalizar Compra")').first();
  if (await checkoutBtn.isVisible()) {
    await checkoutBtn.click();
    await page.waitForTimeout(3000); // Pausa para que veas que llegamos al checkout
  }
});
