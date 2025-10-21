"use client";

interface ProviderProps {
	children: React.ReactNode;
}

export const DashboardPageProvider = ({
	children,
}: ProviderProps): React.ReactNode => {
	return children;
};
