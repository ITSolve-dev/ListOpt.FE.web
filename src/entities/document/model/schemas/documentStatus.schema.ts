import { z } from "zod";

export const DocumentStatusSchema = z.enum([
	"NOT_UPLOADED", // Не загружен
	"UPLOADED", // Загружен
	"UNDER_REVIEW", // На проверке
	"ACTIVE", // Действует
]);

export type DocumentStatusType = z.infer<typeof DocumentStatusSchema>;
