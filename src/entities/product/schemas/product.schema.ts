import { z } from "zod";
import { CategorySchema } from "@/entities/category/@x/product";
import { PositiveNumber, StrMax100 } from "@/shared/schemas";
import { ProductFieldSchema } from "./field.schema";
import { DimensionSchema } from "./size.schema";

const PriceSchema = z.object({
	internal: PositiveNumber().min(0).max(10000000),
	external: PositiveNumber().min(0).max(10000000),
});

const IdentifierSchema = z.object({
	article: StrMax100(),
	barcode: StrMax100(),
});

export const ProductSchema = z.object({
	id: PositiveNumber(),
	companyId: PositiveNumber(),
	name: StrMax100(),
	identifier: IdentifierSchema,
	price: PriceSchema,
	amount: PositiveNumber().optional().default(0),
	description: z.string().optional().or(z.null()),
	photo: z.string().url().optional().or(z.null()),
	fields: z.array(ProductFieldSchema).default([]),
	dimension: DimensionSchema,
	category: CategorySchema,
});

export type ProductType = z.infer<typeof ProductSchema>;
