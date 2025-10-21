"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Divider,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { resolveKey } from "@/shared/lib/intl.helpers";
import type { NavigationProps } from "../../type";
import { PartnerAlert } from "../PartnerAlert/PartnerAlert";

export const DocumentationAccordion = ({ sections, page }: NavigationProps) => {
	const [expandedId, setExpandedId] = useState<string | null>(null);
	const t = useTranslations();

	const handleAccordionToggle = (id: string) => {
		setExpandedId((prev) => (prev === id ? null : id));
	};

	return (
		<Box>
			<PartnerAlert page={page} />
			<Typography my={3} textAlign="center" variant="h4" gutterBottom>
				{t(resolveKey(`pages.${page}.navTitle`) ?? "apiErrors.unknown")}
			</Typography>
			<Box>
				{sections.map((section) => (
					<Accordion
						key={section.id}
						expanded={expandedId === section.id}
						onChange={() => handleAccordionToggle(section.id)}
						disableGutters
						sx={{
							boxShadow: "none",
							border: "none",
							"&::before": {
								display: "none",
							},
						}}
						id={section.id}
					>
						<Link href={`#${section.id}`} scroll={false} passHref>
							<AccordionSummary
								sx={{
									backgroundColor:
										expandedId === section.id
											? "neutralBackground"
											: "transparent",
									borderRadius: 1,
									transition: "background-color 0.3s",
									textDecoration: "none",
								}}
								expandIcon={<ExpandMoreIcon />}
							>
								<Typography>
									{t(
										resolveKey(`pages.${page}.${section.label}`) ??
											"apiErrors.unknown",
									)}
								</Typography>
							</AccordionSummary>
						</Link>
						<AccordionDetails>
							{section.blocks?.show_before && (
								<Typography variant="body1" my={3} align="left">
									{t(
										resolveKey(`pages.${page}.${section.content}`) ??
											"apiErrors.unknown",
									)}
								</Typography>
							)}
							{section.blocks && (
								<Paper
									variant="outlined"
									sx={{
										borderRadius: 1,
										borderWidth: 2,
										borderColor: "neutralBorder",
										overflow: "hidden",
									}}
								>
									<Stack
										divider={
											<Divider
												sx={{
													borderColor: "neutralBorder",
													width: "95%",
													margin: "auto",
													borderWidth: 1,
												}}
											/>
										}
									>
										{section.blocks.items.map((item) => (
											<Box key={item.label} p={2}>
												<Typography
													variant="h6"
													fontWeight="medium"
													gutterBottom
												>
													{t(
														resolveKey(`pages.${page}.${item.label}`) ??
															"apiErrors.unknown",
													)}
												</Typography>
												<Typography variant="body1" align="left">
													{t(
														resolveKey(`pages.${page}.${item.content}`) ??
															"apiErrors.unknown",
													)}
												</Typography>
											</Box>
										))}
									</Stack>
								</Paper>
							)}
							{!section.blocks?.show_before && (
								<Typography variant="body1" my={3} align="left">
									{t(
										resolveKey(`pages.${page}.${section.content}`) ??
											"apiErrors.unknown",
									)}
								</Typography>
							)}
						</AccordionDetails>
					</Accordion>
				))}
			</Box>
		</Box>
	);
};
