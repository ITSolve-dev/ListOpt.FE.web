import { test as base, expect } from "@playwright/test";
import { LoginPage, RootPage, DashboardPage } from "./poms";

interface Fixtures {
	timeLogger: void;
	loginPage: LoginPage;
	rootPage: RootPage;
	dashboardPage: DashboardPage;
}

export const test = base.extend<Fixtures>({
	page: async ({ page }, use) => {
		await use(page);
	},
	loginPage: async ({ page }, use) => {
		const loginPage = new LoginPage(page);
		await use(loginPage);
	},
	rootPage: async ({ page }, use) => {
		const rootPage = new RootPage(page);
		await use(rootPage);
	},
	dashboardPage: async ({ page }, use) => {
		const dashboardPage = new DashboardPage(page);
		await use(dashboardPage);
	},
	timeLogger: [
		async ({}, use) => {
			const start = new Date().toISOString();
			test.info().annotations.push({ type: "Start", description: start });
			await use();
			const end = new Date().toISOString();
			test.info().annotations.push({ type: "End", description: end });
		},
		{ auto: true },
	],
});

/**
 * Decorator function for wrapping POM methods in a test.step.
 *
 * Use it without a step name `@step()`.
 *
 * Or with a step name `@step("Search something")`.
 *
 * @param stepName - The name of the test step.
 * @returns A decorator function that can be used to decorate test methods.
 */
export function step(stepName?: string): any {
	return function decorator(
		target: Function,
		context: ClassMethodDecoratorContext,
	): (this: Function, ...args: unknown[]) => Promise<any> {
		return function replacementMethod(
			this: Function,
			...args: unknown[]
		): Promise<any> {
			const name = `${stepName || (context.name as string)} (${this.name})`;
			return test.step(name, async () => {
				return await target.call(this, ...args);
			});
		};
	};
}

export { expect };
