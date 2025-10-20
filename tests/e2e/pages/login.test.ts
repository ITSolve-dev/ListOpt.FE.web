import { test, expect } from "../base";

test("should redirect to dashboard page when valid credentials are provided", async ({
	page,
	loginPage,
}) => {
	await loginPage.navigate();
	await loginPage.login("test@test.com", "password");
	await expect(page).toHaveURL("/dashboard", { timeout: 15000 });
});

test("should redirect to register page when register button is clicked", async ({
	page,
	loginPage,
}) => {
	await loginPage.navigate();

	await loginPage.redirectToRegisterPage();

	await expect(page).toHaveURL("/register");
});

test("remember me", async ({ loginPage }) => {
	await loginPage.navigate();
	expect(await loginPage.rememberMeCheckbox().isChecked()).toBe(false);
});

test.fixme("incorrect email", async ({ loginPage }) => {
	await loginPage.navigate();
	await loginPage.login("wrong@email.com", "password");
	await expect(loginPage.page.getByText("Пользователь не найден")).toHaveCount(
		2,
	);
});
