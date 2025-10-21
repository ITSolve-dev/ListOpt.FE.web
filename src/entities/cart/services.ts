import { addProductsToCartApi, createCartApi, getMyCartApi } from "./api";

export async function createCart() {
	const cart = await createCartApi();
	return cart;
}

type AddProductToCart = {
	quantity: number;
	productId: number;
};

export async function addProductsToCart(data: AddProductToCart[]) {
	const cart = await addProductsToCartApi(data);
	return cart;
}

export async function getMyCart() {
	const cart = await getMyCartApi();
	return cart;
}
