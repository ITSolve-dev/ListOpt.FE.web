import { createStore } from "zustand";

import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { UserType } from "../schemas/user.schema";

export type userStoreState = {
	user: Partial<UserType> | null;
};

export type userStoreActions = {
	updateInfo: (data: Partial<UserType>) => void;
};

export type userStore = userStoreState & userStoreActions;

export const defaultInitState: userStoreState = {
	user: null,
};

export const createUserStore = (
	initState: userStoreState = defaultInitState,
	name: string = "userStore",
) =>
	createStore<userStore>()(
		persist(
			devtools(
				immer((set) => ({
					...initState,
					updateInfo: (data: Partial<UserType>) =>
						set((state) => {
							state.user = {
								...state.user,
								...data,
							};
						}),
				})),
			),
			{ name },
		),
	);
