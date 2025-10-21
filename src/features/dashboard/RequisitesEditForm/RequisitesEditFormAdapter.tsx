"use client";
import { useCallback } from "react";
import type {
	CompanyInfoType,
	CompanyRequisitesType,
} from "@/entities/company";

import { EditRequisitesForm } from "./ui/EditRequisitesForm";

type RequisitesEditFormAdapterProps = {
	onSubmitAction: (data: Partial<CompanyInfoType>) => Promise<void>;
};

export const RequisitesEditFormAdapter = ({
	onSubmitAction,
}: RequisitesEditFormAdapterProps) => {
	const handleSubmit = useCallback(
		(data: CompanyRequisitesType) => onSubmitAction({ requisites: data }),
		[onSubmitAction],
	);

	return <EditRequisitesForm onSubmitAction={handleSubmit} />;
};
