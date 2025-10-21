"use client";

import { getStoreProvider } from "@/shared/lib/store.helpers";
import {
	createUserStore,
	type userStore,
	type userStoreState,
} from "./user.store";

const [UserStoreProvider, useUserStore] = getStoreProvider<
	userStoreState,
	userStore
>(createUserStore);

export { UserStoreProvider, useUserStore };
