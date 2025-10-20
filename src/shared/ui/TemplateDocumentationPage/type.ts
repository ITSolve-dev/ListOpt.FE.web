type Blocks = {
	show_before: boolean;
	items: Item[];
};

type Item = {
	label: string;
	content: string;
};

export type Section = {
	id: string;
	label: string;
	content: string;
	blocks?: Blocks;
};

export type Question = {
	id: number;
	question: string;
	answer: string;
};

export type NavigationProps = {
	sections: Section[];
	page: string;
};

export type DocumentationWrapperProps = {
	sections: Section[];
	page: string;
};
