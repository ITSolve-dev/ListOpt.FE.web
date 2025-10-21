import { z } from "zod";
import { PositiveNumber, StrMax100 } from "@/shared/schemas";

export const BaseFieldSchema = z.object({
	id: PositiveNumber(),
	name: StrMax100(),
	value: StrMax100(),
});
