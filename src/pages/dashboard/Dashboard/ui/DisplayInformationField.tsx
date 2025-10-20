import { Divider, Stack, Typography } from "@mui/material";

type DisplayInformationFieldProps = {
	children?: React.ReactNode;
	title: React.ReactNode;
	noDivider?: boolean;
	disableMargins?: boolean;
	height?: number | string;
};

export function DisplayInformationField({
	children,
	title,
	noDivider = false,
	disableMargins = false,
	height = 20,
}: DisplayInformationFieldProps) {
	return (
		<Stack sx={{ width: "100%" }}>
			<Stack
				gap={1}
				flexGrow={1}
				sx={!disableMargins ? { margin: "10px 30px" } : {}}
			>
				<Typography variant="subtitle2">{title}</Typography>
				<Typography variant="body2" sx={{ height }}>
					{children}
				</Typography>
			</Stack>
			{!noDivider && <Divider />}
		</Stack>
	);
}
