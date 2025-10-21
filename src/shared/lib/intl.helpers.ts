import messages from "messages/ru.json";
import type { FieldError } from "react-hook-form";

/**
 * Helper type for creating a dot-separated path string to a nested key in an object.
 * Example: Join<'home', 'title'> => 'home.title'
 */
type Join<K, P> = K extends string | number
	? P extends string | number
		? `${K}.${P}`
		: never
	: never;

/**
 * Recursively extracts all possible path strings (keys) from the messages object for i18n.
 * Example: { home: { title: "..." } } => "home.title"
 */
export type NamespacedTranslationKeys<T> = {
	[K in keyof T]: T[K] extends string | number | boolean
		? K extends string | number
			? `${K}`
			: never
		: K extends string | number
			? Join<K, NamespacedTranslationKeys<T[K]>>
			: never;
}[keyof T];
/**
 * Type representing all available translation keys in the application.
 * It is built based on the messages object loaded from ru.json.
 */
type AppMessages = typeof messages;

/**
 * All valid translation keys supported in ru.json.
 * These are strings like "home.title", "auth.login.label", etc.
 */
export type ValidTranslationKey = NamespacedTranslationKeys<AppMessages>;

/**
 * Function to get a value from the messages object using a dot-separated path string.
 *
 * @param key - dot notation string (e.g., "home.title")
 * @returns value at the specified path or undefined if the path is invalid
 */
export function resolvePath(key: string) {
	const parts = key.split(".");
	let result:
		| Record<string, object | string | Array<string | object>>
		| string = messages;

	for (const part of parts) {
		if (typeof result === "string") {
			// If we already reached a string, further traversal doesn't make sense
			return result;
		} else if (part in result) {
			// Go to the next level of the object
			result = result[part] as Record<string, object | string> | string;
		} else if (Array.isArray(result)) {
			// Handle case where an index is specified inside an array
			const index = Number(part);
			if (Number.isNaN(index)) return undefined;
			result = result[index];
		} else {
			return undefined;
		}
	}

	return result;
}

/**
 * Checks if the translation key exists and whether its value is a valid type (string, number, or boolean).
 *
 * @param key - dot notation string (e.g., "home.title")
 * @returns the key as a ValidTranslationKey type if valid, otherwise undefined
 */
export function resolveKey(
	key?: string | null | undefined,
): ValidTranslationKey | undefined {
	if (!key) return undefined;
	const value = resolvePath(key);

	if (typeof value === "string") {
		return key as ValidTranslationKey;
	}
}

type Translator = (key: ValidTranslationKey) => string;
const FALLBACK_TRANSLATE_KEY: ValidTranslationKey = "apiErrors.unknown";

export function translate(
	translator: Translator,
	key: string,
	fallbackKey: ValidTranslationKey,
): string;
export function translate(
	translator: Translator,
	key: ValidTranslationKey,
	fallbackKey?: ValidTranslationKey,
): string;
export function translate(
	translator: Translator,
	key?: string,
	fallbackKey?: ValidTranslationKey,
): string | undefined;
export function translate(
	translator: Translator,
	key?: string,
	fallbackKey?: ValidTranslationKey,
): string | undefined {
	if (!key) return undefined;
	const valid = resolveKey(key);
	if (!valid) {
		if (fallbackKey) return translator(fallbackKey);
		return undefined;
	}
	return translator(valid);
}

export function safeTranslate(
	translator: Translator,
	key?: string,
	fallbackKey: ValidTranslationKey = FALLBACK_TRANSLATE_KEY,
): string {
	if (!key) return translate(translator, fallbackKey);
	return translate(translator, key, fallbackKey);
}

export function translateFieldError(
	translator: Translator,
	error?: FieldError,
	fallbackKey?: ValidTranslationKey,
): string | undefined {
	return translate(translator, error?.message, fallbackKey);
}

export function safeTranslateFieldError(
	translator: Translator,
	error?: FieldError,
	fallbackKey: ValidTranslationKey = FALLBACK_TRANSLATE_KEY,
): string {
	if (!error || !error.message) return translate(translator, fallbackKey);
	return translate(translator, error.message, fallbackKey);
}
