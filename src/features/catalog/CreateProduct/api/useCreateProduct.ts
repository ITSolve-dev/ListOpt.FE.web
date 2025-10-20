"use client";
import useSWRMutation from "swr/mutation";
import type { ProductType } from "@/entities/product";
import type { ApiDetailsError } from "@/shared/exceptions";
import type { CreateProductType } from "../model/schemas";

export const useCreateProduct = (
	onSubmit: (data: CreateProductType) => Promise<ProductType>,
	onSuccess?: (product: ProductType) => void,
	onError?: (error: ApiDetailsError) => void,
) =>
	useSWRMutation(
		"/products/create",
		async (_, { arg }: { arg: CreateProductType }) => await onSubmit(arg),
		{
			onSuccess,
			onError,
		},
	);
