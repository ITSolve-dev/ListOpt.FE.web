"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	Box,
	Button,
	Grid2 as Grid,
	TextField,
	Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import {
	CompanyRequisitesSchema,
	type CompanyRequisitesType,
	useCompanyStore,
} from "@/entities/company";
import { translateFieldError } from "@/shared/lib/intl.helpers";

type EditRequisitesFormProps = {
	onSubmitAction: (data: CompanyRequisitesType) => void;
};

export function EditRequisitesForm({
	onSubmitAction,
}: EditRequisitesFormProps) {
	const t = useTranslations();
	const { info } = useCompanyStore();
	const { control, handleSubmit } = useForm<CompanyRequisitesType>({
		resolver: zodResolver(CompanyRequisitesSchema),
		defaultValues: { ...info?.requisites },
	});

	return (
		<form onSubmit={handleSubmit(onSubmitAction)}>
			<Grid container spacing={5} sx={{ p: 6 }}>
				<Grid size={12}>
					<Typography variant="h5" sx={{ mb: 2 }}>
						{t("features.forms.companyRequisites.title")}
					</Typography>
				</Grid>
				<Grid size={6}>
					<Controller
						name="unp"
						control={control}
						render={({ field, fieldState: { error } }) => {
							const errorText = translateFieldError(t, error);

							return (
								<TextField
									label={t("features.forms.companyRequisites.fields.unp.label")}
									variant="outlined"
									fullWidth
									{...field}
									error={!!error}
									helperText={errorText}
								/>
							);
						}}
					/>
				</Grid>
				<Grid size={6}>
					<Controller
						name="okpo"
						control={control}
						render={({ field, fieldState: { error } }) => {
							const errorText = translateFieldError(t, error);

							return (
								<TextField
									label={t(
										"features.forms.companyRequisites.fields.okpo.label",
									)}
									fullWidth
									variant="outlined"
									{...field}
									error={!!error}
									helperText={errorText}
								/>
							);
						}}
					/>
				</Grid>
				<Grid size={12}>
					<Controller
						name="legalAddress"
						control={control}
						render={({ field, fieldState: { error } }) => {
							const errorText = translateFieldError(t, error);

							return (
								<TextField
									label={t(
										"features.forms.companyRequisites.fields.legalAddress.label",
									)}
									fullWidth
									variant="outlined"
									{...field}
									error={!!error}
									helperText={errorText}
								/>
							);
						}}
					/>
				</Grid>
				<Grid size={12}>
					<Controller
						name="postAddress"
						control={control}
						render={({ field, fieldState: { error } }) => {
							const errorText = translateFieldError(t, error);

							return (
								<TextField
									label={t(
										"features.forms.companyRequisites.fields.postAddress.label",
									)}
									fullWidth
									variant="outlined"
									{...field}
									error={!!error}
									helperText={errorText}
								/>
							);
						}}
					/>
				</Grid>
				<Grid size={6}>
					<Controller
						name="currentAccount"
						control={control}
						render={({ field, fieldState: { error } }) => {
							const errorText = translateFieldError(t, error);

							return (
								<TextField
									label={t(
										"features.forms.companyRequisites.fields.currentAccount.label",
									)}
									variant="outlined"
									fullWidth
									{...field}
									error={!!error}
									helperText={errorText}
								/>
							);
						}}
					/>
				</Grid>
				<Grid size={6}>
					<Controller
						name="cbu"
						control={control}
						render={({ field, fieldState: { error } }) => {
							const errorText = translateFieldError(t, error);

							return (
								<TextField
									label={t("features.forms.companyRequisites.fields.cbu.label")}
									variant="outlined"
									fullWidth
									{...field}
									error={!!error}
									helperText={errorText}
								/>
							);
						}}
					/>
				</Grid>
				<Grid size={6}>
					<Controller
						name="bic"
						control={control}
						render={({ field, fieldState: { error } }) => {
							const errorText = translateFieldError(t, error);

							return (
								<TextField
									label={t("features.forms.companyRequisites.fields.bic.label")}
									variant="outlined"
									fullWidth
									{...field}
									error={!!error}
									helperText={errorText}
								/>
							);
						}}
					/>
				</Grid>
				<Grid size={6}>
					<Controller
						name="bankLocation"
						control={control}
						render={({ field, fieldState: { error } }) => {
							const errorText = translateFieldError(t, error);

							return (
								<TextField
									label={t(
										"features.forms.companyRequisites.fields.bankLocation.label",
									)}
									variant="outlined"
									fullWidth
									{...field}
									error={!!error}
									helperText={errorText}
								/>
							);
						}}
					/>
				</Grid>
				<Grid size={12}>
					<Box display="flex" justifyContent="center">
						<Button
							type="submit"
							variant="contained"
							size="large"
							color="primary"
						>
							{t("general.save")}
						</Button>
					</Box>
				</Grid>
			</Grid>
		</form>
	);
}
