import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
	Box,
	Container,
	Divider,
	Grid2 as Grid,
	Stack,
	Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Fragment } from "react";
import HandMobileImage from "@/images/hand-mobile.webp";
import MainPage1sectionWholesaleMarketing from "@/images/main_page_1_section_wholesale_marketing_img.webp";
import MainPage2sectionAboutProject1 from "@/images/main_page_2_section_about_project_1.webp";
import MainPage2sectionAboutProject2 from "@/images/main_page_2_section_about_project_2.webp";
import MainPage6sectionReason3kd from "@/images/main_page_6_section_reason_3kd.webp";
import ProductListImg from "@/images/ProductListImg.png";
import SupportImage from "@/images/support.webp";
import ThreeHandsImage from "@/images/three-hands.webp";
import {
	DesktopServerView,
	MobileServerView,
} from "@/shared/lib/device-detect";
import { FastLink } from "@/shared/ui/FastLink";
import { categoryLinksConfig, schemaStepsConfig } from "../config";

export async function RootPage() {
	const t = await getTranslations("pages.root");
	return (
		<Stack
			direction="column"
			spacing={7}
			className="tw:text-justify md:tw:text-left"
		>
			<section>
				<Box className="tw:bg-[#F9F9F9] tw:pb-7 tw:pt-12 md:tw:pb-10 md:tw:pt-14 xl:tw:pb-14 xl:tw:pt-16">
					<Container>
						<Stack
							direction={{ lg: "row", md: "column" }}
							alignItems="center"
							spacing={10}
						>
							<DesktopServerView>
								<Image
									placeholder="blur"
									quality={80}
									src={MainPage1sectionWholesaleMarketing}
									alt="alt1"
								/>
							</DesktopServerView>
							<Stack
								alignItems={{ xs: "center", md: "flex-start" }}
								spacing={{ md: 7, xs: 4 }}
								maxWidth={600}
							>
								<Typography
									className="tw:text-center md:tw:text-left"
									variant="h2"
									fontWeight={400}
								>
									{t("firstScreen.title")}
								</Typography>
								<MobileServerView>
									<Image src={MainPage2sectionAboutProject1} alt="alt1" />
								</MobileServerView>
								<Typography variant="body1" lineHeight={2}>
									{t("firstScreen.description")}
								</Typography>
								<FastLink href="/catalog">{t("firstScreen.button")}</FastLink>
							</Stack>
						</Stack>
					</Container>
				</Box>
			</section>
			<section>
				<Container>
					<Stack
						spacing={{ md: 7, xs: 4 }}
						alignItems={{ xs: "center", md: "flex-start" }}
						divider={<Divider orientation="horizontal" flexItem />}
					>
						<MobileServerView>
							<Typography textAlign="center" variant="h3" fontWeight={500}>
								{t("aboutProjectScreen.title")}
							</Typography>
						</MobileServerView>
						<DesktopServerView>
							<Stack
								width="100%"
								justifyContent="space-between"
								direction="row"
								alignItems="center"
							>
								<Typography variant="h3" fontWeight={500}>
									{t("aboutProjectScreen.title")}
								</Typography>
								<FastLink href="/about">
									{t("aboutProjectScreen.button")}
								</FastLink>
							</Stack>
						</DesktopServerView>
						<Container>
							<Stack
								direction={{ lg: "row", md: "column" }}
								alignItems="center"
								gap={{ xs: 3, md: 10 }}
							>
								<Image src={MainPage2sectionAboutProject1} alt="alt2" />
								<Typography variant="body1" lineHeight={2} maxWidth={550}>
									{t("aboutProjectScreen.description1")}
								</Typography>
							</Stack>
						</Container>
						<Container>
							<Stack
								direction={{ lg: "row", md: "column" }}
								alignItems="center"
								gap={{ xs: 3, md: 10 }}
							>
								<Image src={MainPage2sectionAboutProject2} alt="alt2" />
								<Typography variant="body1" lineHeight={2} maxWidth={550}>
									{t("aboutProjectScreen.description2")}
								</Typography>
							</Stack>
						</Container>
						<MobileServerView>
							<FastLink href="/about">
								{t("aboutProjectScreen.button")}
							</FastLink>
						</MobileServerView>
					</Stack>
				</Container>
			</section>
			<section>
				<Container>
					<Stack spacing={8}>
						<Stack spacing={3} alignItems="center">
							<Box className="tw:w-full tw:rounded-xl tw:bg-[#F9F9F9] tw:py-2 tw:text-center">
								<Typography variant="h4">
									{t("aboutProjectScreen.subTitle1")}
								</Typography>
							</Box>
							<Grid
								className="tw:w-full"
								alignItems="center"
								justifyContent="center"
								container
								spacing={1}
								columns={{ md: 31, sm: 16, xs: 7 }}
							>
								{schemaStepsConfig.default.map((item, index, array) => (
									<Fragment key={item.id}>
										<Grid size={{ xs: 7, sm: "auto" }}>
											<Box className="tw:rounded-xl tw:bg-[#F9F9F9] tw:px-5 tw:py-7">
												<Stack direction="row" spacing={3} alignItems="center">
													<Image src={item.imageSrc} alt={item.title} />
													<Stack gap={{ xs: 1, md: 0 }}>
														<Typography variant="h6">{item.title}</Typography>
														<Typography variant="subtitle1">
															{item.text}
														</Typography>
													</Stack>
												</Stack>
											</Box>
										</Grid>
										{index !== array.length - 1 && (
											<Grid size={1}>
												<KeyboardArrowDownIcon className="tw:-rotate-90" />
											</Grid>
										)}
									</Fragment>
								))}
							</Grid>
						</Stack>
						<Stack spacing={3} alignItems="center">
							<Box className="tw:w-full tw:rounded-xl tw:bg-[#F9F9F9] tw:py-2 tw:text-center">
								<Typography variant="h4">
									{t("aboutProjectScreen.subTitle2")}
								</Typography>
							</Box>
							<Grid
								className="tw:w-full"
								alignItems="center"
								justifyContent="center"
								container
								spacing={1}
								columns={{ md: 31, sm: 16, xs: 7 }}
							>
								{schemaStepsConfig.ListOpt.map((item, index, array) => (
									<Fragment key={item.id}>
										<Grid size={{ xs: 7, sm: "auto" }}>
											<Box className="tw:rounded-xl tw:bg-[#F9F9F9] tw:px-5 tw:py-7">
												<Stack direction="row" spacing={3} alignItems="center">
													<Image src={item.imageSrc} alt={item.title} />
													<Stack gap={{ xs: 1, md: 0 }}>
														<Typography variant="h6">{item.title}</Typography>
														<Typography variant="subtitle1">
															{item.text}
														</Typography>
													</Stack>
												</Stack>
											</Box>
										</Grid>
										{index !== array.length - 1 && (
											<Grid size={1}>
												<KeyboardArrowDownIcon className="tw:-rotate-90" />
											</Grid>
										)}
									</Fragment>
								))}
							</Grid>
						</Stack>
					</Stack>
				</Container>
			</section>
			<section>
				<Container>
					<Stack spacing={5}>
						<Typography textAlign={{ xs: "center", sm: "left" }} variant="h3">
							{t("ourAdvantages.title")}
						</Typography>
						<Stack direction={{ xs: "column", md: "row" }} spacing={5}>
							<Stack spacing={3}>
								<Divider />
								<Stack
									alignItems={{ xs: "center", md: "flex-start" }}
									direction={{ xs: "column", md: "row" }}
									spacing={4}
								>
									<Image
										className="tw:object-contain"
										src={ProductListImg}
										alt="ProductListImg"
									/>
									<Stack
										spacing={2}
										alignItems={{ xs: "center", md: "flex-start" }}
									>
										<Typography variant="h6">
											{t("ourAdvantages.cards.card1.title")}
										</Typography>
										<Typography variant="body1">
											{t("ourAdvantages.cards.card1.description")}
										</Typography>
									</Stack>
								</Stack>
								<Divider />
								<Stack
									alignItems={{ xs: "center", md: "flex-start" }}
									direction={{ xs: "column", md: "row" }}
									spacing={4}
								>
									<Image
										className="tw:object-contain"
										src={ThreeHandsImage}
										alt="ThreeHandsImage"
									/>
									<Stack
										spacing={2}
										alignItems={{ xs: "center", md: "flex-start" }}
									>
										<Typography variant="h6">
											{t("ourAdvantages.cards.card2.title")}
										</Typography>
										<Typography variant="body1">
											{t("ourAdvantages.cards.card2.description")}
										</Typography>
									</Stack>
								</Stack>
							</Stack>
							<Stack spacing={3}>
								<Divider />
								<Stack
									alignItems={{ xs: "center", md: "flex-start" }}
									direction={{ xs: "column", md: "row" }}
									spacing={4}
								>
									<Image
										className="tw:object-contain"
										src={HandMobileImage}
										alt="HandMobileImage"
									/>
									<Stack
										spacing={2}
										alignItems={{ xs: "center", md: "flex-start" }}
									>
										<Typography variant="h6">
											{t("ourAdvantages.cards.card3.title")}
										</Typography>
										<Typography variant="body1">
											{t("ourAdvantages.cards.card3.description")}
										</Typography>
									</Stack>
								</Stack>
								<Divider />
								<Stack
									alignItems={{ xs: "center", md: "flex-start" }}
									direction={{ xs: "column", md: "row" }}
									spacing={4}
								>
									<Image
										className="tw:object-contain"
										src={SupportImage}
										alt="SupportImage"
									/>
									<Stack
										spacing={2}
										alignItems={{ xs: "center", md: "flex-start" }}
									>
										<Typography variant="h6">
											{t("ourAdvantages.cards.card4.title")}
										</Typography>
										<Typography variant="body1">
											{t("ourAdvantages.cards.card4.description")}
										</Typography>
									</Stack>
								</Stack>
								<MobileServerView>
									<Divider />
								</MobileServerView>
							</Stack>
						</Stack>
					</Stack>
				</Container>
			</section>
			<section className="tw:mt-24 tw:mb-2 md:tw:mb-32">
				<Container>
					<MobileServerView>
						<Typography textAlign="center" mb={4} variant="h3">
							{t("productsCategories.title")}
						</Typography>
					</MobileServerView>
					<DesktopServerView>
						<Stack direction="row" justifyContent="space-between" mb={4}>
							<Typography textAlign="center" mb={4} variant="h3">
								{t("productsCategories.title")}
							</Typography>
							<FastLink href="/catalog" className="tw:mb-14">
								{t("productsCategories.button")}
							</FastLink>
						</Stack>
					</DesktopServerView>
					<Grid container spacing={5}>
						{categoryLinksConfig.map((link) => (
							<Grid key={link.id} size={{ md: 4, xs: 12 }}>
								<FastLink href={link.href} variant="filled">
									{link.title.toUpperCase()}
								</FastLink>
							</Grid>
						))}
					</Grid>
					<MobileServerView>
						<Link href="/catalog">
							<Stack
								direction="row"
								spacing={4}
								alignItems="center"
								justifyContent="center"
								className="tw:mt-7 group"
							>
								<Typography variant="subtitle1" fontSize={20}>
									{t("productsCategories.button")}
								</Typography>
								<ExpandCircleDownIcon
									fontSize="large"
									className="tw:-rotate-90"
									color="primary"
								/>
							</Stack>
						</Link>
					</MobileServerView>
				</Container>
			</section>
			<section>
				<Box className="tw:bg-[#F9F9F9] tw:pb-2 tw:pt-5 md:tw:pb-8 md:tw:pt-14 xl:tw:pb-14 xl:tw:pt-32">
					<Container>
						<Stack
							direction={{ lg: "row", md: "column" }}
							alignItems="center"
							spacing={10}
						>
							<DesktopServerView>
								<Image src={MainPage6sectionReason3kd} alt="alt6" />
							</DesktopServerView>
							<Stack
								alignItems={{ xs: "center", md: "flex-start" }}
								spacing={{ md: 7, xs: 1 }}
								maxWidth={600}
							>
								<Typography
									textAlign={{ xs: "center", md: "left" }}
									variant="h4"
									fontWeight={400}
								>
									{t("whyUs.title")}
								</Typography>
								<MobileServerView>
									<Image src={MainPage6sectionReason3kd} alt="alt6" />
								</MobileServerView>
								<Typography variant="body1" lineHeight={2}>
									{t("whyUs.description")}
								</Typography>
							</Stack>
						</Stack>
					</Container>
				</Box>
			</section>
		</Stack>
	);
}
