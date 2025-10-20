import type { JWT } from "@auth/core/jwt";
import NextAuth, { CredentialsSignin, type Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginAction, refreshTokensAction } from "@/entities/auth/actions";
import { LoginSchema } from "@/entities/auth/schemas/login.schema";
import { decodeAccessToken } from "@/entities/auth/services";

async function authorizeUser(
	credentials: Partial<Record<"email" | "password", unknown>>,
) {
	const { success, data } = await LoginSchema.safeParseAsync(credentials);
	if (!success) {
		throw new CredentialsSignin("login.credentials");
	}
	try {
		const tokens = await loginAction(data);
		return tokens;
	} catch (error) {
		console.log("error", error);
		throw new CredentialsSignin("apiErrors.unknown");
	}
}

export const {
	handlers,
	signIn,
	signOut,
	auth,
	unstable_update: update,
} = NextAuth({
	debug: true,
	pages: {
		signIn: "/login",
		newUser: "/register",
	},
	session: {
		strategy: "jwt",
	},
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: authorizeUser,
		}),
	],
	callbacks: {
		authorized: async ({ auth }) => {
			// for middleware working
			return !!auth;
		},
		async jwt({ token, user }) {
			if (user) {
				const { accessToken, refreshToken } = user;
				return {
					accessToken,
					refreshToken,
					error: undefined,
				};
			}
			if (token) {
				const { accessToken } = token;
				const payload = decodeAccessToken(accessToken as string);
				if (Math.trunc(payload.exp * 1000) <= Date.now()) {
					const { refreshToken: oldRefreshToken } = token;
					if (!oldRefreshToken) return null;
					try {
						const { accessToken, refreshToken } =
							await refreshTokensAction(oldRefreshToken);
						return {
							accessToken,
							refreshToken,
							error: undefined,
						};
					} catch (error) {
						console.error(error);
						return {
							accessToken: undefined,
							refreshToken: undefined,
							error: "refreshTokenError",
						};
					}
				} else {
					return token;
				}
			}
			return token;
		},
		async session({ session, token }: { session: Session; token: JWT }) {
			if (token) {
				session.accessToken = token.accessToken;
				session.error = token.error || undefined;
			}
			return session;
		},
	},
});
