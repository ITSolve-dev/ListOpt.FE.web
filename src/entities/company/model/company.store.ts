import { createStore } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { CompanyShortType } from "../schemas/company.schema";
import type { CompanyInfoType } from "../schemas/companyInfo.schema";

export type companyStoreState = {
	company: Partial<CompanyShortType> | null;
	info: Partial<CompanyInfoType> | null;
};

export type companyStoreActions = {
	updateInfo: (data: Partial<CompanyInfoType>) => void;
};

export type companyStore = companyStoreState & companyStoreActions;

export const defaultInitState: companyStoreState = {
	company: null,
	info: null,
};

export const createCompanyStore = (
	initState: companyStoreState = defaultInitState,
	name: string = "companyStore",
) =>
	createStore<companyStore>()(
		persist(
			devtools(
				immer((set: (fn: (state: companyStore) => void) => void) => ({
					...initState,
					updateInfo: (data: Partial<CompanyInfoType>) =>
						set((state: companyStore) => {
							state.info = {
								...state.info,
								...data,
							};
						}),
				})),
			),
			{ name },
		),
	);
