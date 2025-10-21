import { Button, styled } from "@mui/material";

export const LinkButton = styled(Button)(({ theme }) => ({
	textDecoration: "underline",
	backgroundColor: "transparent",
	":hover": {
		textDecoration: "underline",
	},
	p: 0,
	color: theme.palette.primary.main,
}));
