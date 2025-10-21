import { z } from "zod";
import { FileUploadSchema } from "@/types/generalSchema";

import { CompanyRequisitesSchema } from "./requisite.schema";

export const CompanyTaxationSchema = z.enum(
	["NDS", "NON_NDS", "OSNO", "USN", "ESHN", "PSN", "NPD", "AUSN"],
	{
		message: "fields.taxation.errors.required",
	},
);

export const CompanyInfoSchema = z.object({
	taxation: CompanyTaxationSchema,
	minOrder: z.coerce
		.number({ required_error: "fields.minOrder.errors.required" })
		.min(0, "fields.minOrder.errors.required"),
	terms: z.string(),
	photo: FileUploadSchema.optional().or(z.null()),
	description: z
		.string({
			required_error: "fields.description.errors.required",
		})
		.min(1, "fields.description.errors.required")
		.default(""),
	requisites: CompanyRequisitesSchema,
});

export type CompanyInfoType = z.infer<typeof CompanyInfoSchema>;

export type CompanyTaxationType = z.infer<typeof CompanyTaxationSchema>;
