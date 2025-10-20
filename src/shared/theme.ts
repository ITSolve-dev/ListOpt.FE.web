"use client";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const _theme = createTheme({
	typography: {
		fontFamily: "var(--font-roboto), sans-serif",
	},
	palette: {
		primary: {
			main: "#CD0D0D",
		},
	},
	shape: {
		borderRadius: 10,
	},
	cssVariables: true,
});

export const theme = responsiveFontSizes(_theme);
