import { Alert, AlertTitle, Container, Stack, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import type { ProductType } from "@/entities/product";
import { ControlMyProducts } from "./ControlMyProducts";
import { ProductsTable } from "./ProductsTable";

async function getProducts(): Promise<ProductType[]> {
	return [];
}

export async function MyProductsPage() {
	const t = await getTranslations();
	const products = await getProducts();
	return (
		<Container>
			<Stack spacing={4} pb={15}>
				<Typography variant="h2">{t("pages.myProducts.title")}</Typography>
				<ControlMyProducts />
				{products.length === 0 ? (
					<Alert severity="warning" variant="outlined">
						<AlertTitle>{t("pages.myProducts.emptyWarning.title")}</AlertTitle>
						{t("pages.myProducts.emptyWarning.description")}
					</Alert>
				) : (
					<ProductsTable products={products} />
				)}
			</Stack>
		</Container>
	);
}
