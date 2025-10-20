"use client";
import { createContext, useContext, useRef } from "react";

import { type StoreApi, useStore as useZustandStore } from "zustand";

type StoreProviderProps<StoreStateT, StoreT extends StoreStateT> = {
	children: React.ReactNode;
	initState?: StoreStateT;
	initStore?: StoreApi<StoreT>;
	name?: string;
};

function getStoreProvider<StoreStateT, StoreT extends StoreStateT>(
	createStore: (initState?: StoreStateT, name?: string) => StoreApi<StoreT>,
): [
	(props: StoreProviderProps<StoreStateT, StoreT>) => React.ReactNode,
	<U extends StoreT>(selector?: (state: StoreT) => U) => U,
] {
	const StoreContext = createContext<StoreApi<StoreT> | undefined>(undefined);

	const StoreProvider = ({
		children,
		initState,
		initStore,
		name,
	}: StoreProviderProps<StoreStateT, StoreT>) => {
		const storeRef = useRef<StoreApi<StoreT> | undefined>(initStore);
		if (storeRef.current === undefined) {
			storeRef.current = createStore(initState, name);
		}

		return (
			<StoreContext.Provider value={storeRef.current}>
				{children}
			</StoreContext.Provider>
		);
	};

	const useStore = <U extends StoreT>(selector?: (state: StoreT) => U): U => {
		const context = useContext(StoreContext);
		if (!context) {
			throw new Error(
				"useStore must be used within the corresponding StoreProvider",
			);
		}
		return useZustandStore(context, selector ?? ((state) => state as U));
	};

	return [StoreProvider, useStore];
}

export { getStoreProvider };
