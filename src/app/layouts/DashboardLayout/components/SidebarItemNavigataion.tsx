import type { SvgIconComponent } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

type SidebarItemNavigationProps = {
	text: string;
	Icon: SvgIconComponent;
};

export function SidebarItemNavigation({
	text,
	Icon,
}: SidebarItemNavigationProps) {
	return (
		<Stack
			className="tw:group tw:ml-5 tw:w-[290] tw:rounded-xl tw:px-4 tw:py-3 tw:hover:bg-primary"
			direction="row"
			alignItems="center"
			spacing={4}
		>
			<Icon className="tw:transition-none tw:group-hover:fill-white" />
			<Typography className="tw:group-hover:text-white" variant="body1">
				{text}
			</Typography>
		</Stack>
	);
}
