import type { ValidTranslationKey } from "@/shared/lib/intl.helpers";

export const CATEGORIES = ["milk", "meat"] as const;

export const CATEGORY_TITLE_KEYS: Record<
	(typeof CATEGORIES)[number],
	ValidTranslationKey
> = {
	milk: "general.categories.milk.title",
	meat: "general.categories.meat.title",
} as const;

export const DEFAULT_CATEGORY = "milk";
