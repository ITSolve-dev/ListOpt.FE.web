import { getDeviceInfo } from "./selector";

export async function MobileServerView({
	children,
}: {
	children: React.ReactNode;
}) {
	const selectorsUserAgent = await getDeviceInfo();
	return selectorsUserAgent.isMobile ? children : null;
}
