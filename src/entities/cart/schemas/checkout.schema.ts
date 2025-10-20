import { z } from "zod";

export const CheckoutSchema = z.object({
	totalPrice: z.number().min(0).default(0),
	totalCount: z.number().min(0).default(0),
	totalWeight: z.number().min(0).default(0),
});

export type Checkout = z.infer<typeof CheckoutSchema>;
