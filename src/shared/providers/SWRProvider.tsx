"use client";
import type { ReactNode } from "react";
import { SWRConfig } from "swr";

export const SWRProvider = ({ children }: { children: ReactNode }) => {
	return (
		<SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
	);
};
