import { Box, Grid2 as Grid, Stack } from "@mui/material";
import { getTranslations } from "next-intl/server";
import type { CompanyInfoType } from "@/entities/company";
import { CompanyGeneralInfoForm } from "@/features/dashboard/CompanyGeneralInfoForm";
import { ModalEditCompanyInfoFeature } from "@/features/dashboard/ModalEditCompanyInfoFeature";
import { DisplayFrame } from "../DisplayFrame";
import { DisplayInformationField } from "../DisplayInformationField";

export type InformationTabProps = {
	companyInfo?: CompanyInfoType;
};

export async function InformationTab({ companyInfo }: InformationTabProps) {
	const t = await getTranslations("pages.dashboard");
	return (
		<Grid container spacing={10}>
			<Grid size={12}>
				<DisplayFrame>
					<Grid container spacing={10}>
						<Grid>
							<Box
								sx={{
									bgcolor: "gray",
									borderRadius: 5,
								}}
								className="tw:h-24 tw:w-52 md:tw:h-48 md:tw:w-72"
							/>
						</Grid>
						<Grid>
							<DisplayInformationField
								title={t("tabs.information.descriptionLabel")}
								disableMargins
								noDivider
							>
								{companyInfo?.description ||
									t("tabs.information.descriptionDefault")}
							</DisplayInformationField>
						</Grid>
					</Grid>
				</DisplayFrame>
			</Grid>
			<Grid size={{ lg: 7, md: 12 }} flexGrow={1}>
				<DisplayFrame>
					<DisplayInformationField
						title={t("tabs.information.categoriesLabel")}
						noDivider
					>
						{t("tabs.information.categoriesDefault")}
					</DisplayInformationField>
				</DisplayFrame>
			</Grid>
			<Grid size={{ lg: 5, md: 12 }} flexGrow={1}>
				<DisplayFrame>
					<Stack spacing={2}>
						<DisplayInformationField title={t("tabs.information.tax")}>
							{companyInfo?.taxation || ""}
						</DisplayInformationField>
						<DisplayInformationField title={t("tabs.information.minOrder")}>
							{companyInfo?.minOrder || ""}
						</DisplayInformationField>
						<DisplayInformationField
							noDivider
							title={t("tabs.information.additionalOrderTerms")}
						>
							{companyInfo?.terms || ""}
						</DisplayInformationField>
					</Stack>
				</DisplayFrame>
			</Grid>

			{/*  Start Feature */}
			<ModalEditCompanyInfoFeature Form={CompanyGeneralInfoForm} />
		</Grid>
	);
}
