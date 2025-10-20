import { z } from "zod";
import { RoleId, RoleName } from "@/entities/auth/@x/user";
import { UserInfoSchema } from "./userInfo.schema";

const dateOrStringSchema = z.preprocess((arg) => {
	if (typeof arg === "string" || arg instanceof Date) {
		const date = new Date(arg);
		if (!Number.isNaN(date.getTime())) return date;
	}
	return undefined;
}, z.date());

export const UserShortSchema = z.object({
	id: z.coerce.string().regex(/^\d+$/).min(1).max(12),
	email: z.string().email(),
	isActive: z.boolean(),
	createdAt: dateOrStringSchema,
	telephone: z.string().regex(/^\d{10,15}$/),
	role: z.object({
		id: z.nativeEnum(RoleId),
		name: z.nativeEnum(RoleName),
	}),
});

export const UserSchema = UserShortSchema.extend({
	info: UserInfoSchema.optional(),
});

export type UserShortType = z.infer<typeof UserShortSchema>;
export type UserType = z.infer<typeof UserSchema>;
