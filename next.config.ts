import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
	requestConfig: "./i18n/request.ts",
	// experimental: {
	//   createMessagesDeclaration: './messages/ru.json',
	// },
});

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
	experimental: {
		reactCompiler: true,
	},
	output: "standalone",
	transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		localPatterns: [
			{
				pathname: "/public/images/**",
				search: "",
			},
		],
		// remotePatterns: [
		//   {
		//     protocol: 'https',
		//     hostname: 's3.list-opt.ru',
		//     port: '',
		//     pathname: '/products/**',
		//     search: '',
		//   },
		// ],
	},
	logging: {
		fetches: {
			fullUrl: true,
			hmrRefreshes: true,
		},
	},
};
let finalNextConfig = nextConfig;
finalNextConfig = bundleAnalyzer({
	enabled: true,
	openAnalyzer: false,
	analyzerMode: "static",
})(finalNextConfig);
finalNextConfig = withNextIntl(finalNextConfig);
export default finalNextConfig;
