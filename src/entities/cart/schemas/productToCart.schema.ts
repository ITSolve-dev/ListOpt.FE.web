import { z } from "zod";
import { ProductSchema } from "@/entities/product/@x/cart";

export const ProductToCartSchema = z.object({
	product: ProductSchema,
	quantity: z.number().min(1).max(1000000),
});

export type ProductToCart = z.infer<typeof ProductToCartSchema>;

export const AddProductToCartSchema = z
	.object({
		productId: z.coerce.number().min(0),
		quantity: z.coerce.number().min(1).max(1000000),
	})
	.array();

export type AddProductToCart = z.infer<typeof AddProductToCartSchema>;

export const RemoveProductFromCartSchema = z.array(z.coerce.number().min(0));

export type RemoveProductFromCart = z.infer<typeof RemoveProductFromCartSchema>;
