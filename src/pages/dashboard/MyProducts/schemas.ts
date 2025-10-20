import z from "zod";

export const ProductStatuses = [
	"active",
	"archived",
	"all",
	"review",
	"error",
] as const;

export const ProductStatusSchema = z.enum(ProductStatuses);
export type ProductStatusType = z.infer<typeof ProductStatusSchema>;
