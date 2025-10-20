import type { AuthorizedSession, Session } from "next-auth";

export const isAuth = (
	session: Session | null | undefined,
): session is AuthorizedSession => {
	return !!(session && Object.hasOwn(session, "accessToken"));
};
