import { Container, List, ListItem, Stack } from "@mui/material";
import Link from "next/link";
import type { PropsWithChildren } from "react";

import { config, type UserRole } from "../config";
import { SidebarItemNavigation } from "./SidebarItemNavigataion";

export function DashboardLayout({ children }: PropsWithChildren) {
	const role: UserRole = "supplier";
	return (
		<Container maxWidth="xl" className="tw:mt-8">
			<Stack direction="row" spacing={5}>
				<List className="tw:p-0">
					{config[role].map((item) => (
						<ListItem key={item.key} disablePadding>
							<Link href={item.path}>
								<SidebarItemNavigation text={item.text} Icon={item.Icon} />
							</Link>
						</ListItem>
					))}
				</List>
				{children}
			</Stack>
		</Container>
	);
}
