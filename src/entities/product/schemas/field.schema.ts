import { z } from "zod";
import { BaseFieldSchema } from "./BaseField.schema";

export const ProductFieldSchema = BaseFieldSchema.extend({
	measure: z.string(),
	productId: z.coerce.number().min(1).max(1000000),
});
export type ProductFieldType = z.infer<typeof ProductFieldSchema>;
