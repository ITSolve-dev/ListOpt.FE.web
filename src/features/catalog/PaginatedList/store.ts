import { createStore } from "zustand";

import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type paginationListStoreState = {
	page: number;
	showPerPage: number;
};

export type paginationListStoreActions = {
	setPage: (page: number) => void;
	setShowPerPage: (page: number) => void;
};

export type paginationListStore = paginationListStoreState &
	paginationListStoreActions;

export const defaultInitState: paginationListStoreState = {
	page: 1,
	showPerPage: 10,
};

export const createPaginationListStore = (
	initState: paginationListStoreState = defaultInitState,
	name: string = "paginationListStore",
) =>
	createStore<paginationListStore>()(
		devtools(
			immer((set) => ({
				...initState,
				setPage: (page: number) =>
					set({
						page,
					}),
				setShowPerPage: (showPerPage: number) =>
					set({
						showPerPage,
					}),
			})),
			{ name },
		),
	);
