import { test, expect } from '@playwright/test';

test.describe('Portfolio homepage', () => {
  test('has title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Portafolio/);
  });

  test('navigates sections via nav links', async ({ page }) => {
    await page.goto('/');

    const links = page.locator('nav a[href^="#"]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const href = await link.getAttribute('href');
      if (href) {
        await link.click();
        const section = page.locator(href);
        await expect(section).toBeVisible();
      }
    }
  });

  test('contact form shows sent message', async ({ page }) => {
    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.fill('input[placeholder="Tu nombre"]', 'Test User');
    await page.fill('input[placeholder="Tu email"]', 'test@example.com');
    await page.fill('textarea[placeholder="Tu mensaje"]', 'Hello');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=¡Mensaje enviado!')).toBeVisible();
  });

  test('has skip to content link', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeVisible({ timeout: 1000 });
  });
});
