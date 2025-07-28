import { Request, Response } from "express";
import db from "../db/index.js";

interface AuthenticatedRequest extends Request {
	userData?: {
		id: number;
	};
}

export async function getResponsesForBrand(
	req: AuthenticatedRequest,
	res: Response
) {
	try {
		const { brand_id } = req.params;

		const userId = req.userData?.id;

		const { rows } = await db.query(
			`SELECT * FROM responses
			 WHERE created_by = $1 AND brand_id = $2
			 ORDER BY created_at ASC`,
			[userId, brand_id]
		);

		res.json(rows);
	} catch (err) {
		res.status(500).send("Server error");
	}
}

export async function getResponseById(req: Request, res: Response) {
	try {
		const { id } = req.params;

		const { rows } = await db.query(
			"SELECT * FROM responses WHERE id = $1",
			[id]
		);

		if (rows.length === 0) {
			return res.status(404).json({ msg: "Response not found" });
		}

		res.json(rows[0]);
	} catch (err) {
		res.status(500).send("Server error");
	}
}

export async function createResponse(req: AuthenticatedRequest, res: Response) {
	try {
		const { brand_id } = req.params;

		const userId = req.userData?.id;

		const content = "Fake AI response here";

		const result = await db.query(
			`INSERT INTO responses (brand_id, created_by, content)
			 VALUES ($1, $2, $3) RETURNING *`,
			[brand_id, userId, content]
		);

		res.status(201).json(result.rows[0]);
	} catch (err) {
		res.status(500).send("Server error");
	}
}
