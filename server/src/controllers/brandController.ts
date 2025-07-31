import { Request, Response } from "express";
import { query } from "../db/index.js";

interface AuthRequest extends Request {
	userId?: number;
}

export async function getResponsesForBrand(req: AuthRequest, res: Response) {
	const brandId = Number(req.params.id);

	const userId = req.userId!;

	if (!userId) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	try {
		const { rows } = await query(
			`SELECT r.*
			FROM responses r
			JOIN brands b ON r.brand_id = b.id
			WHERE r.brand_id = $1
			AND b.created_by = $2
			ORDER BY r.created_at DESC`,
			[brandId, userId]
		);

		res.status(200).json(rows);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
}

export async function getBrands(req: AuthRequest, res: Response) {
	const userId = req.userId;

	try {
		const { rows } = await query(
			"SELECT * FROM brands WHERE created_by = $1",
			[userId]
		);

		res.status(200).json(rows);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
}

export async function createBrand(req: AuthRequest, res: Response) {
	const { name, prompt } = req.body;

	const userId = req.userId;

	if (!userId) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	if (!name || !prompt) {
		return res
			.status(400)
			.json({ message: "Name and prompt are required" });
	}

	try {
		const { rows } = await query(
			`INSERT INTO brands (name, prompt, created_by) VALUES ($1, $2, $3) RETURNING *`,
			[name, prompt, req.userId]
		);

		res.status(201).json(rows[0]);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
}

export async function updateBrand(req: AuthRequest, res: Response) {
	try {
		const brandId = Number(req.params.id);

		const { name, prompt } = req.body;

		const userId = req.userId;

		if (!userId) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		if (!name || !prompt) {
			res.status(400).json({ message: "Name and prompt are required" });
			return;
		}

		const check = await query(
			`SELECT * FROM brands WHERE id = $1 AND created_by = $2`,
			[brandId, userId]
		);

		if (check.rowCount === 0) {
			return res
				.status(403)
				.json({ message: "Not authorized to update this brand" });
		}

		const result = await query(
			`UPDATE brands SET name = $1, prompt = $2 WHERE id = $3 RETURNING *`,
			[name, prompt, brandId]
		);

		res.status(200).json(result.rows[0]);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
}

export async function deleteBrand(req: AuthRequest, res: Response) {
	const { id } = req.params;

	const userId = req.userId;

	if (!userId) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	try {
		await query(
			`DELETE FROM responses WHERE brand_id = $1 AND created_by = $2`,
			[id, req.userId]
		);

		const { rowCount } = await query(
			`DELETE FROM brands WHERE id = $1 AND created_by = $2 RETURNING *`,
			[id, req.userId]
		);

		if (rowCount === 0) {
			return res
				.status(404)
				.json({ message: "Brand not found or not authorized" });
		}

		res.status(200).json({ message: "Brand deleted" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
}
