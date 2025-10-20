import { redirect } from "next/navigation";
import { LoginPage } from "@/pages/auth/Login";
import { isAuth } from "@/shared/lib/auth.helpers";
import { auth } from "@/shared/next-auth";

export default async function Page() {
	const session = await auth();
	if (isAuth(session)) {
		redirect("/dashboard");
	}

	return <LoginPage />;
}
