"use client";
import { parseAsInteger, useQueryState } from "nuqs";
import type { PropsWithChildren } from "react";
import { PaginationListStoreProvider } from "@/features/catalog/PaginatedList";

export const ProductExplorerPageProvider = ({
	children,
}: PropsWithChildren): React.ReactNode => {
	const [perPage] = useQueryState("count", parseAsInteger.withDefault(10));
	const [page] = useQueryState("page", parseAsInteger.withDefault(1));
	return (
		<PaginationListStoreProvider
			initState={{
				showPerPage: perPage,
				page,
			}}
		>
			{children}
		</PaginationListStoreProvider>
	);
};
