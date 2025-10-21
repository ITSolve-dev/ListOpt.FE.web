import { z } from "zod";
import { ProductToCartSchema } from "./productToCart.schema";

export const CartSchema = z.object({
	id: z.coerce.number(),
	userId: z.coerce.number(),
	products: ProductToCartSchema.array().default([]),
});

export type Cart = z.infer<typeof CartSchema>;
