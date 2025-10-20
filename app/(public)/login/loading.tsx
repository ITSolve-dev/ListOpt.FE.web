import { Container, Skeleton, Stack } from "@mui/material";

export default async function Loading() {
	return (
		<Container>
			<Stack spacing={2} mt={8} mx="auto" width="50%" alignItems="center">
				<Skeleton variant="rounded" width="50%" height={55} />
				<Skeleton variant="rounded" width="100%" height={45} />
				<Skeleton variant="rounded" width="100%" height={45} />
				<Stack direction="row" spacing="auto" width="100%">
					<Skeleton variant="rounded" width="30%" height={25} />
					<Skeleton variant="rounded" width="30%" height={25} />
				</Stack>
				<Stack direction="row" width="100%" spacing={2}>
					<Skeleton
						variant="rounded"
						width="-webkit-fill-available"
						height={55}
					/>
					<Skeleton
						variant="rounded"
						width="-webkit-fill-available"
						height={55}
					/>
				</Stack>
			</Stack>
		</Container>
	);
}
