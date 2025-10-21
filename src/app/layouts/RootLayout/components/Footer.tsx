import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import {
	Box,
	Container,
	Grid2 as Grid,
	Stack,
	Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";

import { Logo } from "@/shared/ui/Logo";

export function Footer() {
	const t = useTranslations("general.footer");
	return (
		<Box className="tw:md:pb-18 tw:bg-black tw:text-white tw:pb-10 tw:pt-11 tw:md:pt-16 md:tw:pb-36 md:tw:pt-24">
			<Container>
				<Grid container spacing={{ md: 12, sm: 6, xs: 3 }}>
					<Grid size={{ sm: 3, xs: 12 }}>
						<Stack
							spacing={{ sm: 5, xs: 2 }}
							direction={{ sm: "column", xs: "row" }}
						>
							<Logo dark />
							<Stack direction="row" spacing={{ sm: 4, xs: 2 }}>
								<InstagramIcon fontSize="large" className="tw:fill-white" />
								<TelegramIcon fontSize="large" className="tw:fill-white" />
							</Stack>
						</Stack>
					</Grid>
					<Grid size={{ sm: 3, xs: 6 }}>
						<Stack spacing={2}>
							<Typography variant="h6" className="tw:mb-1 tw:md:mb-3">
								{t("forPartners.label")}
							</Typography>
							<Typography variant="subtitle1">
								{t("forPartners.links.catalog")}
							</Typography>
							<Typography variant="subtitle1">
								{t("forPartners.links.forSuppliers")}
							</Typography>
							<Typography variant="subtitle1">
								{t("forPartners.links.forCustomers")}
							</Typography>
							<Typography variant="subtitle1">
								{t("forPartners.links.forCarriers")}
							</Typography>
							<Typography variant="subtitle1">
								{t("forPartners.links.terms")}
							</Typography>
						</Stack>
					</Grid>
					<Grid size={{ md: 3, xs: 6 }}>
						<Stack spacing={2}>
							<Typography variant="h6" className="tw:mb-1 tw:md:mb-3">
								{t("aboutCompany.label")}
							</Typography>
							<Typography variant="subtitle1">
								{t("aboutCompany.links.aboutUs")}
							</Typography>
							<Typography variant="subtitle1">
								{t("aboutCompany.links.blog")}
							</Typography>
							<Typography variant="subtitle1">
								{t("aboutCompany.links.contacts")}
							</Typography>
						</Stack>
					</Grid>
					<Grid size={{ md: 3, xs: 12 }}>
						<Stack spacing={{ sm: 4, xs: 2 }}>
							<Stack spacing={1}>
								<Typography variant="caption" color="gray">
									{t("contacts.phone")}
								</Typography>
								<Typography variant="h5">+7 (495) 125-10-07</Typography>
							</Stack>
							<Stack spacing={1}>
								<Typography variant="caption" color="gray">
									{t("contacts.email")}
								</Typography>
							</Stack>
						</Stack>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}
