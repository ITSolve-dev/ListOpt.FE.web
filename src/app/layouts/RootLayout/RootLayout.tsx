import { Grid2 as Grid } from "@mui/material";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

type RootLayoutProps = {
	children: React.ReactNode;
};

export async function RootLayout({ children }: RootLayoutProps) {
	return (
		<Grid container direction="column">
			<Grid>
				<Header />
			</Grid>
			<Grid size={12} sx={{ minHeight: "80vh" }}>
				{children}
			</Grid>
			<Grid className="tw:mt-auto">
				<Footer />
			</Grid>
		</Grid>
	);
}
