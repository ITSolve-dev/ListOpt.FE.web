interface PhoneCountry {
	value: string;
	label: string;
	countryCode: string;
	formatRegex: RegExp;
}

export const phoneRules = {
	RU: { prefix: "+7", min: 10, max: 10 },
	BY: { prefix: "+375", min: 9, max: 9 },
	AM: { prefix: "+374", min: 8, max: 8 },
	KZ: { prefix: "+7", min: 10, max: 10 },
	KG: { prefix: "+996", min: 9, max: 9 },
} as const;

const COUNTRY_CODES = {
	RU: "+7",
	BY: "+375",
	AM: "+374",
	KZ: "+7",
	KG: "+996",
};

const PHONE_FORMATS: Record<string, (raw: string) => string> = {
	"+7": (raw) => {
		let formatted = "";
		if (raw.length > 0) formatted += `(${raw.substring(0, 3)}`;
		if (raw.length > 3) formatted += `) ${raw.substring(3, 6)}`;
		if (raw.length > 6) formatted += `-${raw.substring(6, 8)}`;
		if (raw.length > 8) formatted += `-${raw.substring(8, 10)}`;
		return formatted;
	},
	"+375": (raw) => {
		let formatted = "";
		if (raw.length > 0) formatted += `(${raw.substring(0, 2)}`;
		if (raw.length > 2) formatted += `) ${raw.substring(2, 5)}`;
		if (raw.length > 5) formatted += `-${raw.substring(5, 7)}`;
		if (raw.length > 7) formatted += `-${raw.substring(7, 9)}`;
		return formatted;
	},
	"+374": (raw) => {
		let formatted = "";
		if (raw.length > 0) formatted += `(${raw.substring(0, 2)}`;
		if (raw.length > 2) formatted += `) ${raw.substring(2, 6)}`;
		if (raw.length > 6) formatted += `-${raw.substring(6, 8)}`;
		return formatted;
	},
	"+996": (raw) => {
		let formatted = "";
		if (raw.length > 0) formatted += `(${raw.substring(0, 3)}`;
		if (raw.length > 3) formatted += `) ${raw.substring(3, 6)}`;
		if (raw.length > 6) formatted += `-${raw.substring(6, 8)}`;
		if (raw.length > 8) formatted += `-${raw.substring(8, 10)}`;
		return formatted;
	},
};

const phoneCountries: PhoneCountry[] = [
	{
		value: "RU",
		label: "Россия",
		countryCode: COUNTRY_CODES.RU,
		formatRegex: /^\+7\d{1,10}$/,
	},
	{
		value: "BY",
		label: "Беларусь",
		countryCode: COUNTRY_CODES.BY,
		formatRegex: /^\+375\d{1,9}$/,
	},
	{
		value: "AM",
		label: "Армения",
		countryCode: COUNTRY_CODES.AM,
		formatRegex: /^\+374\d{1,8}$/,
	},
	{
		value: "KZ",
		label: "Казахстан",
		countryCode: COUNTRY_CODES.KZ,
		formatRegex: /^\+7\d{1,10}$/,
	},
	{
		value: "KG",
		label: "Кыргызстан",
		countryCode: COUNTRY_CODES.KG,
		formatRegex: /^\+996\d{1,9}$/,
	},
];

export { phoneCountries };

export const formatPhone = (value: string, countryCode: string) => {
	let raw = value.replace(/\D/g, ""); // Убираем все нецифровые символы

	// Если введенный номер уже содержит код страны, убираем его
	if (raw.startsWith(countryCode.replace("+", ""))) {
		raw = raw.slice(countryCode.length - 1);
	}

	return PHONE_FORMATS[countryCode]
		? `${countryCode} ${PHONE_FORMATS[countryCode](raw)}`
		: `${countryCode} ${raw}`;
};
