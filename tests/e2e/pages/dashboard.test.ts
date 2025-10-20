import { test, expect } from "../base";

test.describe("Dashboard Page", () => {
	test.beforeEach(async ({ dashboardPage }) => {
		await dashboardPage.navigate();
	});

	test("should be protected and redirect to login if not authenticated", async ({
		page,
	}) => {
		await expect(page).toHaveURL(/\/login/);
	});
});
