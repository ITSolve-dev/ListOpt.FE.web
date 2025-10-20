import { loginApi, refreshTokensApi, registerApi } from "./api";
import type { LoginSchemaType } from "./schemas/login.schema";
import {
	type RegisterRequest,
	type RegisterResponse,
	RegisterResponseSchema,
} from "./schemas/register.schema";
import {
	type AccessTokenPayload,
	AccessTokenPayloadSchema,
	type JWTTokens,
	JWTTokensSchema,
} from "./schemas/tokens.schema";

export async function login(data: LoginSchemaType): Promise<JWTTokens> {
	const tokens = await loginApi(data);
	return await JWTTokensSchema.parseAsync(tokens);
}

export async function refreshTokens(token: string): Promise<JWTTokens> {
	const tokens = await refreshTokensApi(token);
	return await JWTTokensSchema.parseAsync(tokens);
}

export function decodeAccessToken(accessToken: string): AccessTokenPayload {
	const data = accessToken.split(".")[1];
	if (!data) throw new Error("Empty access token");
	const payload = JSON.parse(Buffer.from(data, "base64").toString());
	return AccessTokenPayloadSchema.parse(payload);
}

export async function register(
	data: RegisterRequest,
): Promise<RegisterResponse> {
	const tokens = await registerApi(data);
	return await RegisterResponseSchema.parseAsync(tokens);
}
