"use client";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { config, contacts } from "../config";

export function MobileNavigationMenu() {
	const [open, setOpen] = useState(false);
	const bodyRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (!bodyRef.current) bodyRef.current = window.document.body;
		if (open) {
			bodyRef.current.style.overflow = "hidden";
		} else {
			bodyRef.current.style.overflow = "auto";
		}

		return () => {
			if (bodyRef.current) {
				bodyRef.current.style.overflow = "auto";
			}
		};
	}, [open]);

	const handleToggle = useCallback(() => setOpen((prev) => !prev), []);
	const handleClose = useCallback(() => setOpen(false), []);

	return (
		<>
			{open ? (
				<>
					<CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
					<Box
						sx={{
							position: "absolute",
							top: "3.5rem",
							right: 0,
							zIndex: 10,
							width: "100vw",
							height: "calc(100vh - 3.5rem)",
							backgroundColor: "white",
							overflow: "hidden",
						}}
					>
						<Container>
							<Stack
								spacing={2}
								sx={{
									mt: 5,
									textAlign: "center",
								}}
							>
								{config.map(({ id, href, title }) => (
									<Link key={id} href={href} passHref>
										<Typography
											onClick={handleClose}
											sx={{
												display: { sm: "inline" },
												fontSize: { sm: "1.25rem" },
												fontWeight: { sm: 500 },
												color: "grey.900",
												cursor: "pointer",
											}}
										>
											{title}
										</Typography>
									</Link>
								))}
							</Stack>

							<Stack
								spacing={1}
								sx={{
									mt: 7,
									textAlign: "center",
								}}
							>
								{contacts.map(({ title, value }) => (
									<Box key={title}>
										<Typography sx={{ color: "grey.700" }}>{title}</Typography>
										<Typography variant="h6">{value}</Typography>
									</Box>
								))}
							</Stack>
						</Container>
					</Box>
				</>
			) : (
				<MenuIcon onClick={handleToggle} sx={{ cursor: "pointer" }} />
			)}
		</>
	);
}
