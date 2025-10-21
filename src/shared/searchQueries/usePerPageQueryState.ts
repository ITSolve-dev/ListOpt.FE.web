import { parseAsInteger, useQueryState } from "nuqs";

export const usePerPageQueryState = () =>
	useQueryState("count", parseAsInteger.withDefault(10));
