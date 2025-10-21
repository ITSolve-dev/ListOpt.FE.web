import { Container, Stack, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import { LoginFeature } from "@/features/auth/login";

export async function LoginPage() {
	const t = await getTranslations("general.login");
	return (
		<Container>
			<Stack spacing={2} mt={8} justifyContent="center" alignItems="center">
				<Typography variant="h4">{t("title")}</Typography>
				<LoginFeature />
			</Stack>
		</Container>
	);
}
