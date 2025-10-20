"use client";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Card, Checkbox, IconButton, Stack, Typography } from "@mui/material";
import _ from "lodash";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { type ProductToCart, useCartStore } from "@/entities/cart";
import { ProductCard } from "@/entities/product";

type CartListProps = {
	products: ProductToCart[];
};

export const CartList = ({ products }: CartListProps) => {
	const t = useTranslations();
	const { toggleProduct, selectedProducts, selectAll, unselectAll } =
		useCartStore();
	const isCheckedSelectAll = useMemo<boolean>(
		() =>
			_.every(products, (product) =>
				_.some(selectedProducts, (p) => p.product.id === product.product.id),
			),
		[products, selectedProducts],
	);
	return (
		<Stack spacing={3.75}>
			<Card elevation={2}>
				<Stack direction="row" alignItems="center" spacing={2} p={1}>
					<Checkbox
						checked={isCheckedSelectAll}
						onChange={isCheckedSelectAll ? unselectAll : selectAll}
						size="medium"
						color="primary"
					/>
					<Typography sx={{ flexGrow: 1, userSelect: "none" }}>
						{t("pages.cart.selectAll")}
					</Typography>
				</Stack>
			</Card>

			{products.map((product) => (
				<ProductCard
					key={product.product.id}
					product={product.product}
					variant="interactive"
					selectable
					selected={_.some(
						selectedProducts,
						(p) => p.product.id === product.product.id,
					)}
					onSelect={() => toggleProduct(product)}
					action={() => (
						<Stack direction="row" spacing={4.375} alignItems="center">
							<IconButton
								sx={{
									aspectRatio: "1 / 1",
									backgroundColor: "primary.main",
									color: "white",
									borderRadius: 1,
								}}
							>
								<RemoveIcon />
							</IconButton>
							<Typography>{product.quantity}</Typography>
							<IconButton
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
					)}
				/>
			))}
		</Stack>
	);
};
