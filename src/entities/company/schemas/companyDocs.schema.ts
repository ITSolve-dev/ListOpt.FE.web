import { z } from "zod";
import { DocumentSpecSchema, FileUploadSchema } from "@/types/generalSchema";

export const DocumentsSchema = z.object({
	documentType: DocumentSpecSchema,
	file: FileUploadSchema,
});

export type DocumentsSchemaType = z.infer<typeof DocumentsSchema>;
