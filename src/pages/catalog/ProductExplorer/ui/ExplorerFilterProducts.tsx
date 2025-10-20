"use client";
import {
	Button,
	Grid2 as Grid,
	ListItem,
	type SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ProductCard, type ProductType } from "@/entities/product";
import { PaginatedList } from "@/features/catalog/PaginatedList";
import {
	usePageQueryState,
	usePerPageQueryState,
} from "@/shared/searchQueries";
import { SortSelector } from "./SortSelector";

export type ExplorerFilterProductsProps = {
	products: ProductType[];
};

export const ExplorerFilterProducts = ({
	products,
}: ExplorerFilterProductsProps) => {
	const t = useTranslations();
	const [_, setPerPage] = usePerPageQueryState();
	const [__, setPage] = usePageQueryState();

	const router = useRouter();

	const handleChangePerPage = (_: SelectChangeEvent, value: number) =>
		setPerPage(value);
	const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) =>
		setPage(value);

	const handleGoToProduct = (id: number) => router.push(`product/${id}`);

	return (
		<Grid container spacing={3}>
			<Grid size={4}>
				<SortSelector />
			</Grid>
			<Grid size={12}>
				<PaginatedList
					onChangePage={handleChangePage}
					onChangePerPage={handleChangePerPage}
				>
					{products.map((product) => (
						<ListItem key={product.id}>
							<ProductCard
								product={product}
								cardActionAreaProps={{
									onClick: () => handleGoToProduct(product.id),
								}}
								action={() => (
									<Button
										sx={{ px: 10 }}
										color="primary"
										variant="contained"
										size="large"
									>
										{t("general.toCart")}
									</Button>
								)}
							/>
						</ListItem>
					))}
				</PaginatedList>
			</Grid>
		</Grid>
	);
};
