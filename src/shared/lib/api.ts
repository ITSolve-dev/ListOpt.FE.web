import ky, { type KyInstance } from "ky";
import type { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { env } from "@/shared/env";
import { auth } from "../next-auth";
import { isAuth } from "./auth.helpers";

export const api = ky.create();

export const withAuth = (client: KyInstance) =>
	client.extend({
		hooks: {
			beforeRequest: [
				async (req: Request) => {
					let session: Session | null;
					if (typeof window === "undefined") {
						session = await auth();
					} else {
						session = await getSession();
					}
					if (isAuth(session)) {
						req.headers.set("Authorization", `Bearer ${session.accessToken}`);
					}
				},
			],
		},
	});

export const apiUsersRaw = api.extend({
	prefixUrl: env.NEXT_PUBLIC_API_USERS_URL,
});

export const apiCatalogRaw = api.extend({
	prefixUrl: env.NEXT_PUBLIC_API_CATALOG_URL,
});

export const apiUsers = withAuth(apiUsersRaw);

export const apiCatalog = withAuth(apiCatalogRaw);

export type ApiClientType = KyInstance;
