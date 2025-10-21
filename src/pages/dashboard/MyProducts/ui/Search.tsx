"use client";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import debounce from "lodash/debounce";
import { useTranslations } from "next-intl";
import { type ChangeEvent, useCallback } from "react";
import { useSearchQueryState } from "../query/useSearchQueryState";

export const Search = () => {
	const t = useTranslations();
	const [search, setSearch] = useSearchQueryState();

	const handleSearch = useCallback(
		debounce(
			(event: ChangeEvent<HTMLInputElement>) =>
				setSearch(event.target.value === "" ? null : event.target.value),
			500,
		),
		[],
	);

	return (
		<TextField
			label={t("pages.myProducts.searchLabel")}
			variant="outlined"
			fullWidth
			defaultValue={search}
			onChange={handleSearch}
			slotProps={{
				htmlInput: {
					"data-testid": "search-input",
				},
				input: {
					endAdornment: (
						<InputAdornment position="start">
							<IconButton>
								<SearchIcon />
							</IconButton>
						</InputAdornment>
					),
				},
			}}
		/>
	);
};
