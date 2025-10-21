import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import Paper from "@mui/material/Paper";
import { getTranslations } from "next-intl/server";
import type { ProductType } from "@/entities/product";

type ProductSpecsProps = {
	product: ProductType;
};

export async function ProductSpecs({ product }: ProductSpecsProps) {
	const t = await getTranslations("pages.catalog.productDetailed.productSpecs");

	const productData = [
		[t("packagingVolume"), product?.dimension?.weight],
		[t("quantityInPack"), product?.amount],
		[t("packagingType"), product?.dimension?.width],
		[t("article"), product?.identifier.article],
	];

	return (
		<Paper elevation={3} sx={{ borderRadius: 2, mt: 5 }}>
			<Table>
				<TableBody>
					{productData.map(([label, value]) => (
						<TableRow key={label}>
							<TableCell
								sx={{
									fontWeight: 500,
									whiteSpace: "nowrap",
									borderBottom: "1px solid #eee",
								}}
							>
								{label}
							</TableCell>
							<TableCell
								align="right"
								sx={{
									borderBottom: "1px solid #eee",
								}}
							>
								{value}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
	);
}
