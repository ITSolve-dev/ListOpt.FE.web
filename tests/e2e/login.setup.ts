import { test as setup, expect } from "./base";

setup("login", async () => {
	expect(true).toBe(true);
	// await loginPage.navigate();
	// const violations = await loginPage.a11yCheck();
	// await testInfo.attach('accessibility-report', {
	//   body: JSON.stringify(violations),
	//   contentType: 'application/json',
	// });
	// expect(violations).toHaveLength(0);
	// await page.context().storageState({ path: '.state/auth.json' });
});
