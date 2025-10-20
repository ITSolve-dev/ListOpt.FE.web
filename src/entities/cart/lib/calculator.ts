import type { ProductToCart } from "../schemas/productToCart.schema";

function getFiltererdProductsByCompanyId(
	products: ProductToCart[],
	companyId: number,
): ProductToCart[] {
	return products.filter(
		(productToCart) => productToCart.product.companyId === companyId,
	);
}

function calculateTotalPriceInternal(products: ProductToCart[]): number {
	return products.reduce((total, productToCart) => {
		return (
			total + productToCart.product.price.internal * productToCart.quantity
		);
	}, 0);
}

function calculateTotalPriceExternal(products: ProductToCart[]): number {
	return products.reduce((total, productToCart) => {
		return (
			total + productToCart.product.price.external * productToCart.quantity
		);
	}, 0);
}

function calculateTotalCount(products: ProductToCart[]): number {
	return products.reduce((total, productToCart) => {
		return total + productToCart.quantity;
	}, 0);
}

function calculateTotalWeight(products: ProductToCart[]): number {
	return products.reduce(
		(total, product) =>
			total + product.quantity * product.product.dimension.weight,
		0,
	);
}

export const cartCalculator = {
	getFiltererdProductsByCompanyId,
	calculateTotalPriceInternal,
	calculateTotalPriceExternal,
	calculateTotalCount,
	calculateTotalWeight,
};
