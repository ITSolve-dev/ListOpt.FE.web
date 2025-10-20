import { Container } from "@mui/material";

import { ProductSchema, type ProductType } from "@/entities/product";
import { apiCatalog } from "@/shared/lib/api";
import { ProductExplorerPageProvider } from "../ProductExplorer.provider";
import { ExplorerFilterProducts } from "./ExplorerFilterProducts";

async function getProducts(
	page: number,
	count: number,
): Promise<ProductType[]> {
	const data = await apiCatalog
		.get(`products?page=${page}&pageSize=${count}`)
		.json();

	const products = await ProductSchema.array().parseAsync(data);
	return products;
}

export type ProductExplorerPageProps = {
	page: number;
	count: number;
};

export async function ProductExplorerPage({
	page,
	count,
}: ProductExplorerPageProps) {
	const products = await getProducts(page, count);
	return (
		<ProductExplorerPageProvider>
			<Container sx={{ mb: 5 }}>
				<ExplorerFilterProducts products={products} />
			</Container>
		</ProductExplorerPageProvider>
	);
}
