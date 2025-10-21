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
import { useUserStore } from "@/entities/user";
import { translateFieldError } from "@/shared/lib/intl.helpers";
import { EditContactsSchema, type EditContactsType } from "../schemas";

type EditContactsFormProps = {
	onSubmitAction: (data: EditContactsType) => void;
};

export const EditContactsForm = ({ onSubmitAction }: EditContactsFormProps) => {
	const t = useTranslations();
	const { user } = useUserStore();

	const { control, handleSubmit } = useForm<EditContactsType>({
		resolver: zodResolver(EditContactsSchema),
		defaultValues: {
			firstName: user?.info?.firstName || "",
			lastName: user?.info?.lastName || "",
			position: user?.info?.position || "",
		},
	});

	const handleFormSubmit = handleSubmit(onSubmitAction, (errors) => {
		console.warn("Form validation errors:", errors);
	});

	return (
		<form onSubmit={handleFormSubmit} style={{ maxWidth: 840 }}>
			<Grid container spacing={5}>
				<Grid size={12}>
					<Typography variant="h5">
						{t("pages.dashboard.tabs.contacts.editForm.labels.title")}
					</Typography>
				</Grid>
				<Grid size={6}>
					<Controller
						name="lastName"
						control={control}
						render={({ field, fieldState: { error } }) => {
							const errorText = translateFieldError(t, error);

							return (
								<TextField
									{...field}
									label={t(
										"pages.dashboard.tabs.contacts.editForm.labels.lastName",
									)}
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
					<Controller
						name="firstName"
						control={control}
						render={({ field, fieldState: { error } }) => {
							const errorText = translateFieldError(t, error);

							return (
								<TextField
									{...field}
									label={t(
										"pages.dashboard.tabs.contacts.editForm.labels.firstName",
									)}
									minRows={5}
									fullWidth
									error={!!errorText}
									helperText={errorText}
								/>
							);
						}}
					/>
				</Grid>
				<Grid size={12}>
					<Controller
						name="position"
						control={control}
						render={({ field, fieldState: { error } }) => {
							const errorText = translateFieldError(t, error);

							return (
								<TextField
									{...field}
									label={t(
										"pages.dashboard.tabs.contacts.editForm.labels.position",
									)}
									minRows={5}
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
