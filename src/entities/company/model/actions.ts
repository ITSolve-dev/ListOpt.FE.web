"use server";
import type { CompanyShortType } from "../schemas/company.schema";
import type { CompanyInfoType } from "../schemas/companyInfo.schema";

export async function getMyCompanyAction(): Promise<CompanyShortType | null> {
	return null;
}

export async function getMyCompanyInfoAction(): Promise<CompanyInfoType | null> {
	return null;
}
