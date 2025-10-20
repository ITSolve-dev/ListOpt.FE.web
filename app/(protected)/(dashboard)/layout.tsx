import type { PropsWithChildren } from "react";
import { DashboardLayout } from "@/app/layouts/DashboardLayout";

export default async function Layout({ children }: PropsWithChildren) {
	return <DashboardLayout>{children}</DashboardLayout>;
}
