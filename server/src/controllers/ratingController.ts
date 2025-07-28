import { Request, Response } from "express";
import { query } from "../db/index.js";

interface AuthenticatedRequest extends Request {
	userId?: number;
}

export async function getRatings(req: AuthenticatedRequest, res: Response) {
	const userId = req.userId!;

	const { responseId } = req.query;

	try {
		let sql = `
			SELECT r.*
				FROM ratings r
				JOIN responses res ON r.response_id = res.id
				JOIN brands b ON res.brand_id = b.id
			WHERE b.created_by = $1
		`;

		const params: any[] = [userId];

		if (responseId) {
			sql += ` AND r.response_id = $${params.length + 1}`;
			params.push(responseId);
		}

		const result = await query(sql, params);

		res.json(result.rows);
	} catch (err) {
		console.error("Error fetching ratings:", err);
		res.status(500).json({ message: "Server error" });
	}
}

export async function getRatingById(req: AuthenticatedRequest, res: Response) {
	const id = Number(req.params.id);

	const userId = req.userId!;

	try {
		const result = await query(
			`
			SELECT r.*
				FROM ratings r
				JOIN responses res ON r.response_id = res.id
				JOIN brands b ON res.brand_id = b.id
			WHERE r.id = $1
				AND b.created_by = $2
		`,
			[id, userId]
		);

		if (result.rowCount === 0) {
			return res
				.status(404)
				.json({ message: "Rating not found or not authorized" });
		}

		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
}

export async function createRating(req: AuthenticatedRequest, res: Response) {
	try {
		const { responseId, rating } = req.body;

		const userId = req.userId;

		if (!userId) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		if (rating !== 0 && rating !== 1) {
			return res.status(400).json({ message: "Rating must be 0 or 1" });
		}

		const existing = await query(
			`SELECT * FROM ratings WHERE user_id = $1 AND response_id = $2`,
			[userId, responseId]
		);

		if (existing.rows.length > 0) {
			return res
				.status(409)
				.json({ message: "You have already rated this response" });
		}

		const { rows } = await query(
			`INSERT INTO ratings (response_id, rating, user_id)
			 VALUES ($1, $2, $3) RETURNING *`,
			[responseId, rating, userId]
		);

		res.status(201).json(rows[0]);
	} catch (err: any) {
		res.status(500).send("Server error");
	}
}

export async function updateRating(req: AuthenticatedRequest, res: Response) {
	try {
		const { id } = req.params;
		const { rating } = req.body;
		const userId = req.userId;

		if (!userId) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		if (rating !== 0 && rating !== 1) {
			return res.status(400).json({ message: "Rating must be 0 or 1" });
		}

		const { rows } = await query(
			`UPDATE ratings SET rating = $1 WHERE id = $2 AND user_id = $3 RETURNING *`,
			[rating, id, userId]
		);

		if (rows.length === 0) {
			return res
				.status(404)
				.json({ message: "Rating not found or unauthorized" });
		}

		res.json(rows[0]);
	} catch (err) {
		console.error("Error updating rating:", err);
		res.status(500).send("Server error");
	}
}
