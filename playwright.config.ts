import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: "./tests/e2e",
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 1 : 0,
	repeatEach: process.env.CI ? 1 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: process.env.CI ? "blob" : "html",
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: "http://localhost:3000",

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: "setup",
			use: {
				...devices["Desktop Chrome"],
				userAgent:
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
			},
			testMatch: /.*\.setup\.ts/,
			retries: 0,
			repeatEach: 0,
		},
		{
			name: "desktop-chromium",
			use: {
				...devices["Desktop Chrome"],
				userAgent:
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
			},
			dependencies: ["setup"],
		},
		{
			name: "desktop-firefox",
			use: {
				...devices["Desktop Firefox"],
				userAgent:
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0",
			},
			dependencies: ["setup"],
		},
		{
			name: "desktop-safari",
			use: {
				...devices["Desktop Safari"],
				userAgent:
					"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15",
			},
			dependencies: ["setup"],
		},
		/* Test against mobile viewports. */
		{
			name: "mobile-chromium",
			use: {
				...devices["Pixel 7"],
				userAgent:
					"Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
			},
			dependencies: ["setup"],
		},
		{
			name: "mobile-safari",
			use: {
				...devices["iPhone 15"],
				userAgent:
					"Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
			},
			dependencies: ["setup"],
		},
	],

	/* Run your local dev server before starting the tests */
	webServer: {
		command: process.env.CI ? "bun start" : "bun dev",
		url: "http://localhost:3000",
		timeout: 120 * 1000,
		reuseExistingServer: !process.env.CI,
		env: {
			NODE_ENV: "test",
			PLAYWRIGHT_WEB_SERVER: "true",
			AUTH_SECRET: "secret",
			NEXT_PUBLIC_AUTH_PROTECTED_ENABLE: "true",
			NEXT_PUBLIC_REACT_SCAN_ENABLE: "false",
		},
	},
});
