import { DEFAULT_CATEGORY, isValidCategory } from "@/entities/category";
import { CreateProductPage } from "@/pages/catalog/CreateProduct";

type CatalogProductExplorerLayoutProps = {
	searchParams: Promise<{ category: string }>;
};

export default async function CreateProduct({
	searchParams,
}: CatalogProductExplorerLayoutProps) {
	const { category } = await searchParams;
	return (
		<CreateProductPage
			category={isValidCategory(category) ? category : DEFAULT_CATEGORY}
		/>
	);
}
