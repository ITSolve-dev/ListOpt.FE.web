import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Container, IconButton, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { type CategoryNameType, DEFAULT_CATEGORY } from "@/entities/category";
import { MainCreateProductForm } from "@/features/catalog/CreateProduct";

type CreateProductPageProps = {
	category?: CategoryNameType;
};

export async function CreateProductPage({
	category = DEFAULT_CATEGORY,
}: CreateProductPageProps) {
	const t = await getTranslations();
	return (
		<Container>
			<Stack direction="column" spacing={5} pb={15}>
				<Stack direction="row" alignItems="center" spacing={2}>
					<Link href="/catalog">
						<IconButton>
							<ArrowBackIcon />
						</IconButton>
					</Link>
					<Typography variant="h5">
						{t("pages.products.create.title")}
					</Typography>
				</Stack>
				<MainCreateProductForm category={category} />
			</Stack>
		</Container>
	);
}
