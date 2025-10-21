import { z } from "zod";
import { CategoryName } from "@/entities/category";
import { FileUploadSchema } from "@/entities/company";
import { ProductSchema } from "@/entities/product";
import type { ValidTranslationKey } from "@/shared/lib/intl.helpers";

const ERROR_TRANSLATE_KEY_PATH = "features.forms.createProductForm.fields";

const requiredString = () =>
	z
		.string({ required_error: `${ERROR_TRANSLATE_KEY_PATH}.common.required` })
		.min(1, `${ERROR_TRANSLATE_KEY_PATH}.common.required`);

const requiredNumber = (
	errorKey: ValidTranslationKey = `${ERROR_TRANSLATE_KEY_PATH}.common.required`,
) => z.coerce.number({ required_error: errorKey }).min(1, errorKey);

export const CreateDimensionSchema = z.object({
	width: requiredNumber(
		`${ERROR_TRANSLATE_KEY_PATH}.size.width.errors.min`,
	).max(100, `${ERROR_TRANSLATE_KEY_PATH}.size.width.errors.max`),
	height: requiredNumber(
		`${ERROR_TRANSLATE_KEY_PATH}.size.height.errors.min`,
	).max(100, `${ERROR_TRANSLATE_KEY_PATH}.size.height.errors.max`),
	depth: requiredNumber(
		`${ERROR_TRANSLATE_KEY_PATH}.size.depth.errors.min`,
	).max(100, `${ERROR_TRANSLATE_KEY_PATH}.size.depth.errors.max`),
	weight: requiredNumber(
		`${ERROR_TRANSLATE_KEY_PATH}.size.weight.errors.min`,
	).max(100, `${ERROR_TRANSLATE_KEY_PATH}.size.weight.errors.max`),
});
export type CreateDimensionType = z.infer<typeof CreateDimensionSchema>;

export const CreateProductFieldSchema = z.object({
	name: requiredString().max(
		50,
		`${ERROR_TRANSLATE_KEY_PATH}.productFields.name.errors.max`,
	),
	value: requiredString().max(
		50,
		`${ERROR_TRANSLATE_KEY_PATH}.productFields.value.errors.max`,
	),
	measure: requiredString().max(
		50,
		`${ERROR_TRANSLATE_KEY_PATH}.productFields.measure.errors.max`,
	),
});
export type CreateProductFieldType = z.infer<typeof CreateProductFieldSchema>;

export const CreateProductIdentifierSchema = z.object({
	article: z
		.string()
		.length(12, `${ERROR_TRANSLATE_KEY_PATH}.article.errors.format`)
		.regex(/^[0-9]+$/, `${ERROR_TRANSLATE_KEY_PATH}.article.errors.format`),
	barcode: z
		.string()
		.length(12, `${ERROR_TRANSLATE_KEY_PATH}.barcode.errors.format`)
		.regex(/^[0-9]+$/, `${ERROR_TRANSLATE_KEY_PATH}.barcode.errors.format`),
});
export type CreateProductIdentifierType = z.infer<
	typeof CreateProductFieldSchema
>;

export const CreateProductPriceSchema = z.object({
	internal: requiredNumber(
		`${ERROR_TRANSLATE_KEY_PATH}.priceInternal.errors.min`,
	).max(1000000, `${ERROR_TRANSLATE_KEY_PATH}.priceInternal.errors.max`),
	external: requiredNumber(
		`${ERROR_TRANSLATE_KEY_PATH}.priceExternal.errors.min`,
	).max(1000000, `${ERROR_TRANSLATE_KEY_PATH}.priceExternal.errors.max`),
});
export type CreateProductPriceType = z.infer<typeof CreateProductFieldSchema>;

export const CreateProductSchema = ProductSchema.omit({
	id: true,
	companyId: true,
}).extend({
	name: requiredString().max(
		100,
		`${ERROR_TRANSLATE_KEY_PATH}.name.errors.maxLength`,
	),
	identifier: CreateProductIdentifierSchema,
	price: CreateProductPriceSchema,
	amount: z.coerce
		.number()
		.min(1, `${ERROR_TRANSLATE_KEY_PATH}.amount.errors.min`)
		.max(1000000, `${ERROR_TRANSLATE_KEY_PATH}.amount.errors.max`)
		.optional()
		.default(1),
	description: z
		.string()
		.max(500, `${ERROR_TRANSLATE_KEY_PATH}.description.errors.maxLength`)
		.optional(),
	photo: FileUploadSchema.optional().or(z.undefined()),
	category: CategoryName,
	fields: CreateProductFieldSchema.array().default([]),
	dimension: CreateDimensionSchema,
	minOrder: requiredNumber(
		`${ERROR_TRANSLATE_KEY_PATH}.minOrder.errors.min`,
	).max(10000, `${ERROR_TRANSLATE_KEY_PATH}.minOrder.errors.max`),
});
export type CreateProductType = z.infer<typeof CreateProductSchema>;
