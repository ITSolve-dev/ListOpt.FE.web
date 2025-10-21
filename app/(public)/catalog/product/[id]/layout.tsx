import { Container } from "@mui/material";
import type { PropsWithChildren } from "react";
import { BreadcrumbsNav } from "@/shared/ui";

export default function ProductLayout({ children }: PropsWithChildren) {
	return (
		<Container>
			<BreadcrumbsNav />
			{children}
		</Container>
	);
}
