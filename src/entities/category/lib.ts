import { CategoryName, type CategoryNameType } from "./schemas/category.schema";

export function isValidCategory(
	category: string,
): category is CategoryNameType {
	const { success } = CategoryName.safeParse(category);
	return success;
}
