import { getDeviceInfo } from "./selector";

export async function DesktopServerView({
	children,
}: {
	children: React.ReactNode;
}) {
	const selectorsUserAgent = await getDeviceInfo();
	return selectorsUserAgent.isDesktop ? children : null;
}
