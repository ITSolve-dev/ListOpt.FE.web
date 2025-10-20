import { z } from "zod";

export const CountrySchema = z.enum(["RU", "KZ", "BY", "ARM", "KG"]);

export type CountrySchemaType = z.infer<typeof CountrySchema>;
