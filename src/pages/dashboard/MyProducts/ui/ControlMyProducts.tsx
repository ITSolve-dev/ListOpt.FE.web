"use client";
import AddIcon from "@mui/icons-material/Add";
import { Button, Grid2 as Grid, Tab, Tabs } from "@mui/material";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useStatusQueryState } from "../query/useStatusQueryState";
import type { ProductStatuses } from "../schemas";
import { CategorySelector } from "./CategorySelector";
import { Search } from "./Search";

const TAB_TEXTS = [
	"Все товары",
	"Активные",
	"На проверке",
	"Ошибки",
	"Архив",
] as const;

const TABS: Record<
	(typeof ProductStatuses)[number],
	(typeof TAB_TEXTS)[number]
> = {
	active: "Активные",
	all: "Все товары",
	archived: "Архив",
	error: "Ошибки",
	review: "На проверке",
} as const;

export const ControlMyProducts = () => {
	const t = useTranslations();
	const [status, setStatus] = useStatusQueryState();
	const [value, setValue] = useState<number>(TAB_TEXTS.indexOf(TABS[status]));

	const handleChange = async (_: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
		const newStatus = (Object.keys(TABS).find(
			(key) => TABS[key as keyof typeof TABS] === TAB_TEXTS[newValue],
		) ?? "all") as keyof typeof TABS;
		await setStatus(newStatus);
	};
	return (
		<Grid container rowSpacing={6} columnSpacing={4}>
			<Grid size={12}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="my-products-status-tabs"
					sx={{ borderBottom: 1, borderColor: "divider" }}
				>
					{TAB_TEXTS.map((tab) => (
						<Tab key={tab} label={tab} />
					))}
				</Tabs>
			</Grid>
			<Grid size="grow">
				<Search />
			</Grid>
			<Grid size={3}>
				<CategorySelector />
			</Grid>
			<Grid size="auto">
				<Link href="/product/create">
					<Button variant="contained" endIcon={<AddIcon />}>
						{t("pages.myProducts.createProductButton")}
					</Button>
				</Link>
			</Grid>
		</Grid>
	);
};
