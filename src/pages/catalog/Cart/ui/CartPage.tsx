import { Container, Grid2 as Grid, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import { getMyCart } from "@/entities/cart";
import { CartPageProvider } from "../CartPage.provider";
import { CartSummary } from "./CartSummary";
import { TabulationByCompanies } from "./TabulationByCompanies";

export async function CartPage() {
	const cart = await getMyCart();
	const t = await getTranslations();
	return (
		<CartPageProvider cart={cart}>
			<Container>
				<Grid container spacing={4}>
					<Grid size={12}>
						<Typography variant="h2">{t("pages.cart.title")}</Typography>
					</Grid>
					<Grid size="grow">
						<TabulationByCompanies />
					</Grid>
					<Grid size="auto">
						<CartSummary />
					</Grid>
				</Grid>
			</Container>
		</CartPageProvider>
	);
}
