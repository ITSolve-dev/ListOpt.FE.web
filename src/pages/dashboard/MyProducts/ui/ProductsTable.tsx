"use client";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
	Chip,
	IconButton,
	Menu,
	MenuItem,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
	Typography,
} from "@mui/material";
import chain from "lodash/chain";
import filter from "lodash/filter";
import orderBy from "lodash/orderBy";
import pick from "lodash/pick";
import some from "lodash/some";
import lodashToString from "lodash/toString";
import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import {
	type ChangeEvent,
	type MouseEvent,
	useCallback,
	useState,
} from "react";
import type { ProductType } from "@/entities/product";
import NoImage from "@/images/no-image.png";
import {
	usePageQueryState,
	usePerPageQueryState,
} from "@/shared/searchQueries";
import { useSearchQueryState } from "../query/useSearchQueryState";

type ProductsTableProps = {
	products: ProductType[];
};

type SortType = "asc" | "desc";

export const ProductsTable = ({ products }: ProductsTableProps) => {
	const formatter = useFormatter();
	const t = useTranslations();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [sortName, setSortName] = useState<SortType>("asc");
	const [sortPrice, setSortPrice] = useState<SortType>("asc");
	const [activeProductId, setActiveProductId] = useState<number | null>(null);
	const [searchQueryState] = useSearchQueryState();
	const [perPageQueryState, setPerPageQueryState] = usePerPageQueryState();
	const [pageQueryState, setPageQueryState] = usePageQueryState();

	const handleChangePage = useCallback(
		async (newPage: number) => {
			await setPageQueryState(newPage === 0 ? null : newPage + 1);
		},
		[setPageQueryState],
	);

	const handleChangePerPage = useCallback(
		async (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			await setPerPageQueryState(parseInt(event.target.value, 10));
			await handleChangePage(0);
		},
		[handleChangePage, setPerPageQueryState],
	);

	const handleOpenActionsMenu = (
		event: MouseEvent<HTMLButtonElement>,
		productId: number,
	) => {
		event.preventDefault();
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
		setActiveProductId(productId);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const goToProduct = (id: number) =>
		window.open(`/catalog/product/${id}`, "_blank");

	const toggleSort = (current: SortType): SortType => {
		const nextConfig: Record<SortType, SortType> = {
			asc: "desc",
			desc: "asc",
		};
		return nextConfig[current];
	};

	const acceptSortByName = (products: ProductType[]): ProductType[] =>
		orderBy(products, ["name"], [sortName]);

	const acceptSortByPrice = (products: ProductType[]): ProductType[] =>
		orderBy(products, ["priceInternal"], [sortPrice]);

	const acceptFilterBySearch = (
		products: ProductType[],
		by: (keyof ProductType)[] = ["name", "description"],
	): ProductType[] => {
		return searchQueryState
			? filter(products, (product) =>
					some(Object.values(pick(product, by)), (value) =>
						lodashToString(value)
							.toLowerCase()
							.includes(searchQueryState.toLowerCase()),
					),
				)
			: products;
	};

	const filteredProducts = chain(products)
		.thru(acceptFilterBySearch)
		.thru(acceptSortByName)
		.thru(acceptSortByPrice)
		.value();

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="center" width={70}>
							{t("pages.myProducts.table.header.photo")}
						</TableCell>
						<TableCell align="left" width={440}>
							<TableSortLabel
								active={!!sortName}
								direction={sortName}
								onClick={() => setSortName((prev) => toggleSort(prev))}
							>
								{t("pages.myProducts.table.header.name")}
							</TableSortLabel>
						</TableCell>
						<TableCell align="center" width={110}>
							<TableSortLabel
								active={!!sortPrice}
								direction={sortPrice}
								onClick={() => setSortPrice((prev) => toggleSort(prev))}
							>
								{t("pages.myProducts.table.header.price")}
							</TableSortLabel>
						</TableCell>
						<TableCell align="center" width={150}>
							{t("pages.myProducts.table.header.status")}
						</TableCell>
						<TableCell width={70} />
					</TableRow>
				</TableHead>
				<TableBody>
					{filteredProducts
						.slice(
							(pageQueryState - 1) * perPageQueryState,
							(pageQueryState - 1) * perPageQueryState + perPageQueryState,
						)
						.map((product) => (
							<TableRow
								key={product.id}
								hover
								onClick={() => goToProduct(product.id)}
								sx={{ cursor: "pointer" }}
							>
								<TableCell align="center">
									<Image
										src={product.photo || NoImage}
										alt={product.name}
										width={40}
										height={40}
									/>
								</TableCell>
								<TableCell align="left">
									<Stack>
										<Typography variant="body2">{product.name}</Typography>
										<Typography color="text.secondary" variant="caption">
											{product.identifier.article}
										</Typography>
									</Stack>
								</TableCell>
								<TableCell align="center">
									<Typography variant="body2" color="primary">
										{formatter.number(product.price.internal, "currency")}
									</Typography>
								</TableCell>
								<TableCell align="center">
									<Chip
										label={<Typography variant="body2">Активен</Typography>}
										color="success"
										sx={{ px: 2 }}
									/>
								</TableCell>
								<TableCell align="right">
									<IconButton
										id={product.id.toString()}
										onClick={(event: MouseEvent<HTMLButtonElement>) =>
											handleOpenActionsMenu(event, product.id)
										}
									>
										<MoreVertIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={filteredProducts.length}
				rowsPerPage={perPageQueryState}
				page={pageQueryState - 1}
				onPageChange={(_, newPage: number) => handleChangePage(newPage)}
				onRowsPerPageChange={handleChangePerPage}
				labelRowsPerPage={t("pages.myProducts.table.labelRowsPerPage")}
			/>
			<Menu
				id="product-actions"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				slotProps={{
					list: {
						"aria-labelledby": "product-actions",
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				<MenuItem onClick={handleClose}>
					{t("pages.myProducts.table.actions.toArchive")}
				</MenuItem>
				<MenuItem onClick={handleClose}>
					{t("pages.myProducts.table.actions.edit")}
				</MenuItem>
				<MenuItem onClick={handleClose}>
					{t("pages.myProducts.table.actions.addSimilar")}
				</MenuItem>
				<MenuItem
					onClick={() => activeProductId && goToProduct(activeProductId)}
				>
					{t("pages.myProducts.table.actions.view")}
				</MenuItem>
				<MenuItem onClick={handleClose}>
					{t("pages.myProducts.table.actions.delete")}
				</MenuItem>
			</Menu>
		</TableContainer>
	);
};
