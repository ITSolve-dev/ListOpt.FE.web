import { z } from "zod";
import { PositiveNumber } from "@/shared/schemas";

export const DimensionSchema = z.object({
	width: PositiveNumber(),
	height: PositiveNumber(),
	depth: PositiveNumber(),
	weight: PositiveNumber(),
});
export type DimensionType = z.infer<typeof DimensionSchema>;
