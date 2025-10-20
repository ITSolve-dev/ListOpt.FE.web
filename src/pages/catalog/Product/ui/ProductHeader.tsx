import { Box, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import type { ProductType } from "@/entities/product";

type ProductHeaderProps = {
	product: ProductType;
};

export async function ProductHeader({ product }: ProductHeaderProps) {
	return (
		<Paper elevation={3} sx={{ mt: 3.75 }}>
			<Stack direction="row" alignItems="flex-start" spacing={5} p={2.5}>
				<Box>
					<Image
						src="https://via.placeholder.com/150"
						alt="Placeholder"
						width={250}
						height={250}
					/>
				</Box>
				<Stack direction="column" spacing={1.25}>
					<Typography variant="h4" color="text.primary" gutterBottom>
						{product?.name}
					</Typography>
					<Typography variant="h6" color="text.primary" gutterBottom>
						{product?.category.name}
					</Typography>
					<Typography variant="body1" color="text.primary">
						{product?.description}
					</Typography>
				</Stack>
			</Stack>
		</Paper>
	);
}
