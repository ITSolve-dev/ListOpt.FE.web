"use client";
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	type SelectChangeEvent,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { parseAsStringEnum, useQueryState } from "nuqs";
import type { ValidTranslationKey } from "@/shared/lib/intl.helpers";
import { CatalogSortSchema, type CatalogSortType } from "../model/schemas";

interface SortOption {
	value: CatalogSortType;
	label: ValidTranslationKey;
}

const SORT_OPTIONS: SortOption[] = [
	{ value: "rate", label: "pages.catalog.SortSelector.options.rate" },
	{ value: "new", label: "pages.catalog.SortSelector.options.new" },
	{ value: "old", label: "pages.catalog.SortSelector.options.old" },
];

const DEFAULT_SORT = "rate";

export const SortSelector = () => {
	const t = useTranslations();
	const [sort, setSort] = useQueryState<CatalogSortType>(
		"sort",
		parseAsStringEnum(Object.values(CatalogSortSchema.Enum)).withDefault(
			DEFAULT_SORT,
		),
	);

	const handleChange = (event: SelectChangeEvent) =>
		setSort(CatalogSortSchema.parse(event.target.value));

	return (
		<FormControl fullWidth>
			<InputLabel id="sort-select-label">
				{t("pages.catalog.SortSelector.title")}
			</InputLabel>
			<Select
				labelId="sort-select-label"
				id="sort-select"
				data-testid="sort-select"
				value={sort}
				label={t("pages.catalog.SortSelector.title")}
				onChange={handleChange}
				inputProps={{
					"data-testid": "sort-select-input",
				}}
			>
				{SORT_OPTIONS.map((option) => (
					<MenuItem key={option.value} value={option.value}>
						{t(option.label)}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};
