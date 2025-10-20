import {
	DesktopServerView,
	MobileServerView,
} from "@/shared/lib/device-detect";
import { DesktopNavigationMenu } from "./Desktop";
import { MobileNavigationMenu } from "./Mobile";

export async function NavigationMenu() {
	return (
		<>
			<MobileServerView>
				<MobileNavigationMenu />
			</MobileServerView>
			<DesktopServerView>
				<DesktopNavigationMenu />
			</DesktopServerView>
		</>
	);
}
