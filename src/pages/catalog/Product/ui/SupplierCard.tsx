import PeopleIcon from "@mui/icons-material/People";
import StarIcon from "@mui/icons-material/Star";
import {
	Box,
	Button,
	Grid2 as Grid,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { CompanyType } from "@/entities/company";
import NoImage from "@/images/no-image.png";

type SupplierCardProps = {
	company: CompanyType;
};

export async function SupplierCard({ company }: SupplierCardProps) {
	const t = await getTranslations("pages.catalog.productDetailed.supplierCard");

	return (
		<Paper elevation={3}>
			<Grid container direction="row" spacing={2.5} p={2.5}>
				<Grid size={3}>
					<Image src={NoImage} alt={""} width={270} height={131} />
				</Grid>
				<Grid size={6}>
					<Stack spacing={4.375} alignItems="flex-start">
						<Box>
							<Typography variant="h5" color="text.primary">
								{company?.name}
							</Typography>
							<Typography>{company?.info?.description}</Typography>
						</Box>
						<Button
							sx={{ width: "50%" }}
							size="medium"
							variant="contained"
							color="primary"
						>
							{t("button")}
						</Button>
					</Stack>
				</Grid>
				<Grid size={3} spacing={3}>
					<Stack spacing={3} alignItems="flex-end">
						<Stack alignItems="flex-end">
							<Stack direction="row" spacing={1.875}>
								<StarIcon fontSize="medium" color="warning" />
								<Typography variant="body1" color="text.primary"></Typography>
							</Stack>
							<Typography variant="body1" color="text.primary">
								{t("supplierRating")}
							</Typography>
						</Stack>
						<Stack alignItems="flex-end">
							<Stack direction="row" spacing={1.875}>
								<PeopleIcon />
								<Typography variant="body1" color="text.primary"></Typography>
							</Stack>
							<Typography variant="body1" color="text.primary">
								{t("totalReviews")}
							</Typography>
						</Stack>
					</Stack>
				</Grid>
			</Grid>
		</Paper>
	);
}
