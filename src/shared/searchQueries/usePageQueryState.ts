import { parseAsInteger, useQueryState } from "nuqs";

export const usePageQueryState = () =>
	useQueryState("page", parseAsInteger.withDefault(1));
