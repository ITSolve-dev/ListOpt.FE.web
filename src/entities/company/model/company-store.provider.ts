"use client";

import { getStoreProvider } from "@/shared/lib/store.helpers";
import {
	type companyStore,
	type companyStoreState,
	createCompanyStore,
} from "./company.store";

const [CompanyStoreProvider, useCompanyStore] = getStoreProvider<
	companyStoreState,
	companyStore
>(createCompanyStore);

export { CompanyStoreProvider, useCompanyStore };
