import {Request, Response, NextFunction} from "express";
import {query} from "../db/index.js";
import {generateToken} from "../utils/token.js";
import {StatusCodes} from "http-status-codes";
import {comparePassword} from "../utils/password.js";

interface User {
	id: number;
	email: string;
	password: string;
}

export async function login(req: Request, res: Response, next: NextFunction) {
	try {
		const {email, password: candidate} = req.body;

		const result = await query<User>("SELECT id, email, password FROM users WHERE email = $1", [email]);

		if (result.rowCount === 0) {
			return res.status(StatusCodes.UNAUTHORIZED).json({message: "Invalid email or password"});
		}

		const {id, password} = result.rows[0];

		const passwordMatch = await comparePassword(candidate, password);

		if (!passwordMatch) {
			return res.status(StatusCodes.UNAUTHORIZED).json({message: "Invalid email or password"});
		}

		const token = generateToken(id);

		res.status(StatusCodes.OK).json({
			token,
			user: {id, email},
		});
	} catch (err) {
		next(err);
	}
}

export function logout(req: Request, res: Response): Response {
	return res.status(StatusCodes.OK).json({message: "Logged out successfully"});
}
