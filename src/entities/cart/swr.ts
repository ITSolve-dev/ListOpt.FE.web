"use client";
import useSWR from "swr";
import { useCancelableMutationSWR } from "@/shared/lib/useCancelableMutationSWR";
import type {
	AddProductToCart,
	RemoveProductFromCart,
} from "./schemas/productToCart.schema";

export const useCart = () => useSWR("/api/carts/me", () => ({}));

export const useAddProductsToCart = () =>
	useCancelableMutationSWR(
		"/api/carts/add",
		async (_: string, { arg }: { arg: AddProductToCart }) => arg,
	);

export const useRemoveProductsFromCart = () =>
	useCancelableMutationSWR(
		"/api/carts/remove",
		async (_: string, { arg }: { arg: RemoveProductFromCart }) => arg,
	);
