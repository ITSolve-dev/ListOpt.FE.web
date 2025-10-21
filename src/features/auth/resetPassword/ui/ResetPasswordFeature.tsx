"use client";
import { Box, Grid2 as Grid, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { translateFieldError } from "@/shared/lib/intl.helpers";
import { Button } from "@/shared/ui/Button";
import { PasswordField } from "@/shared/ui/Fields";
import { ResetPasswordStep } from "../lib/constants";

const ResetPasswordFeature = () => {
	const t = useTranslations();
	const [step, setStep] = useState(ResetPasswordStep.INPUT_EMAIL);
	const { handleSubmit, control } = useForm();

	const handleEmailSubmit = () => {
		setStep(ResetPasswordStep.INPUT_PASSWORD);
	};

	const handlePasswordSubmit = async (_: object) => {};

	return (
		<form
			onSubmit={handleSubmit(
				step === ResetPasswordStep.INPUT_EMAIL
					? handleEmailSubmit
					: handlePasswordSubmit,
			)}
			className="tw:w-full tw:max-w-3xl tw:p-6"
		>
			{step === ResetPasswordStep.INPUT_EMAIL && (
				<Box>
					<Grid container spacing={2}>
						<Grid size={{ xs: 12 }}>
							<Controller
								control={control}
								name="email"
								render={({ field, fieldState: { error } }) => {
									const errorText = translateFieldError(t, error);
									return (
										<TextField
											{...field}
											label={t("general.resetPassword.inputEmail.label")}
											type="email"
											error={!!errorText}
											helperText={errorText}
										/>
									);
								}}
							/>
							<Typography variant="body2" color="textSecondary" mt={1}>
								{t("general.resetPassword.inputEmail.tip")}
							</Typography>
						</Grid>
					</Grid>
					<Box mt={3} display="flex" justifyContent="flex-start">
						<Button type="submit" primary>
							{t("general.resetPassword.inputEmail.button")}
						</Button>
					</Box>
				</Box>
			)}

			{step === ResetPasswordStep.INPUT_PASSWORD && (
				<Box>
					<Grid container spacing={2}>
						<Grid size={{ xs: 12, md: 6 }}>
							<PasswordField
								control={control}
								name="password"
								inputProps={{
									label: t(
										"general.resetPassword.inputPassword.password.label",
									),
								}}
							/>
						</Grid>
						<Grid size={{ xs: 12, md: 6 }}>
							<PasswordField
								control={control}
								name="password"
								inputProps={{
									label: t(
										"general.resetPassword.inputPassword.confirmPassword.label",
									),
								}}
							/>
						</Grid>
					</Grid>
					<Box mt={3} display="flex" justifyContent="flex-start">
						<Button type="submit" primary>
							{t("general.resetPassword.inputPassword.button")}
						</Button>
					</Box>
				</Box>
			)}
		</form>
	);
};

export { ResetPasswordFeature };
