import { apiUsers } from "@/shared/lib/api";
import { UserShortSchema, type UserShortType } from "./schemas/user.schema";
import { UserInfoSchema, type UserInfoType } from "./schemas/userInfo.schema";

export async function meApi(): Promise<UserShortType> {
	const response = await apiUsers.get("v1/me").json();
	return await UserShortSchema.parseAsync(response);
}

export async function myInfoApi(): Promise<UserInfoType> {
	const response = await apiUsers.get("v1/info").json();
	return await UserInfoSchema.parseAsync(response);
}

type UpdateInfoRequest = {
	country: string;
	firstName: string;
	lastName: string;
	position: string;
};

export async function updateInfoApi(
	data: UpdateInfoRequest,
): Promise<UserInfoType> {
	const response = await apiUsers
		.patch("v1/info", {
			json: data,
		})
		.json();
	return await UserInfoSchema.parseAsync(response);
}
