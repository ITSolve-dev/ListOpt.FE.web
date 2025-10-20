"use client";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
	IconButton,
	InputAdornment,
	TextField,
	type TextFieldProps,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
	Controller,
	type ControllerProps,
	type FieldValues,
	type Path,
} from "react-hook-form";
import { translateFieldError } from "@/shared/lib/intl.helpers";

export type PasswordFieldProps<T extends FieldValues> = Omit<
	ControllerProps<T, Path<T>>,
	"render"
> & {
	inputProps?: TextFieldProps;
};

export const PasswordField = <T extends FieldValues>({
	inputProps,
	...controllerProps
}: PasswordFieldProps<T>) => {
	const t = useTranslations();
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	return (
		<Controller
			{...controllerProps}
			render={({ field, fieldState: { error } }) => {
				const errorText = translateFieldError(t, error);
				return (
					<TextField
						fullWidth
						{...field}
						label={t("general.register.password.label")}
						type={showPassword ? "text" : "password"}
						error={!!errorText}
						helperText={errorText}
						slotProps={{
							htmlInput: {
								"data-testid": "password-input",
							},
							input: {
								endAdornment: (
									<InputAdornment position="end">
										<IconButton onClick={handleClickShowPassword} edge="end">
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							},
						}}
						{...inputProps}
					/>
				);
			}}
		/>
	);
};
