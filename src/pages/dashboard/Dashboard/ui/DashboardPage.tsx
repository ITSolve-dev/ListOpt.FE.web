import AssignmentIcon from "@mui/icons-material/Assignment";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import PersonIcon from "@mui/icons-material/Person";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { Stack, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import {
	CompanyStoreProvider,
	getMyCompanyAction,
	getMyCompanyInfoAction,
} from "@/entities/company";
import { UserStoreProvider } from "@/entities/user";
import { TabWizard } from "@/shared/ui";
import { DashboardPageProvider } from "../Dashboard.provider";
import { DocumentsTab } from "./tabs/DocumentsTab";
import { InformationTab } from "./tabs/InformationTab";
import { RequisitesTab } from "./tabs/RequisitesTab";

export async function Dashboard() {
	const t = await getTranslations("pages.dashboard");

	const company = await getMyCompanyAction();
	const companyInfo = await getMyCompanyInfoAction();

	if (!company || !companyInfo) {
		return <div>User not found</div>;
	}

	return (
		<CompanyStoreProvider
			initState={{
				company,
				info: companyInfo,
			}}
		>
			<UserStoreProvider>
				<DashboardPageProvider>
					<Stack flexGrow={1} spacing={2}>
						<Typography variant="h4">{company.name}</Typography>
						<TabWizard
							labels={[
								<Typography key="information">
									{t("tabs.information.label")}
								</Typography>,
								<Typography key="requisites">
									{t("tabs.requisites.label")}
								</Typography>,
								<Typography key="contacts">
									{t("tabs.contacts.label")}
								</Typography>,
								<Typography key="docs">{t("tabs.docs.label")}</Typography>,
							]}
							tabProps={[
								{
									icon: <SpaceDashboardIcon />,
									iconPosition: "start",
								},
								{
									icon: <AssignmentIcon />,
									iconPosition: "start",
								},
								{
									icon: <PersonIcon />,
									iconPosition: "start",
								},
								{
									icon: <DocumentScannerIcon />,
									iconPosition: "start",
								},
							]}
						>
							<InformationTab companyInfo={companyInfo} />

							<RequisitesTab requisites={companyInfo?.requisites} />

							{/*<ContactsTab user={user} />*/}

							{/* TODO: Make server component */}
							<DocumentsTab />
						</TabWizard>
					</Stack>
				</DashboardPageProvider>
			</UserStoreProvider>
		</CompanyStoreProvider>
	);
}
