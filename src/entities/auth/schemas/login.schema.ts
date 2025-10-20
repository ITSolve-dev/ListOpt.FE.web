import { z } from "zod";

export const LoginSchema = z.object({
	email: z.string().email("general.login.email.required"),
	password: z.string(),
	rememberMe: z.union([
		z.boolean().default(false),
		z
			.enum(["true", "false"])
			.default("false")
			.transform((value) => value === "true"),
	]),
});

export const LoginResponseSchema = z.object({
	accessToken: z.string(),
	refreshToken: z.string(),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type LoginResponseType = z.infer<typeof LoginResponseSchema>;
