import { type Page } from "@playwright/test";
import {
	injectAxe,
	checkA11y,
	getViolations,
	configureAxe,
} from "axe-playwright";
import { type Result } from "axe-core";
import {
	AXE_OUTPUT_DIR_PATH,
	AXE_OUTPUT_DIR,
	AXE_OUTPUT_NAME_POSTFIX,
	AXE_RULES,
} from "../lib/constants";

export interface POMActions {
	navigate(): Promise<void>;
	a11yCheck(): Promise<Result[]>;
}

export abstract class POM implements POMActions {
	public page: Page;
	protected url: string | undefined = undefined;

	constructor(page: Page) {
		this.page = page;
	}

	async navigate() {
		if (!this.url) {
			throw new Error("URL is not defined");
		}
		await this.page.goto(this.url);
	}

	async a11yCheck(): Promise<Result[]> {
		await injectAxe(this.page);
		await configureAxe(this.page, {
			rules: AXE_RULES,
			reporter: "v2",
		});
		await checkA11y(
			this.page,
			undefined,
			{
				axeOptions: {
					runOnly: {
						type: "tag",
						values: ["wcag2a", "wcag2aa"],
					},
				},
				detailedReport: true,
				detailedReportOptions: {
					html: true,
				},
			},
			true,
			"html",
			{
				outputDirPath: AXE_OUTPUT_DIR_PATH,
				outputDir: AXE_OUTPUT_DIR,
				reportFileName: `${this.constructor.name}${AXE_OUTPUT_NAME_POSTFIX}`,
			},
		);
		return await getViolations(this.page, "", {
			runOnly: {
				type: "tag",
				values: ["wcag2a", "wcag2aa"],
			},
		});
	}
}
