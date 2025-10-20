"use client";

import { createContext, useContext } from "react";

export type ICartPageDeps = {
	onCheckout: () => Promise<void>;
};

export const CartPageDepsCtx = createContext<ICartPageDeps | null>(null);

export const useCartPageDeps = () => {
	const context = useContext(CartPageDepsCtx);
	if (!context) {
		throw new Error("useCartPageDeps must be used within a CartPageDepsCtx");
	}
	return context;
};
