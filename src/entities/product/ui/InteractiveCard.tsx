"use client";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import {
	PresentationCard,
	type PresentationCardProps,
} from "./PresentationCard";

export type InteractiveCardProps = {
	selectable?: boolean;
	selected?: boolean;
	closeable?: boolean;
	onSelect?: () => void;
	onClose?: () => void;
} & PresentationCardProps;

export const InteractiveCard = ({
	selectable = false,
	selected = false,
	closeable = false,
	action,
	onClose,
	onSelect,
	...rest
}: InteractiveCardProps) => {
	return (
		<PresentationCard
			cardProps={{ elevation: selectable && selected ? 7 : 2 }}
			action={action}
			headerProps={{
				action: closeable && (
					<IconButton
						data-testid="product-close-icon-btn"
						onClick={onClose}
						sx={{ ml: 2 }}
					>
						<CloseIcon />
					</IconButton>
				),
			}}
			cardActionAreaProps={{
				disabled: false,
				onClick: () => {
					onSelect?.();
				},
				sx: {
					height: "100%",
					"&[data-active]": {
						backgroundColor: selected ? "action.selected" : undefined,
						"&:hover": {
							backgroundColor: "action.selectedHover",
						},
					},
				},
			}}
			{...rest}
		/>
	);
};
