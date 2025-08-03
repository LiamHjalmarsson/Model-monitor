import {StatusCodes} from "http-status-codes";

export class HttpError extends Error {
	constructor(
		public statusCode: number,
		message = ""
	) {
		super(message);
		Object.setPrototypeOf(this, new.target.prototype);
	}

	static NotFound(message = "Not Found") {
		return new HttpError(StatusCodes.NOT_FOUND, message);
	}

	static BadRequest(message = "Bad Request") {
		return new HttpError(StatusCodes.BAD_REQUEST, message);
	}

	static Forbidden(message = "Forbidden") {
		return new HttpError(StatusCodes.FORBIDDEN, message);
	}

	static Unauthorized(message = "Unauthorized") {
		return new HttpError(StatusCodes.UNAUTHORIZED, message);
	}
}
