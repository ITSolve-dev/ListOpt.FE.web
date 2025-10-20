"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	CardHeader,
	FormControl,
	FormHelperText,
	Grid2 as Grid,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { DocumentsSchema, type DocumentsSchemaType } from "@/entities/company";
import { resolveKey } from "@/shared/lib/intl.helpers";
import { UploadFile } from "@/shared/ui";
import {
	DocumentSpecSchema,
	type DocumentSpecType,
	FileUploadSchema,
} from "@/types/generalSchema";

interface EditCompanyDocumentsFormProps {
	onClose: () => void;
	defaultType?: DocumentSpecType;
}

export function EditCompanyDocumentsForm({
	onClose,
	defaultType,
}: EditCompanyDocumentsFormProps) {
	const t = useTranslations();
	const { control, handleSubmit, reset } = useForm<DocumentsSchemaType>({
		resolver: zodResolver(DocumentsSchema),
		defaultValues: {
			documentType: defaultType,
		},
	});

	const handleClose = () => {
		onClose();
		reset();
	};

	return (
		<form onSubmit={handleSubmit(handleClose)}>
			<Grid container spacing={5} sx={{ p: 6 }}>
				<Grid size={12}>
					<CardHeader
						text="primary"
						title={t(
							resolveKey("pages.dashboard.tabs.docs.editForm.title") ??
								"apiErrors.unknown",
						)}
						fullWidth
						sx={{ pl: 0 }}
					/>
				</Grid>
				<Grid size={12}>
					<Controller
						name="documentType"
						control={control}
						render={({ field, fieldState: { error } }) => (
							<FormControl fullWidth error={!!error}>
								<InputLabel id="document-type-label">
									{t(
										resolveKey("pages.dashboard.tabs.docs.editForm.label") ??
											"apiErrors.unknown",
									)}
								</InputLabel>
								<Select
									{...field}
									labelId="document-type-label"
									id="document-type"
									label={t(
										resolveKey("pages.dashboard.tabs.docs.editForm.label") ??
											"apiErrors.unknown",
									)}
								>
									{Object.keys(DocumentSpecSchema.Enum).map((key) => {
										const i18nKey = `general.documents.${key.toLowerCase()}`;
										return (
											<MenuItem key={key} value={key}>
												{t(resolveKey(i18nKey) ?? "apiErrors.unknown")}
											</MenuItem>
										);
									})}
								</Select>
								{error?.message && (
									<FormHelperText>
										{t(resolveKey(error.message) ?? "apiErrors.unknown")}
									</FormHelperText>
								)}
							</FormControl>
						)}
					/>
				</Grid>

				<Grid size={12}>
					<Controller
						name="file"
						control={control}
						render={({
							field: { onChange, value, name, ref, disabled },
							fieldState: { error },
						}) => (
							<UploadFile
								test-id="upload-file"
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
			</Grid>
		</form>
	);
}
