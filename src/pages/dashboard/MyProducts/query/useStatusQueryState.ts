import { parseAsStringEnum, useQueryState } from "nuqs";
import { ProductStatusSchema } from "../schemas";

export const useStatusQueryState = () =>
	useQueryState(
		"status",
		parseAsStringEnum(Object.values(ProductStatusSchema.Enum)).withDefault(
			"all",
		),
	);
