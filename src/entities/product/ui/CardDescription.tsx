import {
	Grid2 as Grid,
	type Grid2Props,
	List,
	ListItem,
	type ListItemProps,
	ListItemText,
	Stack,
	Typography,
} from "@mui/material";
import { useMemo } from "react";
import { useProductCardContext } from "./ProductCard";

export type CardDescriptionProps = {
	itemProps?: ListItemProps;
	maxColumns?: 1 | 2 | 3;
	limit?: number;
	grow?: boolean;
} & Grid2Props;

export const CardDescription = ({
	itemProps,
	maxColumns = 2,
	limit = 3,
	grow = false,
	spacing = { md: 4, xs: 2 },
	...gridProps
}: CardDescriptionProps) => {
	const {
		product: { fields },
	} = useProductCardContext();

	const columns = useMemo(
		() =>
			Math.ceil(fields.length / limit) > maxColumns
				? maxColumns
				: Math.ceil(fields.length / limit),
		[fields, maxColumns, limit],
	);

	const columnData = Array.from({ length: columns }, (_, colIndex) => {
		const startIndex = colIndex * limit;
		const endIndex = Math.min(startIndex + limit, columns * limit);

		return fields.slice(startIndex, endIndex);
	});
	return (
		<Grid container {...gridProps} spacing={spacing}>
			{columnData.map((columnItems) => (
				<Grid
					data-testid="product-property-column"
					size={12 / columns}
					key={Date.now()} // TODO: Fix me
					maxWidth={grow ? "100%" : "max-content"}
				>
					<List dense disablePadding>
						{columnItems.map((item) => (
							<ListItem
								data-testid="product-property-item"
								disablePadding
								key={item.id}
								{...itemProps}
							>
								<ListItemText>
									<Stack direction="row" spacing={1}>
										<Typography variant="body2">{item.name}:</Typography>
										<Typography variant="body2">{item.value}</Typography>
									</Stack>
								</ListItemText>
							</ListItem>
						))}
					</List>
				</Grid>
			))}
		</Grid>
	);
};
