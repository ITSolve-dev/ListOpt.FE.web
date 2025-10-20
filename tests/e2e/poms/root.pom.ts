import { POM } from "./base.pom";
import { step, expect } from "../base";

export class RootPage extends POM {
	protected override url: string = "/";

	title = () => this.page.getByRole("heading", { level: 2 });
	loginLink = () => this.page.getByRole("link", { name: "Войти" });
	searchInput = () => this.page.getByTestId("search-input");

	@step("Check the text of the main title")
	async checkMainTitle() {
		const title = await this.title().textContent();
		expect(title).toBe("ОПТОВЫЙ МАРКЕТПЛЕЙС");
	}

	@step("Check the visibility of the search input")
	async checkVisibilitySearchInput() {
		await expect(this.searchInput()).toBeVisible();
	}

	@step("Check the visibility of the login link")
	async checkVisibilityLoginLink() {
		await expect(this.loginLink()).toBeVisible();
	}

	@step("Check the navigation links")
	async checkNavLinks() {
		await expect(this.page.locator("body")).toMatchAriaSnapshot(`
        - link "Каталог":
          - paragraph: Каталог
        - link "Поставщикам":
          - paragraph: Поставщикам
        - link "Покупателям":
          - paragraph: Покупателям
        - link "Перевозчикам":
          - paragraph: Перевозчикам
        - link "Условия":
          - paragraph: Условия
        - link "Блог":
          - paragraph: Блог
        - link "О нас":
          - paragraph: О нас
        - link "Контакты":
          - paragraph: Контакты
        `);
	}

	@step("Check the footer")
	async checkFooter() {
		await expect(this.page.locator("body")).toMatchAriaSnapshot(`
        - heading "Партнерам" [level=6]
        - heading "Каталог" [level=6]
        - heading "Для поставщиков" [level=6]
        - heading "Для покупателей" [level=6]
        - heading "Для перевозчиков" [level=6]
        - heading "Условия" [level=6]
        - heading "О компании" [level=6]
        - heading "О нас" [level=6]
        - heading "Блог" [level=6]
        - heading "Контакты" [level=6]
        - text: Телефон
        - heading /\\+7 \\(\\d+\\) \\d+-\\d+-\\d+/ [level=5]
        `);
	}
}
