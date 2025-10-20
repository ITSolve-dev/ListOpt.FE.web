import SearchIcon from "@mui/icons-material/Search";
import { Box, InputBase } from "@mui/material";
import { getTranslations } from "next-intl/server";
import { DesktopServerView } from "@/shared/lib/device-detect";

export async function Search() {
	const t = await getTranslations("features.search");
	return (
		<Box
			display="flex"
			justifyContent={{ xs: "center", sm: "space-between" }}
			alignItems="center"
			sx={{
				borderRadius: { sm: "8px" },
				borderWidth: { sm: "2px" },
				borderStyle: { sm: "solid" },
				borderColor: { sm: "primary.main" },
				width: "90%",
			}}
		>
			<DesktopServerView>
				<InputBase
					type="search"
					aria-label="search"
					data-testid="search-input"
					fullWidth
					placeholder={t("placeholder")}
					sx={{
						pl: { sm: 2 },
					}}
				/>
			</DesktopServerView>

			<Box
				sx={{
					position: "relative",
					right: 0,
					top: 0,
					cursor: "pointer",
					borderTopRightRadius: 0.5,
					borderBottomRightRadius: 0.5,
					backgroundColor: { sm: "primary.main" },
					px: { sm: 2.5 },
					py: { sm: 1.5 },
					color: { sm: "#fff" },
					"&:hover": {
						backgroundColor: "primary.dark",
					},
				}}
			>
				<SearchIcon />
			</Box>
		</Box>
	);
}
