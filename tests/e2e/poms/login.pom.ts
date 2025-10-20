import { POM } from "./base.pom";
import { step } from "../base";

export class LoginPage extends POM {
	protected override url: string = "/login";

	// locators
	emailInput = () => this.page.getByTestId("email-input");
	passwordInput = () => this.page.getByTestId("password-input");
	submitButton = () => this.page.getByTestId("login-submit-button");
	rememberMeCheckbox = () => this.page.getByRole("checkbox");
	registerLink = () => this.page.getByTestId("redirect-register-button");

	// actions
	async login(email: string = "test@test.com", password: string = "password") {
		await this.emailInput().waitFor({
			state: "visible",
			timeout: 60000,
		});
		await this.emailInput().fill(email);
		await this.passwordInput().fill(password);

		await this.submitButton().click();
	}

	async redirectToRegisterPage() {
		await this.registerLink().click();
	}

	@step("Fill login form")
	async fillForm(email: string, password: string) {
		await this.emailInput().fill(email);
		await this.passwordInput().fill(password);
	}
}
