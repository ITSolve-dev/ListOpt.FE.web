export type NavigationMenuType = {
	id: number;
	title: string;
	href: string;
};

export type NavigationMenuContactsType = {
	id: number;
	title: string;
	value: string;
};

export const config: NavigationMenuType[] = [
	{
		id: 1,
		title: "Каталог",
		href: "/",
	},
	{
		id: 2,
		title: "Поставщикам",
		href: "/suppliers",
	},
	{
		id: 3,
		title: "Покупателям",
		href: "/customers",
	},
	{
		id: 4,
		title: "Перевозчикам",
		href: "/delivery",
	},
	{
		id: 5,
		title: "Условия",
		href: "/conditions",
	},
	{
		id: 6,
		title: "Блог",
		href: "/blog",
	},
	{
		id: 7,
		title: "О нас",
		href: "/about",
	},
	{
		id: 8,
		title: "Контакты",
		href: "/contact",
	},
];

export const contacts: NavigationMenuContactsType[] = [
	{
		id: 1,
		title: "Телефон (Беларусь)",
		value: "+375 (33) 000 - 00 - 00",
	},
	{
		id: 2,
		title: "Телефон (Россия)",
		value: "+7 (111) 111 - 11 - 11",
	},
];
