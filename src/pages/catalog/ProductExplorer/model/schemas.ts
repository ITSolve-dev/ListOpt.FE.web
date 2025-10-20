import { z } from "zod";
import { SHOW_PER_PAGE_OPTIONS } from "@/features/catalog/PaginatedList";

export const CatalogSortSchema = z.enum(["rate", "old", "new"]);
export type CatalogSortType = z.infer<typeof CatalogSortSchema>;

export const CatalogExplorerPageSearchParamsSchema = z.object({
	sort: CatalogSortSchema.default("rate"),
	page: z.coerce.number().min(1).default(1),
	count: z.coerce
		.number()
		.refine((value) => SHOW_PER_PAGE_OPTIONS.indexOf(value) !== -1)
		.default(10),
});

export type CatalogExplorerPageSearchParamsType = z.infer<
	typeof CatalogExplorerPageSearchParamsSchema
>;
