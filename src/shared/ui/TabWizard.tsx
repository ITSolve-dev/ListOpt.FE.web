"use client";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import type { TabProps } from "@mui/material/Tab";
import Tab from "@mui/material/Tab";
import { nanoid } from "nanoid";
import { Children, useMemo, useState } from "react";

type TabWizardProps = {
	children: React.ReactNode;
	labels: React.ReactNode[];
	tabProps?: TabProps[];
};

export function TabWizard({ children, labels, tabProps }: TabWizardProps) {
	const [value, setValue] = useState("1");

	const handleChange = (_: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	const keyMap = useMemo(() => {
		const map: Record<number, string> = {};
		labels.forEach((_, index) => {
			map[index] = nanoid();
		});
		return map;
	}, [labels]);

	return (
		<TabContext value={value}>
			<TabList onChange={handleChange} aria-label="lab API tabs example">
				{Object.keys(keyMap).map((_, index) => (
					<Tab
						key={keyMap[index]}
						label={labels[index]}
						value={String(index + 1)}
						{...(tabProps?.[index] || {})}
					/>
				))}
			</TabList>
			{Children.map(children, (child, index) => (
				<TabPanel key={keyMap[index]} value={String(index + 1)}>
					{child}
				</TabPanel>
			))}
		</TabContext>
	);
}
