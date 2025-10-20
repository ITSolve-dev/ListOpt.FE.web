"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Button,
	FormControl,
	FormHelperText,
	Grid2 as Grid,
	InputLabel,
	MenuItem,
	Select,
	Stack,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { Controller, FormProvider, useForm } from "react-hook-form";
import {
	CATEGORY_TITLE_KEYS,
	CategoryName,
	type CategoryNameType,
	DEFAULT_CATEGORY,
} from "@/entities/category";
import { UploadFile } from "@/shared/ui";
import { useCreateProduct } from "../api/useCreateProduct";
import { useCreateProductDeps } from "../CreateProduct.deps";
import { CreateProductSchema, type CreateProductType } from "../model/schemas";
import { DynamicProductFieldsForm } from "./DynamicProductFieldsForm";
import { ProductInformationForm } from "./ProductInformationForm";
import { ProductPriceForm } from "./ProductPriceForm";
import { ProductSizeForm } from "./ProductSizeForm";
import { TextFieldControlledError } from "./TextFieldControlledError";

type MainCreateProductFormProps = {
	category?: CategoryNameType;
};

export const MainCreateProductForm = ({
	category = DEFAULT_CATEGORY,
}: MainCreateProductFormProps) => {
	const t = useTranslations();

	const { onSubmit, onSuccess, onError } = useCreateProductDeps();
	const { trigger, isMutating } = useCreateProduct(
		onSubmit,
		onSuccess,
		onError,
	);

	const { control, handleSubmit, ...rest } = useForm<CreateProductType>({
		resolver: zodResolver(CreateProductSchema),
		disabled: isMutating,
		defaultValues: {
			name: "",
			identifier: {
				article: "",
				barcode: "",
			},
			price: {
				internal: 0,
				external: 0,
			},
			amount: 0,
			description: undefined,
			photo: undefined,
			category,
			fields: undefined,
			minOrder: 0,
			dimension: {
				width: 0,
				height: 0,
				depth: 0,
				weight: 0,
			},
		},
	});

	return (
		<FormProvider<CreateProductType>
			control={control}
			handleSubmit={handleSubmit}
			{...rest}
		>
			<form onSubmit={handleSubmit((data) => trigger(data))}>
				<Stack
					direction="column"
					spacing={9}
					justifyContent="center"
					alignItems="center"
				>
					<Grid container spacing={5} width="100%">
						<Grid size={6}>
							<Controller
								name="photo"
								control={control}
								render={({ field, fieldState: { error } }) => (
									<UploadFile {...field} error={error?.message} />
								)}
							/>
						</Grid>
						<Grid size={6}>
							<Stack direction="column" spacing={5}>
								<TextFieldControlledError
									fullWidth
									control={control}
									name="name"
									label={t(
										"features.forms.createProductForm.fields.name.label",
									)}
									slotProps={{
										htmlInput: {
											"data-testid": "create-product-name",
										},
									}}
								/>
								<Controller
									name="category"
									control={control}
									render={({ field }) => (
										<FormControl fullWidth>
											<InputLabel id="category-label">
												{t(
													"features.forms.createProductForm.fields.category.label",
												)}
											</InputLabel>
											<Select
												labelId="category-label"
												label={t(
													"features.forms.createProductForm.fields.category.label",
												)}
												{...field}
											>
												{Object.values(CategoryName.Enum).map((category) => (
													<MenuItem key={category} value={category}>
														{t(CATEGORY_TITLE_KEYS[category])}
													</MenuItem>
												))}
											</Select>
											<FormHelperText>
												{t(
													"features.forms.createProductForm.fields.category.helperText",
												)}
											</FormHelperText>
										</FormControl>
									)}
								/>
							</Stack>
						</Grid>
					</Grid>
					<ProductInformationForm />
					<ProductPriceForm />
					<DynamicProductFieldsForm />
					<ProductSizeForm />

					<Button
						sx={{ width: "30%" }}
						size="large"
						variant="contained"
						type="submit"
						loading={isMutating}
					>
						{t("features.forms.createProductForm.submitBtn")}
					</Button>
				</Stack>
			</form>
		</FormProvider>
	);
};
