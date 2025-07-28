import { Request, Response } from "express";
import { query } from "../db/index.js";
import { faker } from "@faker-js/faker";

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

		const { rows } = await query(
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

		const { rows } = await query("SELECT * FROM responses WHERE id = $1", [
			id,
		]);

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

		const check = await query<{ id: number }>(
			`SELECT id FROM brands WHERE id = $1 AND created_by = $2`,
			[brand_id, userId]
		);

		if (check.rowCount === 0) {
			return res.status(403).json({
				message: "Not authorized to add response to this brand",
			});
		}

		const aiContent = faker.lorem.paragraphs(2);

		const result = await query(
			`INSERT INTO responses (brand_id, created_by, content)
			 VALUES ($1, $2, $3) RETURNING *`,
			[brand_id, userId, aiContent]
		);

		res.status(201).json(result.rows[0]);
	} catch (err) {
		res.status(500).send("Server error");
	}
}
