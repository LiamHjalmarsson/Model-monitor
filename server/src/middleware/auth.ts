import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token.js";

interface AuthenticatedRequest extends Request {
	userId?: number;
}

/**
 * Middleware to verify JWT token and attach userId to request.
 */
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
		const decoded = verifyToken(token);

		req.userId = decoded.userId;

		next();
	} catch (err) {
		res.status(401).json({ message: "Invalid token" });
	}
}
