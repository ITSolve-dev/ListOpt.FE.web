import {
	Alert,
	AlertTitle,
	Box,
	Container,
	Grid2 as Grid,
} from "@mui/material";
import { getTranslations } from "next-intl/server";
import type { ProductType } from "@/entities/product";
import { PriceCard } from "./PriceCard";
import { ProductHeader } from "./ProductHeader";
import { ProductSpecs } from "./ProductSpecs";
import { SupplierCard } from "./SupplierCard";

async function getProduct(_: number): Promise<ProductType | null> {
	return null;
}

async function getCompany() {
	return null;
}

type ProductDetailedPageProps = {
	productId: number;
};

export async function ProductDetailedPage({
	productId,
}: ProductDetailedPageProps) {
	const t = await getTranslations();
	const product = await getProduct(productId);
	const company = await getCompany();

	// TODO: Fix me
	return (
		product &&
		company && (
			<Container>
				<Grid container alignItems="flex-start" spacing={5}>
					<Grid size={9}>
						<Box display="flex" flexDirection="column" gap={5}>
							<Alert severity="warning" variant="outlined">
								<AlertTitle>
									{t("pages.catalog.productDetailed.alert")}
								</AlertTitle>
							</Alert>
							<ProductHeader product={product} />
							<ProductSpecs product={product} />
							<SupplierCard company={company} />
						</Box>
					</Grid>

					<Grid size={3}>
						<PriceCard product={product} />
					</Grid>
				</Grid>
			</Container>
		)
	);
}
