"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	Grid2 as Grid,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
	CompanyInfoSchema,
	type CompanyInfoType,
	CompanyTaxationSchema,
	useCompanyStore,
} from "@/entities/company";
import { translate, translateFieldError } from "@/shared/lib/intl.helpers";
import { UploadFile } from "@/shared/ui";
import { FileUploadSchema } from "@/types/generalSchema";

type CompanyGeneralInfoFormProps = {
	onSubmitAction: (data: CompanyInfoType) => void;
};

export const CompanyGeneralInfoForm = ({
	onSubmitAction,
}: CompanyGeneralInfoFormProps) => {
	const t = useTranslations();
	const { info } = useCompanyStore();

	const { control, handleSubmit } = useForm<CompanyInfoType>({
		resolver: zodResolver(CompanyInfoSchema),
		defaultValues: { ...info },
	});

	return (
		<form onSubmit={handleSubmit(onSubmitAction)} style={{ maxWidth: 840 }}>
			<Grid container spacing={5}>
				<Grid size={12}>
					<Typography variant="h5">
						{t("features.forms.companyGeneralInfo.title")}
					</Typography>
				</Grid>
				<Grid size={6}>
					<Controller
						name="photo"
						control={control}
						render={({
							field: { onChange, value, name, ref, disabled },
							fieldState: { error },
						}) => (
							<UploadFile
								name={name}
								onChangeAction={onChange}
								value={value}
								error={error?.message}
								disabled={disabled}
								refAction={ref}
								dropzoneOptions={{
									validator: (file: File) => {
										const { success } = FileUploadSchema.safeParse(file);
										if (!success) {
											toast("error"); // TODO: need to detailed error
										}
										return null;
									},
								}}
							/>
						)}
					/>
				</Grid>
				<Grid size={6}>
					<Controller
						name="description"
						control={control}
						render={({ field, fieldState: { error } }) => {
							const errorText = translateFieldError(t, error);

							return (
								<TextField
									{...field}
									label={t(
										"features.forms.companyGeneralInfo.fields.description.label",
									)}
									multiline
									minRows={5}
									fullWidth
									error={!!errorText}
									helperText={errorText}
								/>
							);
						}}
					/>
				</Grid>
				<Grid size={6}>
					<Stack spacing={5}>
						<Controller
							name="taxation"
							control={control}
							render={({ field, fieldState: { error } }) => {
								const errorText = translateFieldError(t, error);

								return (
									<FormControl fullWidth error={!!errorText}>
										<InputLabel id="demo-simple-select-label">
											{t(
												"features.forms.companyGeneralInfo.fields.taxation.label",
											)}
										</InputLabel>
										<Select
											{...field}
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											label={t(
												"features.forms.companyGeneralInfo.fields.taxation.label",
											)}
										>
											{Object.values(CompanyTaxationSchema.Enum).map((tax) => (
												<MenuItem key={tax} value={tax}>
													{tax}
												</MenuItem>
											))}
										</Select>
										{error && (
											<FormHelperText>
												{translate(t, error.message)}
											</FormHelperText>
										)}
									</FormControl>
								);
							}}
						/>
						<Controller
							name="minOrder"
							control={control}
							render={({ field, fieldState: { error } }) => {
								const errorText = translateFieldError(t, error);

								return (
									<TextField
										{...field}
										type="number"
										label={t(
											"features.forms.companyGeneralInfo.fields.minOrder.label",
										)}
										fullWidth
										error={!!errorText}
										helperText={errorText}
									/>
								);
							}}
						/>
					</Stack>
				</Grid>
				<Grid size={6}>
					<Controller
						name="terms"
						control={control}
						render={({ field, fieldState: { error } }) => {
							const errorText = translateFieldError(t, error);

							return (
								<TextField
									{...field}
									multiline
									minRows={5}
									type="text"
									label={t(
										"features.forms.companyGeneralInfo.fields.terms.label",
									)}
									fullWidth
									error={!!errorText}
									helperText={errorText}
								/>
							);
						}}
					/>
				</Grid>
				<Grid size={12}>
					<Box display="flex" justifyContent="center" alignItems="center">
						<Button type="submit" variant="contained" className="tw-px-24">
							{t("general.save")}
						</Button>
					</Box>
				</Grid>
			</Grid>
		</form>
	);
};
