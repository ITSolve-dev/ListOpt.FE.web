import { createStore } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type { Cart } from "./schemas/cart.schema";
import type { ProductToCart } from "./schemas/productToCart.schema";

export type cartStoreState = {
	cart: Cart | null;
	selectedProducts: ProductToCart[];
	companyId: number | null;
};

export type cartStoreActions = {
	addProducts: (products: ProductToCart[]) => void;
	removeProducts: (productIds: number[]) => void;
	getCompanies: () => number[];
	toggleProduct: (product: ProductToCart) => void;
	selectCompany: (companyId: number | null) => void;
	selectAll: () => void;
	unselectAll: () => void;
};

export type cartStore = cartStoreState & cartStoreActions;

export const defaultInitState: cartStoreState = {
	cart: null,
	selectedProducts: [],
	companyId: null,
};

export const createCartStore = (
	initState: cartStoreState = defaultInitState,
	name: string = "cartStore",
) =>
	createStore<cartStore>()(
		devtools(
			immer(
				(
					set: (fn: (state: cartStoreState) => void) => void,
					get: () => cartStore,
				) => {
					const companyId =
						initState.cart?.products?.[0]?.product?.companyId || null;
					return {
						...initState,
						companyId,
						addProducts: (products: ProductToCart[]) => {
							set((state) => {
								state.cart?.products.push(...products);
							});
						},
						removeProducts: (productIds: number[]) => {
							set((state) => {
								if (state.cart) {
									state.cart.products = state.cart.products.filter(
										(product) => !productIds.includes(product.product.id),
									);
								}
							});
						},
						getCompanies: () => {
							const companies = new Set<number>();
							const { cart } = get();
							cart?.products.forEach((product) => {
								companies.add(product.product.companyId);
							});
							return Array.from(companies);
						},
						toggleProduct: (product: ProductToCart) => {
							set((state) => {
								if (
									state.selectedProducts.find(
										(productToCart) =>
											productToCart.product.id === product.product.id,
									)
								) {
									state.selectedProducts = state.selectedProducts.filter(
										(p) => p.product.id !== product.product.id,
									);
								} else {
									state.selectedProducts.push(product);
								}
							});
						},
						selectCompany: (companyId: number | null) => {
							set((state) => {
								state.companyId = companyId;
							});
						},
						selectAll: () => {
							set((state) => {
								if (state.cart) {
									state.selectedProducts = state.cart.products;
								}
							});
						},
						unselectAll: () => {
							set((state) => {
								state.selectedProducts = [];
							});
						},
					};
				},
			),
			{ name },
		),
	);
