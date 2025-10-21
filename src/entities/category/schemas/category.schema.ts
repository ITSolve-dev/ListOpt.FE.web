import { z } from "zod";
import { CATEGORIES } from "../names";

export const CategoryName = z.enum(CATEGORIES);
export type CategoryNameType = z.infer<typeof CategoryName>;

export const BaseCategorySchema = z.object({
	id: z.coerce.number().min(0),
	name: z.string(),
});

export type CategoryType = z.infer<typeof BaseCategorySchema> & {
	// parent?: CategoryType | null;
	// children: CategoryType[];
};

export const CategorySchema: z.ZodType<CategoryType> =
	BaseCategorySchema.extend({
		// parent: z.lazy(() => CategorySchema.nullable()),
		// children: z.lazy(() => CategorySchema.array()),
	});
