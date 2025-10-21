import { z } from "zod";

const DETAILS_ERROR_PATH = "features.forms.companyRequisites.fields";

const requiredString = z
	.string({ required_error: `${DETAILS_ERROR_PATH}.common.required` })
	.min(1, `${DETAILS_ERROR_PATH}.common.required`);

const location = (field: string) =>
	z
		.string({ required_error: `${DETAILS_ERROR_PATH}.${field}.required` })
		.min(5, `${DETAILS_ERROR_PATH}.${field}.minLength`)
		.max(150, `${DETAILS_ERROR_PATH}.${field}.maxLength`);

export const CompanyRequisitesSchema = z.object({
	unp: requiredString.regex(/^\d{9}$/, `${DETAILS_ERROR_PATH}.unp`),
	okpo: requiredString.regex(/^\d{8}$|^\d{10}$/, `${DETAILS_ERROR_PATH}.okpo`),
	currentAccount: requiredString.regex(
		/^BY\d{26}$/,
		`${DETAILS_ERROR_PATH}.currentAccount`,
	),
	bic: requiredString.max(8, `${DETAILS_ERROR_PATH}.bic`).toUpperCase(),
	legalAddress: location("legalAddress"),
	postAddress: location("postAddress"),
	cbu: requiredString.regex(/^\d{3}\s+.{1,50}$/, `${DETAILS_ERROR_PATH}.cbu`),
	bankLocation: location("bankLocation"),
});

export type CompanyRequisitesType = z.infer<typeof CompanyRequisitesSchema>;
