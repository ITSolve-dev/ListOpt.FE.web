import Grid from "@mui/material/Grid";
import { Search } from "@/features/Search";
import { Logo } from "@/shared/ui/Logo";
import { AccountActionButtons } from "./AccountActionButtons";
import { NavigationMenu } from "./NavigationMenu";

export async function Header() {
	return (
		<Grid container sx={{ height: { xs: 56, sm: "auto" } }}>
			<Grid
				container
				justifyContent="center"
				alignItems="center"
				xs={6}
				sm={3}
				sx={{
					border: "1px solid #E6E6E6",
					borderTop: "none",
					pr: { xs: 1, lg: 7 },
					pl: { xs: 1, lg: 10 },
				}}
			>
				<Logo />
			</Grid>

			<Grid
				item
				xs={2}
				sm
				sx={{
					border: "1px solid #E6E6E6",
					borderTop: "none",
				}}
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				<Search />
			</Grid>

			<Grid
				container
				justifyContent="center"
				alignItems="center"
				xs={2}
				sm={3}
				sx={{
					border: "1px solid #E6E6E6",
					borderTop: "none",
					px: { xs: 1, lg: 5 },
					py: { lg: 2 },
				}}
			>
				<AccountActionButtons />
			</Grid>

			<Grid
				container
				justifyContent="center"
				alignItems="center"
				xs={2}
				sm={12}
				sx={{
					border: "1px solid #E6E6E6",
					borderTop: "none",
					px: { xs: 1, lg: 5 },
					py: { lg: 3 },
				}}
			>
				<NavigationMenu />
			</Grid>
		</Grid>
	);
}
