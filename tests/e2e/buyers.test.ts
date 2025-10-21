import { test, expect } from "@playwright/test";

const BASE_URL = process.env.NEXT_APP_BASE_URL || "http://localhost:3000";

test("should display the correct title", async ({ page }) => {
	await page.goto(`${BASE_URL}/customers`);

	await expect(page.locator("h2", { hasText: "Покупателям" })).toBeVisible();

	await expect(page.locator("h4", { hasText: "Вопрос - Ответ" })).toBeVisible();
});
