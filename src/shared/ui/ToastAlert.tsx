import {
	Alert,
	type AlertColor,
	type AlertProps,
	AlertTitle,
	Typography,
} from "@mui/material";
import { type PropsWithChildren, useMemo } from "react";
import type { ToastContentProps } from "react-toastify";

export type ToastAlertProps<Data = unknown> = {
	title?: string;
	text?: string;
	caption?: string;
	alertProps?: AlertProps;
} & PropsWithChildren &
	Partial<ToastContentProps<Data>>;

export const ToastAlert = <Data = unknown>({
	children,
	title,
	text,
	caption,
	toastProps,
	alertProps,
}: ToastAlertProps<Data>) => {
	const severity = useMemo<AlertColor>(
		() =>
			toastProps?.type === "default"
				? "success"
				: toastProps?.type || "success",
		[toastProps?.type],
	);
	return (
		<Alert
			sx={{ flexGrow: 1 }}
			aria-label={toastProps?.role || "alert"}
			{...alertProps}
			severity={severity}
		>
			{title && <AlertTitle>{title}</AlertTitle>}
			<Typography variant="body1">{children || text}</Typography>
			{caption && <Typography variant="caption">{caption}</Typography>}
		</Alert>
	);
};
