"use client";

import { createContext, useContext } from "react";
import type { ProductType } from "@/entities/product";
import type { ApiDetailsError } from "@/shared/exceptions";
import type { CreateProductType } from "./model/schemas";

export type ICreateProduct = {
	onSubmit: (data: CreateProductType) => Promise<ProductType>;
	onSuccess?: (product: ProductType) => void;
	onError?: (error: ApiDetailsError) => void;
	onLeavePage?: () => void;
};

export const CreateProductDepsCtx = createContext<ICreateProduct | null>(null);

export const useCreateProductDeps = () => {
	const context = useContext(CreateProductDepsCtx);
	if (!context) {
		throw new Error(
			"useCreateProductDeps must be used within a CreateProductDepsCtx",
		);
	}
	return context;
};
