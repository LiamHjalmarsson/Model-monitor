import { Request, Response } from "express";
import db from "../db/index.js";

interface AuthenticatedRequest extends Request {
	userData?: {
		id: number;
	};
}

export async function getAllRatings(req: Request, res: Response) {
	try {
		const { response_id } = req.query;

		let query = "SELECT * FROM ratings";

		const params: any[] = [];

		if (response_id) {
			query += " WHERE response_id = $1";

			params.push(response_id);
		}

		const { rows } = await db.query(query, params);

		res.status(200).json(rows);
	} catch (err) {
		res.status(500).send("Server error");
	}
}

export async function getRatingById(req: Request, res: Response) {
	try {
		const { id } = req.params;

		const { rows } = await db.query("SELECT * FROM ratings WHERE id = $1", [
			id,
		]);

		if (rows.length === 0) {
			return res.status(404).json({ message: "Rating not found" });
		}

		res.status(200).json(rows[0]);
	} catch (err) {
		res.status(500).send("Server error");
	}
}

export async function createRating(req: AuthenticatedRequest, res: Response) {
	try {
		const { responseId, rating } = req.body;

		const userId = req.userData?.id;

		if (!userId) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		if (rating !== 0 && rating !== 1) {
			return res.status(400).json({ message: "Rating must be 0 or 1" });
		}

		const existing = await db.query(
			`SELECT * FROM ratings WHERE user_id = $1 AND response_id = $2`,
			[userId, responseId]
		);

		if (existing.rows.length > 0) {
			return res
				.status(409)
				.json({ message: "Already rated this response" });
		}

		const { rows } = await db.query(
			`INSERT INTO ratings (response_id, rating, user_id)
			 VALUES ($1, $2, $3) RETURNING *`,
			[responseId, rating, userId]
		);

		res.status(201).json(rows[0]);
	} catch (err: any) {
		if (err.code === "23505") {
			return res
				.status(409)
				.json({ message: "Already rated this response" });
		}
		res.status(500).send("Server error");
	}
}

export async function updateRating(req: Request, res: Response) {
	try {
		const { id } = req.params;

		const { rating } = req.body;

		if (rating !== 0 && rating !== 1) {
			return res.status(400).json({ message: "Rating must be 0 or 1" });
		}

		const { rows } = await db.query(
			`UPDATE ratings SET rating = $1 WHERE id = $2 RETURNING *`,
			[rating, id]
		);

		if (rows.length === 0) {
			return res.status(404).json({ message: "Rating not found" });
		}

		res.status(200).json(rows[0]);
	} catch (err) {
		res.status(500).send("Server error");
	}
}
