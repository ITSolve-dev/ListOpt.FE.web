import { Box } from "@mui/material";
import type {
	ControllerRenderProps,
	FieldPath,
	FieldValues,
} from "react-hook-form";

type FieldProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ControllerRenderProps<TFieldValues, TName>;

export type SelectedBoxProps = Partial<FieldProps> & {
	children: React.ReactNode;
	onClick?: (event: React.MouseEvent<HTMLDivElement>, id?: string) => void;
	isActive?: boolean;
	id?: string;
};

export const SelectedBox = ({
	children,
	onClick,
	isActive,
	id,
	...fieldProps
}: SelectedBoxProps) => {
	return (
		<Box
			sx={(theme) => ({
				width: "100%",
				borderRadius: `${theme.shape.borderRadius}px`,
				borderWidth: 2,
				paddingX: theme.spacing(4),
				paddingY: theme.spacing(2),
				...(isActive && {
					backgroundColor: theme.palette.primary.main,
					color: theme.palette.primary.contrastText,
					// borderColor: theme.palette.primary.main,
					borderWidth: 1,
				}),
				":hover": {
					// backgroundColor: theme.palette.primary.main,
					// color: theme.palette.primary.contrastText,
					borderColor: !isActive && theme.palette.primary.main,
					cursor: "pointer",
				},
				":active": {
					backgroundColor: theme.palette.primary.main,
					color: theme.palette.primary.contrastText,
				},
			})}
			onClick={(event) => onClick?.(event, id)}
			{...fieldProps}
		>
			{children}
		</Box>
	);
};
