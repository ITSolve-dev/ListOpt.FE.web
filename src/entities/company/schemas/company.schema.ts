import { z } from "zod";
import { CompanyInfoSchema } from "./companyInfo.schema";

export const CompanyStatus = z.enum(["NOT_VERIFIED", "REVIEW", "VERIFIED"]);

export const CompanyShortSchema = z.object({
	name: z.string(),
	status: CompanyStatus,
	id: z.coerce.string(),
	userId: z.coerce.string(),
});

export const CompanySchema = CompanyShortSchema.extend({
	info: CompanyInfoSchema.optional(),
});

export type CompanyShortType = z.infer<typeof CompanyShortSchema>;

export type CompanyStatusType = z.infer<typeof CompanyStatus>;

export type CompanyType = z.infer<typeof CompanySchema>;
