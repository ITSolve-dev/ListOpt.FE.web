import type { DocumentSpecType } from "@/types/generalSchema";
import type { CountrySchemaType } from "../schemas/country";
import type { DocumentStatusType } from "../schemas/documentStatus.schema";

export type CommonDocument = {
	id: number;
	type: DocumentSpecType;
	status: DocumentStatusType;
};

export type DeliveryDocument = CommonDocument & {
	type: "DELIVERY_DOCUMENTS";
	country: CountrySchemaType;
};

export type Document = CommonDocument & {
	date: Date | null;
};
