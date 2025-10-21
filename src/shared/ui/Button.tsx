import {
	Button as MUIButton,
	type ButtonProps as MUIButtonProps,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/system";

interface ButtonProps extends MUIButtonProps {
	primary?: boolean;
	as?: "button" | "a";
	href?: string;
}

export const Button = ({
	primary,
	as = "button",
	href,
	children,
	...props
}: ButtonProps) => {
	const buttonStyles: SxProps<Theme> = primary
		? {
				width: "100%",
				height: "49px",
				py: "11px",
				backgroundColor: "primary.main",
				color: "white",
				borderRadius: "8px",
				"&:hover": {
					backgroundColor: "primary.dark",
				},
			}
		: {
				width: "100%",
				height: "49px",
				py: "11px",
				border: "1px solid",
				borderColor: "primary.main",
				color: "primary.main",
				textAlign: "center",
				borderRadius: "8px",
				"&:hover": {
					backgroundColor: "primary.main",
					color: "white",
				},
			};

	if (as === "a" && href) {
		return (
			<MUIButton component="a" href={href} sx={buttonStyles} {...props}>
				{children}
			</MUIButton>
		);
	}

	return (
		<MUIButton sx={buttonStyles} {...props}>
			{children}
		</MUIButton>
	);
};
