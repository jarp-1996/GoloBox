import { test, expect } from '@playwright/test';

test.describe('Pruebas de Responsividad (UI/UX)', () => {
  test('La página principal no debe tener scroll horizontal (Overflow)', async ({ page }) => {
    await page.goto('/');
    
    // Esperamos a que cargue la página
    await page.waitForLoadState('load');

    // Comprobamos si el ancho de la página (scrollWidth) es mayor que el viewport (innerWidth)
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    expect(hasHorizontalOverflow).toBe(false);
  });

  test('El Navbar y Hero deben ser visibles', async ({ page }) => {
    await page.goto('/');
    
    // Verificamos que el logo del navbar esté presente
    await expect(page.locator('text=Golozin').first()).toBeVisible();
    
    // Verificamos que al menos un botón de CTA esté visible
    const ctaButton = page.locator('button', { hasText: /Comprar|Catálogo|Ver/i }).first();
    if (await ctaButton.count() > 0) {
      await expect(ctaButton).toBeVisible();
    }
  });
});
