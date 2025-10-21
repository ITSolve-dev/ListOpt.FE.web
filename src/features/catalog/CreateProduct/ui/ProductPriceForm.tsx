import { Grid2 as Grid, InputAdornment, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import type { CreateProductType } from "../model/schemas";
import { TextFieldControlledError } from "./TextFieldControlledError";

export const ProductPriceForm = () => {
	const t = useTranslations();
	const { control } = useFormContext<CreateProductType>();

	return (
		<Grid container spacing={5} sx={{ width: "100%" }}>
			<Grid size={12}>
				<Typography variant="h5">
					{t("features.forms.createProductForm.priceTitle")}
				</Typography>
			</Grid>
			<Grid size={6}>
				<TextFieldControlledError
					control={control}
					name="price.internal"
					fullWidth
					type="number"
					label={t(
						"features.forms.createProductForm.fields.priceInternal.label",
					)}
					slotProps={{
						htmlInput: {
							"data-testid": "create-product-price-internal",
						},
						input: {
							endAdornment: (
								<InputAdornment sx={{ opacity: 0.3 }} position="end">
									{t("general.currency.short.BYN")}
								</InputAdornment>
							),
						},
					}}
				/>
			</Grid>
			<Grid size={6}>
				<TextFieldControlledError
					control={control}
					name="price.external"
					fullWidth
					type="number"
					label={t(
						"features.forms.createProductForm.fields.priceExternal.label",
					)}
					slotProps={{
						htmlInput: {
							"data-testid": "create-product-price-external",
						},
						input: {
							endAdornment: (
								<InputAdornment sx={{ opacity: 0.3 }} position="end">
									{t("general.currency.short.BYN")}
								</InputAdornment>
							),
						},
					}}
				/>
			</Grid>
		</Grid>
	);
};
