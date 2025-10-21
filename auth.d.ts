import { type DefaultSession } from "next-auth";
import { JWT } from "@auth/core/jwt";

declare module "next-auth" {
	interface Session extends DefaultSession {
		accessToken?: string;
		error?: string;
	}

	interface AuthorizedSession extends Session {
		accessToken: string;
		error: undefined;
	}

	interface User {
		accessToken: string;
		refreshToken: string;
	}
}

declare module "@auth/core/jwt" {
	/** Returned by the `jwt` callback and `auth`, when using JWT sessions */
	interface JWT {
		iat?: number;
		exp?: number;
		email?: string;
		role?: string;
		sub?: string;
		accessToken?: string;
		refreshToken?: string;
		error?: string;
	}
}
