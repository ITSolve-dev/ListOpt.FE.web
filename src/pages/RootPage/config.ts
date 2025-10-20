import type { StaticImageData } from "next/image";
import CustomerImage from "@/images/customer.webp";
import FactoryImage from "@/images/factory.webp";
import LogisticsImage from "@/images/logistics.webp";
import PortalImage from "@/images/portal.webp";
import SellerImage from "@/images/seller.webp";

type SchemaType = "default" | "ListOpt";

type SchemaStepType = {
	id: number;
	imageSrc: StaticImageData;
	title: string;
	text: string;
};

const schemaStepsConfig: Record<SchemaType, SchemaStepType[]> = {
	default: [
		{
			id: 1,
			imageSrc: FactoryImage,
			title: "Производитель",
			text: "100 BYN",
		},
		{
			id: 2,
			imageSrc: LogisticsImage,
			title: "Логистика",
			text: "+ 10%",
		},
		{
			id: 3,
			imageSrc: SellerImage,
			title: "Дилер",
			text: "+ 30-70%",
		},
		{
			id: 4,
			imageSrc: CustomerImage,
			title: "Покупатель",
			text: "=140-170 BYN",
		},
	],
	ListOpt: [
		{
			id: 1,
			imageSrc: FactoryImage,
			title: "Производитель",
			text: "100 BYN",
		},
		{
			id: 2,
			imageSrc: LogisticsImage,
			title: "Логистика",
			text: "+ 10%",
		},
		{
			id: 3,
			imageSrc: PortalImage,
			title: "ListOpt",
			text: "+ 1-3%",
		},
		{
			id: 4,
			imageSrc: CustomerImage,
			title: "Покупатель",
			text: "=140-170 BYN",
		},
	],
};

type CategoryLinkType = {
	id: number;
	title: string;
	href: string;
};

const categoryLinksConfig: CategoryLinkType[] = [
	{
		id: 1,
		title: "ПРОДУКТЫ ПИТАНИЯ",
		href: "/catalog",
	},
	{
		id: 2,
		title: "МЕБЕЛЬ",
		href: "/catalog",
	},
	{
		id: 3,
		title: "ОДЕЖДА",
		href: "/catalog",
	},
	{
		id: 4,
		title: "СТРОЙМАТЕРИАЛЫ",
		href: "/catalog",
	},
	{
		id: 5,
		title: "КОСМЕТИКА",
		href: "/catalog",
	},
	{
		id: 6,
		title: "АВТОТОВАРЫ",
		href: "/catalog",
	},
];

export { categoryLinksConfig, schemaStepsConfig };
