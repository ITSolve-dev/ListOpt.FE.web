"use client";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import {
	List,
	MenuItem,
	Pagination,
	PaginationItem,
	Select,
	type SelectChangeEvent,
	Stack,
	Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { type PropsWithChildren, useMemo } from "react";
import { SHOW_PER_PAGE_OPTIONS } from "./config";
import { usePaginationListStore } from "./store.provider";

export type PaginatedListProps = {
	onChangePerPage?: (event: SelectChangeEvent, value: number) => void;
	onChangePage?: (event: React.ChangeEvent<unknown>, value: number) => void;
} & PropsWithChildren;

export const PaginatedList = ({
	children,
	onChangePage,
	onChangePerPage,
}: PaginatedListProps) => {
	const t = useTranslations();
	const { page, showPerPage, setPage, setShowPerPage } = usePaginationListStore(
		(state) => state,
	);

	const handleChangeShowPerPage = (event: SelectChangeEvent) => {
		setShowPerPage(Number(event.target.value));
		onChangePerPage?.(event, Number(event.target.value));
	};

	const handleChangePage = (
		event: React.ChangeEvent<unknown>,
		value: number,
	) => {
		setPage(value);
		onChangePage?.(event, value);
	};

	const items = useMemo<React.ReactNode[]>(
		() => (Array.isArray(children) ? children : [children]),
		[children],
	);

	const itemsPerPage = useMemo(() => {
		const startIndex = (page - 1) * showPerPage;
		return items.slice(startIndex, startIndex + showPerPage);
	}, [items, page, showPerPage]);

	const count = useMemo<number>(() => {
		if (items.length < showPerPage) {
			return 1;
		}
		return Math.ceil(items.length / showPerPage);
	}, [items, showPerPage]);

	return (
		<Stack sx={{ width: "100%" }} alignItems="center">
			<List sx={{ width: "100%" }}>{itemsPerPage}</List>
			<Stack direction="row" alignItems="baseline" alignSelf="self-end" mr={2}>
				<Typography sx={{ opacity: 0.6 }} variant="caption">
					{t("features.paginatedList.selectPerPageTitle")}
				</Typography>
				<Select
					data-testid="show-per-page"
					autoWidth
					value={showPerPage.toString()}
					onChange={handleChangeShowPerPage}
					variant="standard"
					disableUnderline
				>
					{SHOW_PER_PAGE_OPTIONS.map((option) => (
						<MenuItem key={option} value={option}>
							<Typography variant="caption">{option}</Typography>
						</MenuItem>
					))}
				</Select>
			</Stack>
			<Pagination
				color="primary"
				count={count}
				showFirstButton
				showLastButton
				onChange={handleChangePage}
				page={page}
				renderItem={(item) => (
					<PaginationItem
						slots={{ last: SkipNextIcon, first: SkipPreviousIcon }}
						{...item}
					/>
				)}
			/>
		</Stack>
	);
};
