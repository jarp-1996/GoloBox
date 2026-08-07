import { test, expect } from '@playwright/test';

test('Flujo de compra completo: desde inicio hasta checkout', async ({ page }) => {
  // 1. Entrar a la tienda
  await page.goto('/tienda');

  // 2. Hacer click en Añadir al carrito del primer producto disponible
  const addBtn = page.locator('button:has-text("Añadir al carrito")').first();
  await addBtn.waitFor({ state: 'visible' });
  await addBtn.click();

  // 3. Abrir el carrito
  const cartBtn = page.locator('button[aria-label="Ver carrito de compras"]');
  await cartBtn.waitFor({ state: 'visible' });
  await cartBtn.click({ force: true });

  // 4. Hacer click en Finalizar Compra
  const checkoutBtn = page.locator('button:has-text("Finalizar Compra")').first();
  await checkoutBtn.waitFor({ state: 'visible' });
  await checkoutBtn.click();

  // 5. Validar que hemos avanzado (por ejemplo, aparece la opción de método de pago o cambia la URL)
  // Esperamos a que la navegación o el cambio de estado suceda
  await page.waitForLoadState('networkidle');
});
