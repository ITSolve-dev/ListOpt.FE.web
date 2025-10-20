import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid2 as Grid, IconButton, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { CreateProductType } from "../model/schemas";
import { TextFieldControlledError } from "./TextFieldControlledError";

export const DynamicProductFieldsForm = () => {
	const t = useTranslations();
	const { control } = useFormContext<CreateProductType>();
	const { fields, append, remove } = useFieldArray({
		control,
		name: "fields",
	});

	return (
		<Grid container spacing={5} sx={{ width: "100%" }}>
			<Grid size={6}>
				<Typography variant="h5">
					{t("features.forms.createProductForm.fields.productFields.title")}
				</Typography>
			</Grid>
			<Grid size={6} textAlign="right">
				<Button
					endIcon={<AddIcon />}
					onClick={() => append({ name: "", value: "", measure: "" })}
				>
					{t("features.forms.createProductForm.fields.productFields.add")}
				</Button>
			</Grid>
			{fields.map((field, index) => (
				<Fragment key={field.id}>
					<Grid size={5}>
						<TextFieldControlledError
							control={control}
							name={`fields.${index}.name`}
							fullWidth
							helperText={t(
								"features.forms.createProductForm.fields.productFields.name.helperText",
							)}
							label={t(
								"features.forms.createProductForm.fields.productFields.name.label",
							)}
						/>
					</Grid>
					<Grid size={4}>
						<TextFieldControlledError
							control={control}
							name={`fields.${index}.value`}
							fullWidth
							helperText={t(
								"features.forms.createProductForm.fields.productFields.value.helperText",
							)}
							label={t(
								"features.forms.createProductForm.fields.productFields.value.label",
							)}
						/>
					</Grid>
					<Grid size={2}>
						<TextFieldControlledError
							control={control}
							name={`fields.${index}.measure`}
							fullWidth
							helperText={t(
								"features.forms.createProductForm.fields.productFields.measure.helperText",
							)}
							label={t(
								"features.forms.createProductForm.fields.productFields.measure.label",
							)}
						/>
					</Grid>
					<Grid size={1}>
						<IconButton size="large" onClick={() => remove(index)}>
							<DeleteIcon />
						</IconButton>
					</Grid>
				</Fragment>
			))}
		</Grid>
	);
};
