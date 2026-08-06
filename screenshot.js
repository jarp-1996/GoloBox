const { chromium } = require('@playwright/test');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  console.log('Navegando a la página de inicio...');
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(__dirname, 'home.png'), fullPage: true });
    console.log('Captura de inicio guardada en home.png');
  } catch (err) {
    console.error('Error capturando inicio:', err);
  }

  console.log('Navegando a la tienda...');
  try {
    await page.goto('http://localhost:3000/tienda', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(__dirname, 'tienda.png'), fullPage: true });
    console.log('Captura de tienda guardada en tienda.png');
  } catch (err) {
    console.error('Error capturando tienda:', err);
  }

  await browser.close();
})();
