import { parseAsStringEnum, useQueryState } from "nuqs";
import { CategoryName } from "@/entities/category";

export const useCategoryQueryState = () =>
	useQueryState(
		"category",
		parseAsStringEnum(Object.values(CategoryName.Enum)).withDefault("milk"),
	);
