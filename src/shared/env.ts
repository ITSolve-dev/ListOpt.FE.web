import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// Create the env
const env = createEnv({
	client: {
		NEXT_PUBLIC_API_USERS_URL: z
			.string()
			.url()
			.default("http://localhost:8001/api/v1"),
		NEXT_PUBLIC_API_CATALOG_URL: z
			.string()
			.url()
			.default("http://localhost:8002/api/v1"),
	},
	server: {
		AUTH_SECRET: z.string().min(1).max(256).default("secret"),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_API_USERS_URL: process.env.NEXT_PUBLIC_API_USERS_URL,
		NEXT_PUBLIC_API_CATALOG_URL: process.env.NEXT_PUBLIC_API_CATALOG_URL,
	},
	emptyStringAsUndefined: true,
	isServer: typeof window === "undefined",
});

export { env };
