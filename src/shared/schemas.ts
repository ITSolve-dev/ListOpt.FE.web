import { z } from "zod";
import type { ValidTranslationKey } from "./lib/intl.helpers";

export const ErrorDetailsSchema = z.array(
	z.object({
		type: z.string(),
		description: z.string(),
		ctx: z.record(z.string(), z.string()).optional(),
	}),
);

export type ErrorDetailsType = z.infer<typeof ErrorDetailsSchema>;

export const StrMax100 = (error?: ValidTranslationKey) =>
	z.string({ required_error: error }).min(1, error).max(100, error);
export const PositiveNumber = (error?: ValidTranslationKey) =>
	z.coerce.number().min(1, error);
