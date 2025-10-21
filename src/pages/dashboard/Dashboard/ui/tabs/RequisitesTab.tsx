import { Grid2 as Grid } from "@mui/material";
import { useTranslations } from "next-intl";

import type { CompanyRequisitesType } from "@/entities/company";
import { ModalEditCompanyInfoFeature } from "@/features/dashboard/ModalEditCompanyInfoFeature";
import { RequisitesEditFormAdapter } from "@/features/dashboard/RequisitesEditForm";

import { DisplayFrame } from "../DisplayFrame";
import { DisplayInformationField } from "../DisplayInformationField";

export type InformationTabProps = {
	requisites?: CompanyRequisitesType | null;
};

export function RequisitesTab({ requisites }: InformationTabProps) {
	const t = useTranslations();
	return (
		<DisplayFrame>
			<Grid container spacing={5}>
				<Grid size={6}>
					<DisplayInformationField
						title={t("pages.dashboard.tabs.requisites.unp")}
					>
						{requisites?.unp}
					</DisplayInformationField>
				</Grid>
				<Grid size={6}>
					<DisplayInformationField
						title={t("pages.dashboard.tabs.requisites.okpo")}
					>
						{requisites?.okpo}
					</DisplayInformationField>
				</Grid>
				<Grid size={12}>
					<DisplayInformationField
						title={t("pages.dashboard.tabs.requisites.legalAddress")}
					>
						{requisites?.legalAddress}
					</DisplayInformationField>
				</Grid>
				<Grid size={12}>
					<DisplayInformationField
						title={t("pages.dashboard.tabs.requisites.postAddress")}
					>
						{requisites?.postAddress}
					</DisplayInformationField>
				</Grid>
				<Grid size={6}>
					<DisplayInformationField
						title={t("pages.dashboard.tabs.requisites.currentAccount")}
					>
						{requisites?.currentAccount}
					</DisplayInformationField>
				</Grid>
				<Grid size={6}>
					<DisplayInformationField
						title={t("pages.dashboard.tabs.requisites.cbu")}
					>
						{requisites?.cbu}
					</DisplayInformationField>
				</Grid>
				<Grid size={6}>
					<DisplayInformationField
						noDivider
						title={t("pages.dashboard.tabs.requisites.bic")}
					>
						{requisites?.bic}
					</DisplayInformationField>
				</Grid>
				<Grid size={6}>
					<DisplayInformationField
						noDivider
						title={t("pages.dashboard.tabs.requisites.bankLocation")}
					>
						{requisites?.bankLocation}
					</DisplayInformationField>
				</Grid>
				<ModalEditCompanyInfoFeature Form={RequisitesEditFormAdapter} />
			</Grid>
		</DisplayFrame>
	);
}
