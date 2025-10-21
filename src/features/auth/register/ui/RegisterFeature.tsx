"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	Alert,
	Backdrop,
	CircularProgress,
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
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Controller, useForm, useWatch } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { type RegisterRequest, register } from "@/entities/auth";
import { translate, translateFieldError } from "@/shared/lib/intl.helpers";
import { SelectedBox } from "@/shared/ui";
import { Button } from "@/shared/ui/Button";
import { CheckboxTermsField } from "@/shared/ui/Checkbox";
import { PasswordField, PhoneField } from "@/shared/ui/Fields";
import { countryOptions, profileOptions } from "../lib/constants";
import {
	RegisterSchema,
	type RegisterSchemaType,
	RoleId,
	RoleName,
} from "../schemas";

const useRegister = (onSuccess: () => void) =>
	useSWRMutation(
		"/api/auth/register",
		async (_, { arg }: { arg: RegisterRequest }) => await register(arg),
		{
			onSuccess,
		},
	);

const RegisterFeature = () => {
	const t = useTranslations();
	const { handleSubmit, control, setValue } = useForm<RegisterSchemaType>({
		defaultValues: {
			name: "",
			lastName: "",
			organizationName: "",
			profile: RoleName.buyer,
			country: "BY",
			email: "",
			telephone: "",
			password: "",
			passwordConfirmation: "",
			terms: false,
			roleId: RoleId.buyer,
		},
		resolver: zodResolver(RegisterSchema),
	});
	const router = useRouter();
	const {
		trigger,
		isMutating: isLoading,
		error,
	} = useRegister(() => {
		router.push("/login");
	});
	const selectedCountry = useWatch({ control, name: "country" });

	const handleRegister = async (data: RegisterSchemaType) =>
		await trigger({
			company: {
				name: data.organizationName,
				status: "NOT_VERIFIED",
			},
			userInfo: {
				firstName: data.name,
				lastName: data.lastName,
				country: data.country,
				position: "",
			},
			email: data.email,
			password: data.password,
			roleId: data.roleId,
			telephone: data.telephone,
		});

	return (
		<form
			onSubmit={handleSubmit(handleRegister)}
			action=""
			style={{ width: "100%", maxWidth: "800px", padding: "24px" }}
		>
			<Backdrop
				open={isLoading}
				sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			{error && (
				<Alert severity="error" sx={{ marginBottom: 2 }}>
					{t("general.register.messages.error")}
				</Alert>
			)}

			<Grid container spacing={3}>
				<Grid size={{ xs: 12, md: 12 }} mb={5}>
					<Controller
						name="profile"
						control={control}
						render={({ field }) => (
							<Stack spacing={2} direction="row">
								{profileOptions.map((opt) => (
									<SelectedBox
										key={opt.value}
										{...field}
										isActive={opt.value === field.value}
										onClick={() => field.onChange(opt.value)}
									>
										<Typography variant="subtitle2">
											{translate(t, opt.label)}
										</Typography>
										<Typography variant="body2">
											{translate(t, opt.description)}
										</Typography>
									</SelectedBox>
								))}
							</Stack>
						)}
					/>
				</Grid>
				<Grid size={{ xs: 12, md: 6 }}>
					<Controller
						control={control}
						name="organizationName"
						render={({ field, fieldState: { error } }) => {
							const errorText = translateFieldError(t, error);
							return (
								<TextField
									fullWidth
									label={t("general.register.organizationName.label")}
									type="text"
									{...field}
									error={!!errorText}
									helperText={errorText}
								/>
							);
						}}
					/>
				</Grid>
				<Grid size={{ xs: 12, md: 6 }}>
					<Controller
						name="country"
						control={control}
						render={({ field, fieldState: { error } }) => (
							<FormControl fullWidth>
								<InputLabel>{t("general.register.country.label")}</InputLabel>
								<Select
									label={t("general.register.country.label")}
									{...field}
									fullWidth
									onChange={(e) => {
										field.onChange(e);
										setValue("telephone", "");
									}}
								>
									{countryOptions.map((opt) => (
										<MenuItem key={opt.value} value={opt.value}>
											{translate(t, opt.label)}
										</MenuItem>
									))}
								</Select>
								{error && (
									<FormHelperText>{translate(t, error.message)}</FormHelperText>
								)}
							</FormControl>
						)}
					/>
				</Grid>
				<Grid size={{ xs: 12, md: 6 }}>
					<Controller
						control={control}
						name="name"
						render={({ field, fieldState: { error } }) => {
							const errorText = translateFieldError(t, error);
							return (
								<TextField
									fullWidth
									label={t("general.register.name.label")}
									type="text"
									{...field}
									error={!!errorText}
									helperText={errorText}
								/>
							);
						}}
					/>
				</Grid>
				<Grid size={{ xs: 12, md: 6 }}>
					<Controller
						control={control}
						name="lastName"
						render={({ field, fieldState: { error } }) => {
							const errorText = translateFieldError(t, error);
							return (
								<TextField
									fullWidth
									label={t("general.register.lastName.label")}
									type="text"
									{...field}
									error={!!errorText}
									helperText={errorText}
								/>
							);
						}}
					/>
				</Grid>
				<Grid size={{ xs: 12, md: 6 }}>
					<PhoneField
						control={control}
						name="telephone"
						selectedCountry={selectedCountry}
					/>
				</Grid>
				<Grid size={{ xs: 12, md: 6 }}>
					<Controller
						control={control}
						name="email"
						render={({ field, fieldState: { error } }) => {
							const errorText = translateFieldError(t, error);
							return (
								<TextField
									fullWidth
									label={t("general.register.email.label")}
									{...field}
									type="email"
									error={!!errorText}
									helperText={errorText}
								/>
							);
						}}
					/>
				</Grid>
				<Grid size={{ xs: 12, md: 6 }}>
					<PasswordField
						control={control}
						name="password"
						inputProps={{
							label: t("general.register.password.label"),
						}}
					/>
				</Grid>
				<Grid size={{ xs: 12, md: 6 }}>
					<PasswordField
						control={control}
						name="passwordConfirmation"
						inputProps={{
							label: t("general.register.confirmPassword.label"),
						}}
					/>
				</Grid>
				<Grid size={{ xs: 12, md: 12 }}>
					<CheckboxTermsField<RegisterSchemaType>
						name="terms"
						control={control}
					/>
				</Grid>
				<Grid size={{ xs: 12, md: 12 }} display="flex" justifyContent="center">
					<Button
						type="submit"
						variant="contained"
						color="primary"
						sx={{
							color: "white",
							width: "66%",
							padding: "10px 20px",
						}}
					>
						{t("general.register.buttons.register")}
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export { RegisterFeature };
