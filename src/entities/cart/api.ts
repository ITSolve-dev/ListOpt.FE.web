import { z } from "zod";
import { apiCatalog } from "@/shared/lib/api";
import { type Cart, CartSchema } from "./schemas/cart.schema";

const ResponseSchema = z.object({
	info: z.string(),
	timestamp: z.string(),
	ok: z.boolean(),
});

const CartApiResponseSchema = ResponseSchema.extend({
	cart: CartSchema,
});

export async function getMyCartApi(): Promise<Cart> {
	const response = await apiCatalog.get("v1/carts/me").json();
	const { cart } = await CartApiResponseSchema.parseAsync(response);
	return cart;
}

export async function createCartApi(): Promise<Cart> {
	const response = await apiCatalog.post("v1/carts").json();
	const { cart } = await CartApiResponseSchema.parseAsync(response);
	return cart;
}

const AddProductsToCartApiRequestSchema = z
	.object({
		quantity: z.number().min(1).max(10000),
		productId: z.number().min(1),
	})
	.array();

type AddProductsToCartApiRequest = z.infer<
	typeof AddProductsToCartApiRequestSchema
>;

export async function addProductsToCartApi(
	data: AddProductsToCartApiRequest,
): Promise<Cart> {
	const safeData = await AddProductsToCartApiRequestSchema.parseAsync(data);
	const response = await apiCatalog.post("v1/carts", { json: safeData }).json();
	const { cart } = await CartApiResponseSchema.parseAsync(response);
	return cart;
}
