import { TextField, type TextFieldProps } from "@mui/material";
import { useTranslations } from "next-intl";
import {
	Controller,
	type FieldPath,
	type FieldValues,
	type UseControllerProps,
} from "react-hook-form";
import { translateFieldError } from "@/shared/lib/intl.helpers";

type TextFieldControlledErrorProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	TTransformedValues = TFieldValues,
> = TextFieldProps &
	UseControllerProps<TFieldValues, TName, TTransformedValues>;

export const TextFieldControlledError = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	TTransformedValues = TFieldValues,
>({
	name,
	control,
	helperText,
	...rest
}: TextFieldControlledErrorProps<TFieldValues, TName, TTransformedValues>) => {
	const t = useTranslations();
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<TextField
					error={!!error}
					helperText={error ? translateFieldError(t, error) : helperText}
					{...rest}
					{...field}
				/>
			)}
		/>
	);
};
