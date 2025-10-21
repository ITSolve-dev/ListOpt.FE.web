import { RoleName } from "@/entities/auth";

export const profileOptions: {
	value: RoleName;
	label: string;
	description: string;
}[] = [
	{
		value: RoleName.supplier,
		label: "general.register.profile.options.supplier",
		description: "general.register.profile.options.supplierDesc",
	},
	{
		value: RoleName.buyer,
		label: "general.register.profile.options.buyer",
		description: "general.register.profile.options.buyerDesc",
	},
];

export const countryOptions = [
	{ value: "RU", label: "general.register.country.options.RU" },
	{ value: "BY", label: "general.register.country.options.BY" },
	{ value: "AM", label: "general.register.country.options.AM" },
	{ value: "KZ", label: "general.register.country.options.KZ" },
	{ value: "KG", label: "general.register.country.options.KG" },
];

export const TEXT_FIELD_REGEX = /^[A-Za-zА-Яа-яЁё0-9]{2,50}$/;
export const EMAIL_FIELD_REGEX =
	/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
export const PHONE_FIELD_REGEX = /^\+?[0-9]+$/;
