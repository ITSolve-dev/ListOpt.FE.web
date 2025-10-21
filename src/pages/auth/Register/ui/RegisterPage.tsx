import { Container, Stack, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import { RegisterFeature } from "@/features/auth/register";

export async function RegisterPage() {
	const t = await getTranslations("general.register");
	return (
		<Container>
			<Stack spacing={15} direction="row">
				<Typography variant="h4" className="tw:mt-5">
					{t("title")}
				</Typography>
				<RegisterFeature />
			</Stack>
		</Container>
	);
}
