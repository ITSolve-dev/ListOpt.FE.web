import { auth } from "@/shared/next-auth";
import { createNEMO } from "@rescale/nemo";
import { type NextMiddleware } from "@rescale/nemo";

export const middleware = createNEMO({
	"/cart": auth as NextMiddleware,
	"/dashboard/:path*": auth as NextMiddleware,
});
