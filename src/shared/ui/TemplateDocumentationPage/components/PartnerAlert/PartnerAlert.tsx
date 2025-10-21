import { Alert, Link, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { resolveKey } from "@/shared/lib/intl.helpers";

type PartnerAlertProps = {
	page: string;
};

export const PartnerAlert = ({ page }: PartnerAlertProps) => {
	const t = useTranslations();
	return (
		<Alert severity="error" sx={{ mt: { xs: 0, sm: 4 } }}>
			<Typography fontWeight="medium">
				{t(resolveKey(`pages.${page}.alert.text}`) ?? "apiErrors.unknown")}
				<Link href="#" underline="always" color="primary" fontWeight="medium">
					{t(resolveKey(`pages.${page}.alert.link`) ?? "apiErrors.unknown")}
				</Link>
			</Typography>
		</Alert>
	);
};
