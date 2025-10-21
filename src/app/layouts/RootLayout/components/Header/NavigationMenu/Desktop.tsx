"use client";

import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import { config } from "../config";

export function DesktopNavigationMenu() {
	return (
		<Stack
			direction="row"
			spacing={2}
			useFlexGap
			flexWrap="wrap"
			sx={{ mx: { md: 3 } }}
		>
			{config.map((item) => (
				<Link href={item.href} key={item.id} passHref>
					<Typography
						variant="body1"
						sx={{
							mx: { md: 3 },
							display: { xs: "none", md: "block" },
							cursor: "pointer",
							transition: "color 0.3s",
							"&:hover": {
								color: "primary.main",
							},
							textDecoration: "none",
							color: "inherit",
						}}
					>
						{item.title}
					</Typography>
				</Link>
			))}
		</Stack>
	);
}
