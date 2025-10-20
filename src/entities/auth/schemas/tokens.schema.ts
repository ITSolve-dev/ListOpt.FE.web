import { z } from "zod";

export const AccessTokenPayloadSchema = z.object({
	iat: z.number().min(0),
	exp: z.number().min(0),
	email: z.string().email(),
	role: z.string().min(1),
	sub: z.coerce.number(),
});

export type AccessTokenPayload = z.infer<typeof AccessTokenPayloadSchema>;

export const JWTTokensSchema = z.object({
	accessToken: z.string(),
	refreshToken: z.string(),
});

export type JWTTokens = z.infer<typeof JWTTokensSchema>;
