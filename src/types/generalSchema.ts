import type { FileWithPath } from "react-dropzone";
import { z } from "zod";

export const FileUploadSchema = z
	.custom<FileWithPath | undefined | null>()
	.refine(
		(file: FileWithPath | undefined | null) =>
			file && file.size <= 3 * 1024 * 1024,
		"errors.file.image.size",
	);

export const DocumentSpecSchema = z.enum([
	"DELIVERY_DOCUMENTS",
	"CERT_REGISTRATION_LEGAL_ENTITY",
	"COMPANY_CHARTER",
	"ORDER_APPOINTMENT_LEADER",
	"ACT_BEHALF_LEADER",
	"DECISION_APPOINTMENT_LEADER",
]);

export type DocumentSpecType = z.infer<typeof DocumentSpecSchema>;
