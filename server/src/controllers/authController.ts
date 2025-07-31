import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { query } from "../db/index.js";
import { generateToken } from "../utils/token.js";

interface User {
	id: number;
	email: string;
	password: string;
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const { email, password: candidate } = req.body;

		const result = await query<User>("SELECT id, email, password FROM users WHERE email = $1", [ email ]);

		if (result.rowCount === 0) {
			res.status(401).json({ message: "Invalid email or password" });

			return;
		}

		const { id, password } = result.rows[ 0 ];

		const match = await bcrypt.compare(candidate, password);

		if (!match) {
			res.status(401).json({ message: "Invalid email or password" });

			return;
		}

		const token = generateToken(id);

		res.status(200).json({
			token,
			user: { id, email },
		});
	} catch (err) {
		next(err);
	}
}

export function logout(req: Request, res: Response): Response {
	return res.status(200).json({ message: 'Logged out successfully' });
}
