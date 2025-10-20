import { ProductDetailedPage } from "@/pages/catalog/Product";

type ProductPageProps = {
	params: Promise<{ productId: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
	const { productId } = await params;
	return <ProductDetailedPage productId={parseInt(productId, 10)} />;
}
