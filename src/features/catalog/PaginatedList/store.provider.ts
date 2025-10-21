"use client";

import { getStoreProvider } from "@/shared/lib/store.helpers";
import {
	createPaginationListStore,
	type paginationListStore,
	type paginationListStoreState,
} from "./store";

const [PaginationListStoreProvider, usePaginationListStore] = getStoreProvider<
	paginationListStoreState,
	paginationListStore
>(createPaginationListStore);

export { PaginationListStoreProvider, usePaginationListStore };
