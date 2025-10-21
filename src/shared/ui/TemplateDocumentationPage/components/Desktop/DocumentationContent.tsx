import LinkIcon from "@mui/icons-material/Link";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { resolveKey } from "@/shared/lib/intl.helpers";
import type { NavigationProps } from "../../type";

export const DocumentationContent = async ({
	sections,
	page,
}: NavigationProps) => {
	const t = await getTranslations();

	return (
		<>
			{sections.map((section) => (
				<Box id={section.id} key={section.id} ml={2} pt={5} mb={3}>
					<Typography
						variant="h4"
						mb={2}
						sx={{
							fontWeight: "normal",
							"&:hover": {
								textDecoration: "underline",
							},
						}}
					>
						<Link href={`#${section.id}`}>
							{t(
								resolveKey(`pages.${page}.${section.label}`) ??
									"apiErrors.unknown",
							)}
							<LinkIcon sx={{ ml: 1 }} />
						</Link>
					</Typography>

					{section.blocks?.show_before && (
						<Typography variant="body1" my={3} align="left">
							{t(
								resolveKey(`pages.${page}.${section.content}`) ??
									"apiErrors.unknown",
							)}
						</Typography>
					)}

					{section.blocks && (
						<Paper
							variant="outlined"
							sx={{
								borderRadius: 2,
								borderWidth: 2,
								borderColor: "neutralBorder",
								overflow: "hidden",
							}}
						>
							<Stack
								divider={
									<Divider
										sx={{
											borderColor: "neutralBorder",
											width: "95%",
											margin: "auto",
											borderWidth: 1,
										}}
									/>
								}
							>
								{section.blocks.items.map((item) => (
									<Box key={item.label} p={2}>
										<Typography variant="h6" fontWeight="medium" gutterBottom>
											{t(
												resolveKey(`pages.${page}.${item.label}`) ??
													"apiErrors.unknown",
											)}
										</Typography>
										<Typography variant="body1" align="left">
											{t(
												resolveKey(`pages.${page}.${item.content}`) ??
													"apiErrors.unknown",
											)}
										</Typography>
									</Box>
								))}
							</Stack>
						</Paper>
					)}

					{!section.blocks?.show_before && (
						<Typography variant="body1" my={3} align="left">
							{t(
								resolveKey(`pages.${page}.${section.content}`) ??
									"apiErrors.unknown",
							)}
						</Typography>
					)}
				</Box>
			))}
		</>
	);
};
