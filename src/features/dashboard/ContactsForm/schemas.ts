import type { z } from "zod";
import { UserInfoSchema } from "@/entities/user";

export const EditContactsSchema = UserInfoSchema.pick({
	firstName: true,
	lastName: true,
	position: true,
});

export type EditContactsType = z.infer<typeof EditContactsSchema>;
