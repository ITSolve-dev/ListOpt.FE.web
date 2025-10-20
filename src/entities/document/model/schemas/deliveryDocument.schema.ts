import { z } from "zod";
import { DocumentSpecSchema } from "@/types/generalSchema";
import { CountrySchema } from "./country";
import { DocumentBaseSchema } from "./documentBase.schema";

export const DeliveryDocumentSchema = DocumentBaseSchema.omit({
	type: true,
}).extend({
	country: CountrySchema,
	type: z.literal(DocumentSpecSchema.Enum.DELIVERY_DOCUMENTS),
});

export type DeliveryDocumentType = z.infer<typeof DeliveryDocumentSchema>;
