import { Box, type BoxProps, styled } from "@mui/material";

export type DashedBoxProps = {
	disabled?: boolean;
};

export const DashedBox = styled(Box)<BoxProps & DashedBoxProps>(
	({ theme, disabled }) => ({
		borderStyle: "dashed",
		borderWidth: 2,
		width: "100%",
		// width: 'fit-content',
		borderRadius: `${theme.shape.borderRadius}px`,
		backgroundColor: theme.palette.background.default,
		":hover": disabled
			? {}
			: {
					borderColor: theme.palette.primary.main,
				},
	}),
);
