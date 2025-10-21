import { Box, Grid, Paper, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import { resolveKey } from "@/shared/lib/intl.helpers";
import type { Question } from "../../type";

type FAQProps = {
	faqItems: Question[];
	page: string;
};

export const FAQ = async ({ faqItems, page }: FAQProps) => {
	const t = await getTranslations();
	return (
		<Box
			sx={{
				mx: {
					xs: 2,
					sm: 14,
				},
			}}
			mb={10}
		>
			<Typography
				my={3}
				sx={{
					textAlign: { xs: "center", sm: "left" },
				}}
				variant="h4"
				gutterBottom
			>
				{t(resolveKey(`pages.${page}.faqTitle`) ?? "apiErrors.unknown")}
			</Typography>
			<Box mt={4}>
				<Paper
					variant="outlined"
					sx={{
						borderRadius: 1,
						borderWidth: 2,
						borderColor: "neutralBorder",
						overflow: "hidden",
					}}
				>
					<Grid container>
						{faqItems.map((item) => (
							<Grid item xs={12} sm={6} key={item.id}>
								<Box
									mx={2}
									sx={{
										borderBottom: {
											xs:
												item.id < faqItems.length
													? "2px solid neutralBorder"
													: "none",
											sm: "none",
										},
									}}
									pt={2}
								>
									<Box
										sx={{
											borderBottom: {
												xs: "none",
												sm: item.id < 1 ? "2px solid neutralBorder" : "none",
											},
											pb: 2,
										}}
									>
										<Typography
											sx={{
												alignItems: { xs: "center", sm: "flex-start" },
											}}
											variant="subtitle1"
											fontWeight="medium"
											gutterBottom
										>
											{t(
												resolveKey(`pages.${page}.${item.question}`) ??
													"apiErrors.unknown",
											)}
										</Typography>
										<Typography
											variant="body1"
											sx={{
												alignItems: { xs: "center", sm: "flex-start" },
											}}
										>
											{t(
												resolveKey(`pages.${page}.${item.answer}`) ??
													"apiErrors.unknown",
											)}
										</Typography>
									</Box>
								</Box>
							</Grid>
						))}
					</Grid>
				</Paper>
			</Box>
		</Box>
	);
};
