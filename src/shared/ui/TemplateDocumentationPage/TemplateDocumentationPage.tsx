import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import tempImagepECL8I from "@/images/tempImagepECL8I.png";
import {
	DesktopServerView,
	MobileServerView,
} from "@/shared/lib/device-detect";
import { resolveKey } from "@/shared/lib/intl.helpers";
import { BreadcrumbsNav } from "@/shared/ui";
import { DocumentationContent } from "./components/Desktop/DocumentationContent";
import { DocumentationSidebar } from "./components/Desktop/DocumentationSidebar";
import { FAQ } from "./components/FAQ/FAQ";
import { DocumentationAccordion } from "./components/Mobile/DocumentationAccordion";
import type { Question, Section } from "./type";

type TemplateDocumentationPageProps = {
	faqItems: Question[];
	sections: Section[];
	page: string;
};

export async function TemplateDocumentationPage({
	faqItems,
	sections,
	page,
}: TemplateDocumentationPageProps) {
	const t = await getTranslations();

	return (
		<Box maxWidth="1280px" width="100%" py={2} mx="auto">
			<DesktopServerView>
				<Box my={2} mx={10}>
					<BreadcrumbsNav />
				</Box>
			</DesktopServerView>

			<Typography
				variant="h2"
				gutterBottom
				sx={{
					px: { xs: 2, md: 10 },
					typography: { xs: "h4", md: "h2" },
				}}
			>
				{t(resolveKey(`pages.${page}.title`) ?? "apiErrors.unknown")}
			</Typography>

			<Image
				src={tempImagepECL8I}
				alt="tempImagepECL8I"
				placeholder="blur"
				quality={80}
				style={{
					width: "100%",
					height: "auto",
					display: "block",
				}}
			/>

			<Box
				display="flex"
				flexDirection={{ xs: "column", md: "row" }}
				sx={{
					mx: { xs: 2, md: 10 },
					my: { xs: 2, md: 8 },
					overflowAnchor: "none",
					scrollBehavior: "smooth",
				}}
			>
				<DesktopServerView>
					<DocumentationSidebar sections={sections} page={page} />
				</DesktopServerView>
				<Box px={2} flex={1}>
					<DesktopServerView>
						<DocumentationContent sections={sections} page={page} />
					</DesktopServerView>
					<MobileServerView>
						<DocumentationAccordion sections={sections} page={page} />
					</MobileServerView>
				</Box>
			</Box>

			<FAQ faqItems={faqItems} page={page} />
		</Box>
	);
}
