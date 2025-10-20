"use client";
import { Grid2 as Grid, InputAdornment, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import type { CreateProductType } from "../model/schemas";
import { TextFieldControlledError } from "./TextFieldControlledError";

export const ProductSizeForm = () => {
	const t = useTranslations();
	const { control } = useFormContext<CreateProductType>();

	return (
		<Grid container spacing={5} sx={{ width: "100%" }}>
			<Grid size={12}>
				<Typography variant="h5">
					{t("features.forms.createProductForm.sizeTitle")}
				</Typography>
			</Grid>
			<Grid size={6}>
				<TextFieldControlledError
					control={control}
					name="dimension.depth"
					fullWidth
					type="number"
					label={t("features.forms.createProductForm.fields.size.depth.label")}
					slotProps={{
						htmlInput: {
							"data-testid": "create-product-size-depth",
						},
						input: {
							endAdornment: (
								<InputAdornment sx={{ opacity: 0.3 }} position="end">
									{t("general.measure.short.santimeters")}
								</InputAdornment>
							),
						},
					}}
				/>
			</Grid>
			<Grid size={6}>
				<TextFieldControlledError
					control={control}
					name="dimension.width"
					fullWidth
					type="number"
					label={t("features.forms.createProductForm.fields.size.width.label")}
					slotProps={{
						htmlInput: {
							"data-testid": "create-product-size-width",
						},
						input: {
							endAdornment: (
								<InputAdornment sx={{ opacity: 0.3 }} position="end">
									{t("general.measure.short.santimeters")}
								</InputAdornment>
							),
						},
					}}
				/>
			</Grid>
			<Grid size={6}>
				<TextFieldControlledError
					control={control}
					name="dimension.height"
					fullWidth
					type="number"
					label={t("features.forms.createProductForm.fields.size.height.label")}
					slotProps={{
						htmlInput: {
							"data-testid": "create-product-size-height",
						},
						input: {
							endAdornment: (
								<InputAdornment sx={{ opacity: 0.3 }} position="end">
									{t("general.measure.short.santimeters")}
								</InputAdornment>
							),
						},
					}}
				/>
			</Grid>
			<Grid size={6}>
				<TextFieldControlledError
					control={control}
					name="dimension.weight"
					fullWidth
					type="number"
					label={t("features.forms.createProductForm.fields.size.weight.label")}
					slotProps={{
						htmlInput: {
							"data-testid": "create-product-size-weight",
						},
						input: {
							endAdornment: (
								<InputAdornment sx={{ opacity: 0.3 }} position="end">
									{t("general.measure.short.kilograms")}
								</InputAdornment>
							),
						},
					}}
				/>
			</Grid>
		</Grid>
	);
};
