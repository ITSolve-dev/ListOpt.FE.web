"use client";
import { useCancelableMutationSWR } from "@/shared/lib/useCancelableMutationSWR";
import type { CompanyInfoType } from "./schemas/companyInfo.schema";

export const useUpdateCompanyInfoSWR = () => {
	return useCancelableMutationSWR(
		"/company/info/update",
		async (_: string, { arg }: { arg: Partial<CompanyInfoType> }) => {
			return () => arg;
		},
		{
			throwOnError: false,
		},
	);
};
