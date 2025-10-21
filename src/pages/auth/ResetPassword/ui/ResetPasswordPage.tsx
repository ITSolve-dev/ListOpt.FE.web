import { getTranslations } from "next-intl/server";
import { ResetPasswordFeature } from "@/features/auth/resetPassword";

export async function ResetPasswordPage() {
	const t = await getTranslations("general.resetPassword");
	return (
		<div className="tw:flex tw:flex-col tw:font-roboto">
			<div className="tw:flex tw:w-full tw:justify-around">
				<h1 className="tw:mt-5 tw:text-center tw:text-3xl tw:font-bold">
					{t("title")}
				</h1>
				<ResetPasswordFeature />
			</div>
		</div>
	);
}
