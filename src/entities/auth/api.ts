import { apiUsersRaw } from "@/shared/lib/api";
import type { LoginSchemaType } from "./schemas/login.schema";
import {
	type RegisterRequest,
	type RegisterResponse,
	RegisterResponseSchema,
} from "./schemas/register.schema";
import type { JWTTokens } from "./schemas/tokens.schema";

export async function loginApi(data: LoginSchemaType): Promise<JWTTokens> {
	const tokens = await apiUsersRaw
		.post<JWTTokens>("v1/auth/login", {
			json: data,
		})
		.json();
	return tokens;
}

export async function refreshTokensApi(
	refreshToken: string,
): Promise<JWTTokens> {
	const tokens = await apiUsersRaw
		.post<JWTTokens>("v1/auth/refresh", {
			json: {
				refresh_token: refreshToken,
			},
		})
		.json();
	return tokens;
}

export async function registerApi(
	data: RegisterRequest,
): Promise<RegisterResponse> {
	const response = await apiUsersRaw
		.post("v1/signup", {
			json: data,
		})
		.json();
	return await RegisterResponseSchema.parseAsync(response);
}
