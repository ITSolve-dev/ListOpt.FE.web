// ./steiger.config.ts
import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

export default defineConfig([
	...fsd.configs.recommended,
	{
		// ignore all mock files for all rules
		ignores: ["**/__mocks__/**"],
	},
	{
		files: ["./src/**"],
		rules: {
			// disable error one reference slice
			"fsd/insignificant-slice": "off",
		},
	},
	{
		files: ["./src/shared/**"],
		rules: {
			// disable public-api rule for files in /shared folder
			"fsd/public-api": "off",
			"fsd/forbidden-imports": "off",
			"fsd/no-public-api-sidestep": "off",
		},
	},
	{
		files: ["./src/shared/next-auth.ts", "./src/shared/lib/auth.helpers.ts"],
		rules: {
			"fsd/no-public-api-sidestep": "off",
		},
	},
]);
