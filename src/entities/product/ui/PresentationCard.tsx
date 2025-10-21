"use client";
import {
	Box,
	Card,
	CardActionArea,
	type CardActionAreaProps,
	CardActions,
	CardContent,
	CardHeader,
	type CardHeaderProps,
	CardMedia,
	type CardProps,
	Stack,
	Typography,
} from "@mui/material";
import Image from "next/image";
import { useFormatter } from "next-intl";
import NoImage from "@/images/no-image.png";
import type { ProductType } from "../schemas/product.schema";
import { CardDescription, type CardDescriptionProps } from "./CardDescription";
import { useProductCardContext } from "./ProductCard";

export type PresentationCardProps = {
	action?: (product: ProductType) => React.ReactNode;
	headerProps?: CardHeaderProps;
	cardProps?: CardProps;
	cardActionAreaProps?: CardActionAreaProps;
	cardDescriptionProps?: CardDescriptionProps;
};

export const PresentationCard = ({
	action,
	headerProps,
	cardProps,
	cardActionAreaProps,
	cardDescriptionProps,
}: PresentationCardProps) => {
	const { product } = useProductCardContext();
	const formatter = useFormatter();
	return (
		<Card
			data-testid="product-card"
			elevation={2}
			sx={{
				width: "100%",
				// maxWidth: 950,
				maxHeight: 200,
				position: "relative",
				...cardProps?.sx,
			}}
			{...cardProps}
		>
			<CardActionArea
				data-testid="product-action-area-card"
				component="div"
				{...cardActionAreaProps}
			>
				<Stack direction="row">
					<CardMedia sx={{ padding: 1 }}>
						{
							<Image
								height={164}
								width={164}
								src={product.photo || NoImage}
								alt={product.name}
							/>
						}
					</CardMedia>
					<Box flexGrow={1}>
						<CardHeader
							title={
								<Stack
									direction="row"
									justifyContent="space-between"
									alignItems="baseline"
								>
									<Typography variant="h6">{product.name}</Typography>
									<Typography>{product.companyId}</Typography>
								</Stack>
							}
							{...headerProps}
						/>
						<Stack direction="row" justifyContent="space-between">
							{/* Remove hard coded width and height */}
							<CardContent sx={{ maxWidth: 650, maxHeight: 110 }}>
								<CardDescription {...cardDescriptionProps} />
							</CardContent>
							<Stack alignItems="end" spacing="auto">
								<CardContent>
									<Typography variant="h6">
										{formatter.number(product.price.internal, "currency")}
									</Typography>
								</CardContent>
								{action && <CardActions>{action(product)}</CardActions>}
							</Stack>
						</Stack>
					</Box>
				</Stack>
			</CardActionArea>
		</Card>
	);
};
