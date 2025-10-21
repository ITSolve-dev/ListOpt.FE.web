"use client";
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	type SelectChangeEvent,
} from "@mui/material";
import { useTranslations } from "next-intl";
import type { CategoryNameType } from "@/entities/category";
import type { ValidTranslationKey } from "@/shared/lib/intl.helpers";

import { useCategoryQueryState } from "../query/useCategoryQueryState";

interface CategoryOption {
	value: CategoryNameType;
	label: ValidTranslationKey;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
	{ value: "milk", label: "general.categories.milk.title" },
	{ value: "meat", label: "general.categories.meat.title" },
];

export const CategorySelector: React.FC = () => {
	const t = useTranslations();
	const [category, setCategory] = useCategoryQueryState();

	const handleChange = (event: SelectChangeEvent) =>
		setCategory(event.target.value as CategoryNameType);

	return (
		<FormControl fullWidth>
			<InputLabel id="category-select-label">
				{t("pages.myProducts.selectorCategoryLabel")}
			</InputLabel>
			<Select
				labelId="category-select-label"
				id="category-select"
				data-testid="category-select"
				value={category}
				label={t("pages.myProducts.selectorCategoryLabel")}
				onChange={handleChange}
				inputProps={{
					"data-testid": "category-select-input",
				}}
			>
				{CATEGORY_OPTIONS.map((option) => (
					<MenuItem key={option.value} value={option.value}>
						{t(option.label)}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};
