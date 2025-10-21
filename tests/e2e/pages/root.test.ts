import { test } from "../base";

test.describe("Root Page", () => {
	test("test accessability", async ({ rootPage }) => {
		await rootPage.navigate();
		await rootPage.a11yCheck();
	});
	test("check visibility", async ({ rootPage }) => {
		await rootPage.navigate();
		await rootPage.checkVisibilityLoginLink();
		await rootPage.checkVisibilitySearchInput();
		await rootPage.checkNavLinks();
		await rootPage.checkFooter();
	});
});
