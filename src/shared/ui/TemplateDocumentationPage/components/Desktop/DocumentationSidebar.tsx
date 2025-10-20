import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { resolveKey } from "@/shared/lib/intl.helpers";
import type { NavigationProps } from "../../type";
import { PartnerAlert } from "../PartnerAlert/PartnerAlert";

export const DocumentationSidebar = async ({
	sections,
	page,
}: NavigationProps) => {
	const t = await getTranslations();

	return (
		<Box
			width="33%"
			position="sticky"
			top="80px"
			maxHeight="100vh"
			overflow="auto"
		>
			{sections.map((section) => (
				<Box
					key={section.id}
					sx={{
						cursor: "pointer",
						mb: 2,
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Typography color="text.primary">
						<Link href={`#${section.id}`}>
							{t(
								resolveKey(`pages.${page}.${section.label}`) ??
									"apiErrors.unknown",
							)}
						</Link>
					</Typography>
					<ExpandMoreIcon />
				</Box>
			))}
			<PartnerAlert page={page} />
		</Box>
	);
};
