import { Checkbox, FormControlLabel, Link, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";
import { translate } from "@/shared/lib/intl.helpers";

interface CheckboxTermsFieldProps<T extends FieldValues> {
	name: Path<T>;
	control: Control<T>;
	rules?: object;
}

const CheckboxTermsField = <T extends FieldValues>({
	name,
	control,
	rules,
}: CheckboxTermsFieldProps<T>) => {
	const t = useTranslations();
	return (
		<Controller
			name={name} // Теперь name корректно соответствует Path<T>
			control={control}
			rules={rules}
			render={({ field, fieldState: { error } }) => (
				<div className="tw:mb-4">
					<FormControlLabel
						control={
							<Checkbox
								{...field}
								checked={!!field.value}
								sx={{
									color: error ? "red" : "primary.main",
									"&.Mui-checked": {
										color: error ? "red" : "primary.main",
									},
								}}
							/>
						}
						label={
							<Typography
								sx={{ fontSize: "16px", fontWeight: "400", color: "#333" }}
							>
								{t("general.register.checkbox.label")}
								<Link
									href="/terms"
									target="_blank"
									rel="noopener noreferrer"
									sx={{
										color: "black",
										textDecoration: "underline",
										"&:hover": { color: "primary.main" },
									}}
								>
									{t("general.register.checkbox.linkText")}
								</Link>
							</Typography>
						}
						sx={{ alignItems: "flex-start", gap: "8px" }}
					/>
					{error && (
						<Typography sx={{ color: "red", fontSize: "14px", mt: 1 }}>
							{translate(t, error.message)}
						</Typography>
					)}
				</div>
			)}
		/>
	);
};

export { CheckboxTermsField };
