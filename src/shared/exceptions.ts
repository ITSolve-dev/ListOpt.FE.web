import { HTTPError, type NormalizedOptions } from "ky";
import type { ErrorDetailsType } from "./schemas";

export class ApiDetailsError<T = unknown> extends HTTPError<T> {
	details: ErrorDetailsType;

	constructor(
		message: string,
		details: ErrorDetailsType,
		response: Response,
		request: Request,
		options: NormalizedOptions,
	) {
		super(response, request, options);
		this.message = message;
		this.details = details.map((detail) => ({
			type: `apiErrors.${detail.type}`,
			description: detail.description,
			ctx: detail.ctx,
		}));
	}
}

export class InternalServerError extends ApiDetailsError {
	constructor(
		response: Response,
		request: Request,
		options: NormalizedOptions,
	) {
		super(
			"An internal server error occurred",
			[
				{
					type: "InternalServerError",
					description: "An internal server error occurred",
				},
			],
			response,
			request,
			options,
		);
	}
}

export class UnknownError extends ApiDetailsError {
	constructor(
		response: Response,
		request: Request,
		options: NormalizedOptions,
		message: string = "Unknown error occurred",
	) {
		super(
			message,
			[
				{
					type: "unknown",
					description: "Unknown error occurred",
				},
			],
			response,
			request,
			options,
		);
	}
}
