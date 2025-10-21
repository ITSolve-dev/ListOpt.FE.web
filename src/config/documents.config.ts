import type { DeliveryDocument, Document } from "@/entities/document";
import { CountrySchema, DocumentStatusSchema } from "@/entities/document";
import { DocumentSpecSchema } from "@/types/generalSchema";

export const documentsConfig: Document[] = [
	{
		id: 1,
		type: DocumentSpecSchema.Enum.CERT_REGISTRATION_LEGAL_ENTITY,
		status: DocumentStatusSchema.Enum.NOT_UPLOADED,
		date: new Date(),
	},
	{
		id: 2,
		type: DocumentSpecSchema.Enum.COMPANY_CHARTER,
		status: DocumentStatusSchema.Enum.UNDER_REVIEW,
		date: new Date(),
	},
	{
		id: 3,
		type: DocumentSpecSchema.Enum.ORDER_APPOINTMENT_LEADER,
		status: DocumentStatusSchema.Enum.UPLOADED,
		date: new Date(),
	},
	{
		id: 4,
		type: DocumentSpecSchema.Enum.ACT_BEHALF_LEADER,
		status: DocumentStatusSchema.Enum.ACTIVE,
		date: null,
	},
	{
		id: 5,
		type: DocumentSpecSchema.Enum.DECISION_APPOINTMENT_LEADER,
		status: DocumentStatusSchema.Enum.ACTIVE,
		date: null,
	},
];

export const deliveryDocumentsConfig: DeliveryDocument[] = [
	{
		id: 1,
		type: DocumentSpecSchema.Enum.DELIVERY_DOCUMENTS,
		country: CountrySchema.Enum.RU,
		status: DocumentStatusSchema.Enum.NOT_UPLOADED,
	},
	{
		id: 2,
		type: DocumentSpecSchema.Enum.DELIVERY_DOCUMENTS,
		country: CountrySchema.Enum.BY,
		status: DocumentStatusSchema.Enum.UNDER_REVIEW,
	},
	{
		id: 3,
		type: DocumentSpecSchema.Enum.DELIVERY_DOCUMENTS,
		country: CountrySchema.Enum.KZ,
		status: DocumentStatusSchema.Enum.UPLOADED,
	},
	{
		id: 4,
		type: DocumentSpecSchema.Enum.DELIVERY_DOCUMENTS,
		country: CountrySchema.Enum.ARM,
		status: DocumentStatusSchema.Enum.ACTIVE,
	},
	{
		id: 5,
		type: DocumentSpecSchema.Enum.DELIVERY_DOCUMENTS,
		country: CountrySchema.Enum.KG,
		status: DocumentStatusSchema.Enum.ACTIVE,
	},
];
