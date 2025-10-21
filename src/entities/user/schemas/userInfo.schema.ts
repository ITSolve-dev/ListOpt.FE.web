import { z } from "zod";

export const Countries = z.enum(["RU", "BY", "ARM", "KZ", "KG"]);

export const UserInfoSchema = z.object({
	id: z.coerce.string().regex(/^\d+$/).min(1).max(12),
	country: Countries,
	firstName: z
		.string()
		.min(1, "pages.dashboard.tabs.contacts.editForm.errors.firstName"),
	lastName: z
		.string()
		.min(1, "pages.dashboard.tabs.contacts.editForm.errors.lastName"),
	position: z.string(),
	userId: z.coerce.string().regex(/^\d+$/).min(1).max(12),
});

export type UserInfoType = z.infer<typeof UserInfoSchema>;
export type CountryType = z.infer<typeof Countries>;
