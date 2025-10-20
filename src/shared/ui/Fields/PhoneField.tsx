"use client";
import { InputAdornment, TextField, type TextFieldProps } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import {
	Controller,
	type ControllerProps,
	type FieldValues,
	type Path,
} from "react-hook-form";
import { phoneRules } from "@/shared/lib/countryPhones";

import { translateFieldError } from "@/shared/lib/intl.helpers";

export type PhoneFieldProps<T extends FieldValues> = Omit<
	ControllerProps<T, Path<T>>,
	"render"
> & {
	inputProps?: TextFieldProps;
	selectedCountry: string;
};

export const PhoneField = <T extends FieldValues>({
	inputProps,
	selectedCountry,
	...controllerProps
}: PhoneFieldProps<T>) => {
	const t = useTranslations();
	const phoneConfig = useMemo(
		() =>
			phoneRules[selectedCountry as keyof typeof phoneRules] ?? phoneRules.BY,
		[selectedCountry],
	);

	return (
		<Controller
			{...controllerProps}
			render={({ field, fieldState: { error } }) => {
				const errorText = translateFieldError(t, error);
				return (
					<TextField
						{...field}
						fullWidth
						label={t("general.register.phone.label")}
						type="tel"
						error={!!errorText}
						helperText={errorText}
						onChange={(e) => {
							const rawValue = e.target.value.replace(/\D/g, "");
							field.onChange(rawValue);
						}}
						slotProps={{
							htmlInput: {
								maxLength: phoneConfig.max,
							},
							input: {
								startAdornment: (
									<InputAdornment position="start">
										{phoneConfig.prefix}
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
