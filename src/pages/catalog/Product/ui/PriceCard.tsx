"use client";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, IconButton, Paper, Stack, Typography } from "@mui/material";

import { useFormatter, useTranslations } from "next-intl";
import type { ProductType } from "@/entities/product";

type PriceCardProps = {
	product: ProductType;
};

export function PriceCard({ product }: PriceCardProps) {
	const t = useTranslations("pages.catalog.productDetailed.priceActions");
	const format = useFormatter();

	return (
		<Paper elevation={3}>
			<Stack p={2.5} spacing={6.25}>
				<Stack spacing={1.25}>
					<Typography variant="body1" color="text.primary">
						{t("packPrice")}
					</Typography>
					<Typography variant="h5" color="primary" gutterBottom>
						{format.number(product.price.internal, "currency")}
					</Typography>
				</Stack>
				<Stack spacing={3.125} alignItems="flex-start">
					<Stack direction="row" spacing={10}>
						<IconButton
							size="small"
							sx={{
								aspectRatio: "1 / 1",
								backgroundColor: "primary.main",
								color: "white",
								borderRadius: 1,
							}}
						>
							<RemoveIcon />
						</IconButton>
						{/* <Typography>{quantity}</Typography> */}
						<IconButton
							size="small"
							sx={{
								aspectRatio: "1 / 1",
								backgroundColor: "primary.main",
								color: "white",
								borderRadius: 1,
							}}
						>
							<AddIcon />
						</IconButton>
					</Stack>
					<Stack>
						<Button size="medium" variant="contained">
							{t("button")}
						</Button>
					</Stack>
				</Stack>
			</Stack>
		</Paper>
	);
}
