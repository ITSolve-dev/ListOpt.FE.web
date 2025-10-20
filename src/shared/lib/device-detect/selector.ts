import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";

import type { DeviceInfoType } from "./types";

export async function getDeviceInfo(): Promise<DeviceInfoType> {
	const userAgent = (await headers()).get("user-agent") || "";
	const result = getSelectorsByUserAgent(userAgent);
	return {
		isMobile: result.isMobile,
		isDesktop: result.isDesktop,
	};
}
