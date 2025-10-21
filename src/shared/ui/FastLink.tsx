import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import {
	Stack,
	type SvgIconProps,
	Typography,
	type TypographyProps,
} from "@mui/material";
import Link, { type LinkProps } from "next/link";
import type { PropsWithChildren } from "react";

type LinkVariantType = "filled" | "simple";

type FastLinkProps = PropsWithChildren & {
	variantText?: TypographyProps["variant"];
	variant?: LinkVariantType;
	fontSize?: number;
	spacing?: number;
	iconColor?: SvgIconProps["color"];
	className?: string;
};

/**
 * Renders a customizable link component with an icon and text.
 * @param {string} href - The destination URL for the link.
 * @example <FastLink href="/about" variant="h6" fontSize={18} iconColor="secondary">
  About Us
</FastLink>
 */
export function FastLink({
	href,
	children,
	variantText = "subtitle1",
	fontSize = 20,
	spacing = 4,
	iconColor = "primary",
	variant = "simple",
	className,
	...rest
}: FastLinkProps & LinkProps) {
	return (
		<Link href={href} {...rest}>
			<Stack
				direction="row"
				spacing={spacing}
				alignItems="center"
				className="tw:rounded-xl tw:bg-[#F9F9F9] tw:px-9 tw:py-5"
			>
				<Typography
					className="tw:mr-auto!"
					variant={variantText}
					fontSize={fontSize}
				>
					{children}
				</Typography>
				<ExpandCircleDownIcon
					fontSize="large"
					className="tw:-rotate-90"
					color={iconColor}
				/>
			</Stack>
		</Link>
	);
}
