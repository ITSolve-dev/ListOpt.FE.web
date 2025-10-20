"use client";
import { CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";

export const withAuthClient = <P extends Record<string, unknown>>(
	Component: React.ComponentType<P>,
	LoadingComponent?: React.ComponentType,
): React.FC<P> => {
	const Auth: React.FC<P> = (props) => {
		const { status } = useSession({
			required: true,
		});

		if (status === "loading") {
			return LoadingComponent ? (
				<LoadingComponent />
			) : (
				<CircularProgress color="inherit" />
			);
		}

		return <Component {...props} />;
	};
	return Auth;
};
