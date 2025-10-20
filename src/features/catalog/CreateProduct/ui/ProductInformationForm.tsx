import { Grid2 as Grid, InputAdornment, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import type { CreateProductType } from "../model/schemas";
import { TextFieldControlledError } from "./TextFieldControlledError";

export const ProductInformationForm = () => {
	const t = useTranslations();
	const { control } = useFormContext<CreateProductType>();

	return (
		<Grid container spacing={5} sx={{ width: "100%" }}>
			<Grid size={12}>
				<Typography variant="h5">
					{t("features.forms.createProductForm.informationTitle")}
				</Typography>
			</Grid>
			<Grid size={6}>
				<TextFieldControlledError
					control={control}
					name="identifier.barcode"
					fullWidth
					label={t("features.forms.createProductForm.fields.barcode.label")}
					slotProps={{
						htmlInput: {
							"data-testid": "create-product-information-barcode",
						},
					}}
				/>
			</Grid>
			<Grid size={6}>
				<TextFieldControlledError
					fullWidth
					control={control}
					name="amount"
					type="number"
					label={t("features.forms.createProductForm.fields.amount.label")}
					slotProps={{
						htmlInput: {
							"data-testid": "create-product-information-amount",
						},
						input: {
							endAdornment: (
								<InputAdornment sx={{ opacity: 0.3 }} position="end">
									{t("general.measure.short.pieces")}
								</InputAdornment>
							),
						},
					}}
				/>
			</Grid>
			<Grid size={6}>
				<TextFieldControlledError
					fullWidth
					control={control}
					name="identifier.article"
					label={t("features.forms.createProductForm.fields.article.label")}
					slotProps={{
						htmlInput: {
							"data-testid": "create-product-information-article",
						},
					}}
				/>
			</Grid>
			<Grid size={6}>
				<TextFieldControlledError
					fullWidth
					control={control}
					name="minOrder"
					type="number"
					label={t("features.forms.createProductForm.fields.minOrder.label")}
					slotProps={{
						htmlInput: {
							"data-testid": "create-product-information-minOrder",
						},
						input: {
							endAdornment: (
								<InputAdornment sx={{ opacity: 0.3 }} position="end">
									{t("general.measure.short.packs")}
								</InputAdornment>
							),
						},
					}}
				/>
			</Grid>
			<Grid size={12}>
				<TextFieldControlledError
					fullWidth
					multiline
					minRows={5}
					maxRows={7}
					control={control}
					name="description"
					label={t("features.forms.createProductForm.fields.description.label")}
					slotProps={{
						htmlInput: {
							"data-testid": "create-product-information-description",
						},
					}}
				/>
			</Grid>
		</Grid>
	);
};
