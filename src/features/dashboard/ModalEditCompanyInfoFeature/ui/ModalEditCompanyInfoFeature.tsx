"use client";
import { Box, Button, Modal } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "react-toastify";
import type { CompanyInfoType } from "@/entities/company";
import type { UserInfoType } from "@/entities/user";
import { ToastAlert } from "@/shared/ui";

type SubmitDataType = Partial<UserInfoType> | Partial<CompanyInfoType>;
type SubmitActionType = (data: SubmitDataType) => Promise<void>;

type ModalEditCompanyInfoFeature = {
	Form: React.FC<{
		onSubmitAction: SubmitActionType;
	}>;
};

export const ModalEditCompanyInfoFeature = ({
	Form,
}: ModalEditCompanyInfoFeature) => {
	const t = useTranslations();
	const [open, setOpen] = useState<boolean>(false);

	const success = () =>
		toast.success(
			<ToastAlert text={t("features.modalEditCompany.alerts.success")} />,
			{
				closeButton: ({ closeToast }) => (
					<Button
						sx={{ minWidth: "fit-content" }}
						onClick={() => {
							closeToast();
						}}
					>
						{t("general.cancel")}
					</Button>
				),
			},
		);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleSubmitEditInfoAction = async (_: SubmitDataType) => {
		handleClose();
		success();
	};

	return (
		<>
			<Button variant="contained" onClick={handleOpen}>
				{t("pages.dashboard.editButton")}
			</Button>
			<Modal open={open} onClose={handleClose}>
				<Box className="modal-container">
					<Form onSubmitAction={handleSubmitEditInfoAction} />
				</Box>
			</Modal>
		</>
	);
};
