"use client";
import { Button, Grid2 as Grid, Paper, Typography } from "@mui/material";
import { useFormatter, useTranslations } from "next-intl";
import { useMemo } from "react";

import { type Checkout, cartCalculator, useCartStore } from "@/entities/cart";
import { useCartPageDeps } from "../Cart.deps";

export function CartSummary() {
	const t = useTranslations("pages.cart.checkoutSummary");
	const format = useFormatter();
	const { companyId, cart } = useCartStore();
	const { onCheckout } = useCartPageDeps();
	const checkoutSummary = useMemo<Checkout>((): Checkout => {
		if (!cart || !cart.products || !companyId)
			return { totalPrice: 0, totalCount: 0, totalWeight: 0 };
		const filteredProducts = cartCalculator.getFiltererdProductsByCompanyId(
			cart.products,
			companyId,
		);
		return {
			totalPrice: cartCalculator.calculateTotalPriceInternal(filteredProducts),
			totalCount: cartCalculator.calculateTotalCount(filteredProducts),
			totalWeight: cartCalculator.calculateTotalWeight(filteredProducts),
		};
	}, [companyId, cart]);
	return (
		<Paper
			elevation={10}
			variant="elevation"
			sx={{
				display: "flex",
				flexDirection: "column",
				width: "100%",
				maxWidth: 290,
				p: 2,
			}}
		>
			<Grid size={12} textAlign="center" sx={{ mb: 2.5 }}>
				<Button
					variant="contained"
					color="primary"
					fullWidth
					onClick={onCheckout}
				>
					{t("checkoutButton")}
				</Button>
			</Grid>

			<Typography textAlign="start" variant="h6" sx={{ width: "100%", mb: 2 }}>
				{t("cartTitle")}
			</Typography>

			<Grid container direction="column" alignItems="flex-start">
				{[
					[
						t("totalItemsLabel"),
						`${checkoutSummary.totalCount} ${t("unitPieces")}`,
					],
					[
						t("totalWeightLabel"),
						`${checkoutSummary.totalWeight} ${t("unitKg")}`,
					],
				].map(([label, value]) => (
					<Grid
						key={label}
						container
						size={12}
						justifyContent="space-between"
						sx={{ width: "100%" }}
					>
						<Typography variant="body1" fontWeight="500">
							{label}
						</Typography>
						<Typography variant="body1">{value}</Typography>
					</Grid>
				))}
			</Grid>

			<Grid
				size={12}
				display="flex"
				justifyContent="space-between"
				sx={{ mt: 2.5, mb: 0.625, width: "100%" }}
			>
				<Typography variant="h6" fontWeight="500">
					{t("subtotalLabel")}
				</Typography>
				<Typography variant="h5" color="primary" fontWeight="500">
					{format.number(checkoutSummary.totalPrice, "currency")}
				</Typography>
			</Grid>
		</Paper>
	);
}
