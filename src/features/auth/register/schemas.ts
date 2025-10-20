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

export const RegisterSchema = z
	.object({
		name: z
			.string()
			.min(1, "general.register.name.required")
			.max(100)
			.regex(TEXT_FIELD_REGEX, "general.register.name.pattern"),
		lastName: z
			.string()
			.min(1, "general.register.lastName.required")
			.max(100)
			.regex(TEXT_FIELD_REGEX, "general.register.name.pattern"),
		organizationName: z
			.string()
			.min(1, "general.register.organizationName.required")
			.max(100)
			.regex(TEXT_FIELD_REGEX, "general.register.name.pattern"),
		profile: RoleNameEnum,
		country: z
			.string()
			.min(1, "general.register.country.required")
			.max(100)
			.regex(TEXT_FIELD_REGEX, "general.register.name.pattern"),
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
		passwordConfirmation: z
			.string()
			.min(8, "general.register.password.errors.minLength"),
		terms: z
			.boolean({ required_error: "general.register.checkbox.required" })
			.refine((value) => value, {
				message: "general.register.checkbox.required",
			}),
		roleId: RoleIdEnum,
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: "general.register.confirmPassword.validate",
		path: ["password_confirmation"],
	});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
