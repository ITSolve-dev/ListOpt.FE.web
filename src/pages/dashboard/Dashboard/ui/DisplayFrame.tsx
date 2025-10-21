import { Box } from "@mui/material";

type DisplayFrameProps = {
	children: React.ReactNode;
};

export function DisplayFrame({ children }: DisplayFrameProps) {
	return (
		<Box
			sx={{
				width: "100%",
				height: "100%",
				padding: "20px",
				border: "solid",
				borderRadius: "10px",
				borderWidth: 2,
				borderColor: "rgba(0,0,0,0.12)",
			}}
		>
			{children}
		</Box>
	);
}
