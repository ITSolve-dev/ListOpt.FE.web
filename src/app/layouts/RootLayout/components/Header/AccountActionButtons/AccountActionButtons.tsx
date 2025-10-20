import LockOpenIcon from "@mui/icons-material/LockOpen";
import LoginIcon from "@mui/icons-material/Login";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { isAuth } from "@/shared/lib/auth.helpers";
import { auth, signOut } from "@/shared/next-auth";

export async function AccountActionButtons() {
	const t = await getTranslations("general.header");
	const session = await auth();
	const authed = isAuth(session);

	return (
		<Stack direction="row" alignItems="center" spacing={{ sm: 1 }}>
			<Link href={authed ? "/dashboard" : "/login"}>
				<Stack direction="row" alignItems="center">
					<Typography variant="button" className="tw:hidden tw:md:block">
						{authed ? t("profile") : t("login")}
					</Typography>
					{authed ? <PersonOutlinedIcon /> : <LoginIcon />}
				</Stack>
			</Link>
			{authed && (
				<Button
					onClick={async () => {
						"use server";
						await signOut({ redirectTo: "/login" });
					}}
					variant="outlined"
					endIcon={<LockOpenIcon />}
					sx={{
						px: 2,
						py: 1,
					}}
				>
					<Typography variant="button">{t("logout")}</Typography>
				</Button>
			)}
		</Stack>
	);
}
