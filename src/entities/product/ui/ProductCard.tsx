"use client";
import { createContext, use } from "react";
import type { ProductType } from "../schemas/product.schema";
import { InteractiveCard, type InteractiveCardProps } from "./InteractiveCard";
import {
	PresentationCard,
	type PresentationCardProps,
} from "./PresentationCard";

interface IProductCardContext {
	product: ProductType;
}

const ProductCardContext = createContext<IProductCardContext | null>(null);

export const useProductCardContext = () => {
	const context = use(ProductCardContext);
	if (!context)
		throw Error("useProductCardContext must be used within a ProductCard");
	return context;
};

export type ProductCardProps<
	T extends "interactive" | "presentation" = "presentation",
> = {
	product: ProductType;
	variant?: T;
} & (T extends "interactive" ? InteractiveCardProps : PresentationCardProps);

export const ProductCard = <
	T extends "interactive" | "presentation" = "presentation",
>({
	product,
	variant,
	...props
}: ProductCardProps<T>) => {
	return (
		<ProductCardContext.Provider value={{ product }}>
			{variant === "interactive" ? (
				<InteractiveCard {...props} />
			) : (
				<PresentationCard {...props} />
			)}
		</ProductCardContext.Provider>
	);
};
