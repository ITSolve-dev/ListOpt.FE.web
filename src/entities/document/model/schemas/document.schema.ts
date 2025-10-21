import { z } from "zod";
import { DocumentBaseSchema } from "./documentBase.schema";

export const DocumentSchema = DocumentBaseSchema.extend({
	date: z.date().optional(),
});

export type DocumentSchemaType = z.infer<typeof DocumentSchema>;
