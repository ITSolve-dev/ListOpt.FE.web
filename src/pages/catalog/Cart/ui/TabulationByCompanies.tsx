"use client";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { type SyntheticEvent, useState } from "react";
import { useCartStore } from "@/entities/cart";
import { CartList } from "./CartList";

export const TabulationByCompanies = () => {
	const { getCompanies, cart, selectCompany } = useCartStore();
	const [value, setValue] = useState<number | undefined>(getCompanies()[0]);

	const handleChange = (_: SyntheticEvent, newValue: string) => {
		setValue(Number(newValue));
		selectCompany(Number(newValue));
	};

	return (
		value && (
			<TabContext value={value.toString()}>
				<TabList
					variant="scrollable"
					scrollButtons
					allowScrollButtonsMobile
					onChange={handleChange}
					aria-label="company-tabs"
				>
					{getCompanies().map((companyId) => (
						<Tab
							key={companyId}
							label={companyId}
							value={companyId.toString()}
						/>
					))}
				</TabList>
				{cart &&
					getCompanies().map((companyId) => (
						<TabPanel key={companyId} value={companyId.toString()}>
							<CartList
								products={cart.products.filter(
									(product) => product.product.companyId === companyId,
								)}
							/>
						</TabPanel>
					))}
			</TabContext>
		)
	);
};
