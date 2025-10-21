import type { z } from "zod";
import { BaseFieldSchema } from "./BaseField.schema";

export const ProductMeasureFieldSchema = BaseFieldSchema;
export type ProductMeasureFieldType = z.infer<typeof ProductMeasureFieldSchema>;
