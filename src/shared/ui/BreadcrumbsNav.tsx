"use client";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Breadcrumbs, type BreadcrumbsProps, Typography } from "@mui/material";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { type CSSProperties, type Key, useCallback, useMemo } from "react";
import {
	resolveKey,
	type ValidTranslationKey,
} from "@/shared/lib/intl.helpers";

export type BreadcrumbsNavProps = {
	skipRoot?: boolean;
	Link?: typeof NextLink;
	segmentSx?: CSSProperties;
	renderLastSegment?: (title: string, key: Key) => React.ReactNode;
	customTranslations?:
		| Record<string, ValidTranslationKey>
		| Array<ValidTranslationKey>;
	defaultErrorKey?: ValidTranslationKey;
} & BreadcrumbsProps;

export const BreadcrumbsNav = ({
	skipRoot = false,
	Link = NextLink,
	separator = <ChevronRightIcon fontSize="small" />,
	segmentSx = {
		color: "black",
		textDecoration: "none",
		cursor: "pointer",
	},
	defaultErrorKey = "apiErrors.unknown",
	customTranslations,
	renderLastSegment,
	...rest
}: BreadcrumbsNavProps) => {
	const t = useTranslations();
	const pathname = usePathname();

	const pathSegments = useMemo(
		() => (pathname ? pathname.split("/").filter(Boolean) : []),
		[pathname],
	);

	const renderSegments = useCallback(
		() =>
			pathSegments.map((segment, index) => {
				const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
				const isLast = index === pathSegments.length - 1;
				let key = `pages.${segment}.title`;
				if (customTranslations) {
					if (Array.isArray(customTranslations)) {
						key = customTranslations[index] ?? key;
					} else {
						key = customTranslations[segment] ?? key;
					}
				}
				const title = t(resolveKey(key) ?? defaultErrorKey);

				if (isLast) {
					return (
						renderLastSegment?.(title, href) ?? (
							<Typography key={href} color="text.primary" title={title}>
								{title}
							</Typography>
						)
					);
				}

				return (
					<Link key={href} href={href} style={segmentSx} title={title}>
						{title}
					</Link>
				);
			}),
		[
			Link,
			customTranslations,
			defaultErrorKey,
			pathSegments,
			renderLastSegment,
			t,
			segmentSx,
		],
	);

	return (
		<Breadcrumbs separator={separator} aria-label="breadcrumb" {...rest}>
			{!skipRoot && (
				<Link href="/" style={segmentSx} title={t("pages.root.title")}>
					{t("pages.root.title")}
				</Link>
			)}
			{renderSegments()}
		</Breadcrumbs>
	);
};
