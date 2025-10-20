import { GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata, Viewport } from "next";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ToastContainer } from "react-toastify";
import { RootLayout as OverrideRootLayout } from "@/app/layouts";
import { roboto } from "@/shared/lib/fonts.config";
import { HydrationProvider, SWRProvider } from "@/shared/providers";
import { theme } from "@/shared/theme";

import "./globals.css";

export const viewport: Viewport = {
	minimumScale: 1,
	initialScale: 1,
	width: "device-width",
	userScalable: false,
	viewportFit: "cover",
};

export const metadata: Metadata = {
	title: "Eko Portal",
	description: "Marketplace",
	appleWebApp: {
		title: "ListOpt",
	},
	manifest: "/manifest.json",
	keywords: ["technology", "web application"],
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();
	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={roboto.variable}>
				<AppRouterCacheProvider options={{ enableCssLayer: true, key: "css" }}>
					<GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
					<ThemeProvider theme={theme}>
						<NextIntlClientProvider messages={messages}>
							<SWRProvider>
								<HydrationProvider>
									<SessionProvider>
										<NuqsAdapter>
											<OverrideRootLayout>{children}</OverrideRootLayout>
										</NuqsAdapter>
										<ToastContainer
											theme="colored"
											icon={false}
											closeButton={false}
											position="top-right"
											limit={3}
											newestOnTop={false}
										/>
									</SessionProvider>
								</HydrationProvider>
							</SWRProvider>
						</NextIntlClientProvider>
					</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
