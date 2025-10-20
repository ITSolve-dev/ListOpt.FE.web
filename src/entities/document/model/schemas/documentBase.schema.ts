import { z } from "zod";
import { DocumentSpecSchema, FileUploadSchema } from "@/types/generalSchema";

export const DocumentBaseSchema = z.object({
	id: z.coerce.string().regex(/^\d+$/),
	type: DocumentSpecSchema,
	file: FileUploadSchema,
});

export type DocumentSchemaType = z.infer<typeof DocumentBaseSchema>;
