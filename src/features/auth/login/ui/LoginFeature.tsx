"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Backdrop,
	Box,
	CircularProgress,
	FormControlLabel,
	Grid2 as Grid,
	Switch,
	TextField,
	Typography,
} from "@mui/material";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";
import { LoginSchema, type LoginSchemaType } from "@/entities/auth";
import { translate, translateFieldError } from "@/shared/lib/intl.helpers";
import { Button } from "@/shared/ui/Button";
import { PasswordField } from "@/shared/ui/Fields";

const LoginFeature = () => {
	const [queryError] = useQueryState("error");
	const t = useTranslations();
	const { trigger, error, isMutating } = useSWRMutation(
		"/api/login",
		async (_, { arg }: { arg: LoginSchemaType }) => {
			signIn("credentials", {
				redirectTo: "/dashboard",
				...arg,
			});
		},
		{
			onError() {
				toast.error("Error");
			},
		},
	);

	const { control, register, handleSubmit } = useForm<LoginSchemaType>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	return (
		<form
			onSubmit={handleSubmit((data: LoginSchemaType) => trigger(data))}
			style={{ width: "100%" }}
		>
			<Backdrop
				sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
				open={isMutating}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Box sx={{ maxWidth: 600, margin: "auto", padding: 4 }}>
				<Grid container spacing={3}>
					<Grid size={{ xs: 12 }}>
						<Controller
							control={control}
							name="email"
							render={({ field, fieldState: { error } }) => {
								const errorText = translateFieldError(t, error);
								return (
									<TextField
										fullWidth
										label={t("general.login.email.label")}
										{...field}
										type="email"
										error={!!errorText}
										helperText={errorText}
										slotProps={{
											htmlInput: {
												"data-testid": "email-input",
											},
										}}
									/>
								);
							}}
						/>
					</Grid>

					<Grid size={{ xs: 12 }}>
						<PasswordField
							control={control}
							name="password"
							inputProps={{
								label: t("general.login.password.label"),
							}}
						/>
					</Grid>

					{(error || queryError) && (
						<Grid size={{ xs: 12 }}>
							<Box sx={{ display: "flex", justifyContent: "space-between" }}>
								<Typography variant="body2" color="primary">
									{translate(t, "apiErrors.unknown")}
								</Typography>
								<a
									href="/support"
									style={{ textDecoration: "underline", fontSize: "0.75rem" }}
								>
									{t("general.login.writeToSupport")}
								</a>
							</Box>
						</Grid>
					)}

					<Grid size={{ xs: 12 }}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<FormControlLabel
								control={<Switch {...register("rememberMe")} color="primary" />}
								label={t("general.login.rememberMe")}
							/>
							<a
								href="/support"
								style={{ textDecoration: "underline", fontSize: "0.75rem" }}
							>
								{t("general.login.forgotPassword")}
							</a>
						</Box>
					</Grid>
				</Grid>

				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						flexDirection: { xs: "column", md: "row" },
						mt: 3,
						mb: { xs: 3, md: 0 },
						gap: 2,
					}}
				>
					<Button
						type="submit"
						primary
						data-testid="login-submit-button"
						sx={{
							width: "100%",
							height: "49px",
							backgroundColor: "primary.main",
							color: "white",
							borderRadius: "8px",
						}}
					>
						{t("general.login.buttons.login")}
					</Button>
					<Button
						as="a"
						href="/register"
						data-testid="redirect-register-button"
						sx={{
							width: "100%",
							height: "49px",
							borderColor: "primary.main",
							borderStyle: "solid",
							borderWidth: "1px",
							borderRadius: "8px",
						}}
					>
						{t("general.login.buttons.register")}
					</Button>
				</Box>
			</Box>
		</form>
	);
};

export { LoginFeature };
