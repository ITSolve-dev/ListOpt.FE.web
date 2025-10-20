import { Grid2 as Grid } from "@mui/material";

import { getTranslations } from "next-intl/server";
import type { UserType } from "@/entities/user";
import { EditContactsForm } from "@/features/dashboard/ContactsForm";
import { ModalEditCompanyInfoFeature } from "@/features/dashboard/ModalEditCompanyInfoFeature";
import { DisplayFrame } from "../DisplayFrame";
import { DisplayInformationField } from "../DisplayInformationField";

type Props = {
	user?: UserType;
};

export async function ContactsTab({ user }: Props) {
	const t = await getTranslations("pages.dashboard");

	return (
		<DisplayFrame>
			<Grid container spacing={5}>
				<Grid size={6}>
					<DisplayInformationField title={t("tabs.contacts.lastName")}>
						{user?.info?.lastName}
					</DisplayInformationField>
				</Grid>
				<Grid size={6}>
					<DisplayInformationField title={t("tabs.contacts.name")}>
						{user?.info?.firstName}
					</DisplayInformationField>
				</Grid>
				<Grid size={12}>
					<DisplayInformationField title={t("tabs.contacts.position")}>
						{user?.info?.position}
					</DisplayInformationField>
				</Grid>
				<Grid size={6}>
					<DisplayInformationField noDivider title={t("tabs.contacts.phone")}>
						{user?.telephone}
					</DisplayInformationField>
				</Grid>
				<Grid size={6}>
					<DisplayInformationField noDivider title={t("tabs.contacts.email")}>
						{user?.email}
					</DisplayInformationField>
				</Grid>

				<ModalEditCompanyInfoFeature Form={EditContactsForm} />
			</Grid>
		</DisplayFrame>
	);
}
