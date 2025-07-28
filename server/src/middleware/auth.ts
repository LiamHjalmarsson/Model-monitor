import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/token";

export interface AuthenticatedRequest extends Request {
	userId?: string;
}

export default function authMiddleware(
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
): void {
	const authHeader = req.headers["authorization"];

	if (!authHeader) {
		res.status(401).json({ message: "No token provided" });
		return;
	}

	const token = authHeader.startsWith("Bearer ")
		? authHeader.slice(7)
		: authHeader;

	try {
		const decoded = verifyJWT(token);

		req.userId = decoded.userId;

		next();
	} catch (err) {
		console.error("Invalid token:", err);
		res.status(401).json({ message: "Invalid token" });
	}
}
