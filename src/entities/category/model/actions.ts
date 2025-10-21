"use server";

import type { CategoryNameType } from "../schemas/category.schema";

export async function getCategories(): Promise<CategoryNameType[]> {
	const categories: CategoryNameType[] = ["meat", "milk"];
	return new Promise((resolve) => setTimeout(() => resolve(categories), 2000));
}
