import { Container, Divider, Stack, Typography } from "@mui/material";

import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { PropsWithChildren } from "react";
import { CATEGORY_TITLE_KEYS, isValidCategory } from "@/entities/category";
import { BreadcrumbsNav } from "@/shared/ui";

type CatalogProductExplorerLayoutProps = {
	params: Promise<{ category: string }>;
} & PropsWithChildren;

export default async function CatalogProductExplorerLayout({
	children,
	params,
}: CatalogProductExplorerLayoutProps) {
	const t = await getTranslations();
	const { category } = await params;
	if (!isValidCategory(category)) notFound();
	return (
		<Stack gap={4} py={7}>
			<Container>
				<Stack spacing={3}>
					<BreadcrumbsNav />
					<Typography variant="h2">
						{t(CATEGORY_TITLE_KEYS[category])}
					</Typography>
				</Stack>
			</Container>
			<Divider />
			{children}
			<Container>
				<Stack spacing={3}>
					<Typography variant="h2">Lorem</Typography>
					<Typography variant="body1">Text</Typography>
					<Typography variant="h3">Lorem</Typography>
					<Typography variant="body1">Text</Typography>
				</Stack>
			</Container>
		</Stack>
	);
}
