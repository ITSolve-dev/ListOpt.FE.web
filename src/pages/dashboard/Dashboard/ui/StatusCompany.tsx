import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
	Alert,
	AlertTitle,
	Box,
	Button,
	Grid2 as Grid,
	LinearProgress,
	Stack,
	Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";

export function StatusCompany() {
	const t = useTranslations("pages.dashboard");
	return (
		<Alert
			severity="error"
			variant="standard"
			sx={{
				"& .mui-zioonp-MuiAlert-message": {
					flexGrow: 1,
				},
			}}
		>
			<Grid container>
				<Grid size={9}>
					<Stack>
						<AlertTitle>{t("accountState.state")}</AlertTitle>
						<Typography>{t("accountState.description")}</Typography>
					</Stack>
				</Grid>

				<Grid size={3}>
					<Stack spacing={1}>
						<Button
							size="small"
							disableElevation
							className="tw:rounded-lg"
							variant="contained"
							endIcon={<ArrowForwardIcon />}
						>
							{t("accountState.button")}
						</Button>
						<Stack direction="row" alignItems="center" spacing={3}>
							<Box width="100%">
								<LinearProgress variant="determinate" value={50} />
							</Box>
							<Typography>50%</Typography>
						</Stack>
					</Stack>
				</Grid>
			</Grid>
		</Alert>
	);
}
