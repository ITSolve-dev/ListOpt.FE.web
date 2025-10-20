"use server";
import type { LoginSchemaType } from "./schemas/login.schema";
import type { JWTTokens } from "./schemas/tokens.schema";
import { login, refreshTokens } from "./services";

export async function loginAction(data: LoginSchemaType): Promise<JWTTokens> {
	const tokens = await login(data);
	return tokens;
}

export async function refreshTokensAction(token: string): Promise<JWTTokens> {
	const tokens = await refreshTokens(token);
	return tokens;
}
