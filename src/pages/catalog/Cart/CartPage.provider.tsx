"use client";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { type PropsWithChildren, useRef, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import type { StoreApi } from "zustand";
import {
	type Cart,
	CartStoreProvider,
	type cartStore,
	createCartStore,
	defaultInitState,
	getMyCart,
} from "@/entities/cart";
import { useCancelableMutationSWR } from "@/shared/lib/useCancelableMutationSWR";
import { ToastAlert } from "@/shared/ui";

import { CartPageDepsCtx } from "./Cart.deps";

type CartPageProviderProps = {
	cart: Cart | null;
} & PropsWithChildren;

const useCheckout = (options?: {
	onSuccess?: () => void;
	onError?: () => void;
}) =>
	useCancelableMutationSWR("/checkout", async () => {}, {
		throwOnError: false,
		...options,
	});

export const CartPageProvider = ({
	children,
	cart,
}: CartPageProviderProps): React.ReactNode => {
	const { data: cachedCart } = useSWR("cart", getMyCart, {
		fallbackData: cart || undefined,
	});
	const storeRef = useRef<StoreApi<cartStore> | null>(null);
	if (storeRef.current === null) {
		storeRef.current = createCartStore({
			...defaultInitState,
			cart: cachedCart || null,
		});
	}

	const handleCheckout = async () => {
		handleAlert();
	};

	const [open, setOpen] = useState(false);
	const { trigger, cancel, isMutating } = useCheckout({
		onSuccess: () => {
			setOpen(false);
			toast.success(<ToastAlert text="Заявка отправлена" />);
		},
		onError: () => {
			setOpen(false);
			toast.error(<ToastAlert text="Произошла ошибка" />);
		},
	});

	const handleAlert = () => {
		setOpen(true);
	};

	const handleConfirmCheckout = async () => {
		await trigger();
	};
	const handleClose = () => {
		cancel();
		setOpen(false);
	};

	return (
		<CartStoreProvider initStore={storeRef.current}>
			<CartPageDepsCtx.Provider value={{ onCheckout: handleCheckout }}>
				{children}
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">Отправить заявку?</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Отправить заявку на покупку товаров в корзине?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Отмена</Button>
						<Button
							loading={isMutating}
							onClick={handleConfirmCheckout}
							autoFocus
						>
							Отправить
						</Button>
					</DialogActions>
				</Dialog>
			</CartPageDepsCtx.Provider>
		</CartStoreProvider>
	);
};
