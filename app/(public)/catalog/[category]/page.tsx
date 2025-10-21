import { notFound } from "next/navigation";
import {
	CatalogExplorerPageSearchParamsSchema,
	type CatalogExplorerPageSearchParamsType,
	ProductExplorerPage,
} from "@/pages/catalog/ProductExplorer";

export default async function CatalogProductExplorerPage({
	searchParams,
}: {
	searchParams: Promise<CatalogExplorerPageSearchParamsType>;
}) {
	const params = await searchParams;
	const { success, data } =
		await CatalogExplorerPageSearchParamsSchema.safeParseAsync(params);
	if (!success) notFound();
	return <ProductExplorerPage {...data} />;
}
