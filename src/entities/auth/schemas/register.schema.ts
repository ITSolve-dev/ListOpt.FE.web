import { z } from "zod";

export const TEXT_FIELD_REGEX = /^[A-Za-zА-Яа-яЁё0-9]{2,50}$/;
export const EMAIL_FIELD_REGEX =
	/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
export const PHONE_FIELD_REGEX = /^\+?[0-9]+$/;

export enum RoleId {
	buyer = 1,
	supplier = 2,
}

export enum RoleName {
	buyer = "buyer",
	supplier = "supplier",
}

export const RoleIdEnum = z.nativeEnum(RoleId);
export const RoleNameEnum = z.nativeEnum(RoleName);

export const RegisterRequestSchema = z.object({
	userInfo: z.object({
		firstName: z
			.string()
			.min(1, "general.register.name.required")
			.max(100)
			.regex(TEXT_FIELD_REGEX, "general.register.name.pattern"),
		lastName: z
			.string()
			.min(1, "general.register.lastName.required")
			.max(100)
			.regex(TEXT_FIELD_REGEX, "general.register.name.pattern"),
		country: z
			.string()
			.min(1, "general.register.country.required")
			.max(100)
			.regex(TEXT_FIELD_REGEX, "general.register.name.pattern"),
		position: z.string(),
	}),
	company: z.object({
		name: z
			.string()
			.min(1, "general.register.organization.name.required")
			.max(100)
			.regex(TEXT_FIELD_REGEX, "general.register.name.pattern"),
		status: z.string(),
	}),
	email: z
		.string({
			required_error: "general.register.email.required",
		})
		.min(5, "general.register.email.errors.minLength")
		.max(150, "general.register.email.errors.maxLength")
		.regex(EMAIL_FIELD_REGEX, "general.register.email.pattern"),
	telephone: z
		.string()
		.regex(PHONE_FIELD_REGEX, "general.register.phone.pattern")
		.min(8, "general.register.phone.minLength")
		.max(100),
	password: z.string().min(8, "general.register.password.errors.minLength"),
	roleId: RoleIdEnum,
});

export const RegisterResponseSchema = z.object({
	id: z.coerce.string(),
	isActive: z.boolean().default(false),
	createdAt: z.preprocess(
		(arg) => (typeof arg === "string" ? new Date(arg) : arg),
		z.date(),
	),
	email: z.string(),
	telephone: z.string(),
	role: z.object({
		id: RoleIdEnum,
		name: RoleNameEnum,
	}),
	userInfo: z.object({
		id: z.coerce.string(),
		userId: z.coerce.string().min(1, "user_id.required"),
		country: z.string().min(1, "country.required"),
		firstName: z.string().min(1, "first_name.required"),
		lastName: z.string().min(1, "last_name.required"),
		position: z.string(),
	}),
	company: z.object({
		id: z.coerce.string(),
		userId: z.coerce.string().min(1, "user_id.required"),
		name: z.string().min(1, "name.required"),
		status: z.string().min(1, "status.required"),
	}),
});

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;
