import { Container, Grid2 as Grid, Skeleton, Stack } from "@mui/material";

export default async function Loading() {
	return (
		<Container>
			<Stack
				direction="row"
				justifyContent="center"
				alignItems="baseline"
				spacing={15}
			>
				<Skeleton variant="rounded" width="20%" height={55} />
				<Stack width="75%">
					<Stack direction="row" justifyContent="space-between">
						<Skeleton variant="rounded" width="30%" height={70} />
						<Skeleton variant="rounded" width="30%" height={70} />
						<Skeleton variant="rounded" width="30%" height={70} />
					</Stack>
					<Grid container spacing={3} mt={7} mb={4}>
						<Grid size={6}>
							<Skeleton variant="rounded" width="100%" height={45} />
						</Grid>
						<Grid size={6}>
							<Skeleton variant="rounded" width="100%" height={45} />
						</Grid>
						<Grid size={6}>
							<Skeleton variant="rounded" width="100%" height={45} />
						</Grid>
						<Grid size={6}>
							<Skeleton variant="rounded" width="100%" height={45} />
						</Grid>
						<Grid size={6}>
							<Skeleton variant="rounded" width="100%" height={45} />
						</Grid>
						<Grid size={6}>
							<Skeleton variant="rounded" width="100%" height={45} />
						</Grid>
						<Grid size={6}>
							<Skeleton variant="rounded" width="100%" height={45} />
						</Grid>
						<Grid size={6}>
							<Skeleton variant="rounded" width="100%" height={45} />
						</Grid>
					</Grid>
					<Skeleton variant="rounded" width="100%" height={20} />
					<Skeleton
						variant="rounded"
						width="60%"
						height={35}
						sx={{ marginTop: 5, mx: "auto" }}
					/>
				</Stack>
			</Stack>
		</Container>
	);
}
