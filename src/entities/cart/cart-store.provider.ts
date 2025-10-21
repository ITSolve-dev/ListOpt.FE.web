"use client";

import { getStoreProvider } from "@/shared/lib/store.helpers";
import {
	type cartStore,
	type cartStoreState,
	createCartStore,
} from "./cart.store";

const [CartStoreProvider, useCartStore] = getStoreProvider<
	cartStoreState,
	cartStore
>(createCartStore);

export { CartStoreProvider, useCartStore };
