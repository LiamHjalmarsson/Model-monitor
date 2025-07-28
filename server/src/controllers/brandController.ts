import { Request, Response } from "express";
import { query } from "../db/index.js";

interface AuthRequest extends Request {
	userId?: number;
}

export async function getBrands(req: AuthRequest, res: Response) {
	const result = await query("SELECT * FROM brands WHERE created_by = $1", [
		req.userId,
	]);

	res.json(result.rows);
}

export async function createBrand(req: AuthRequest, res: Response) {
	const { name, prompt } = req.body;

	if (!name || !prompt) {
		return res
			.status(400)
			.json({ message: "Name and prompt are required" });
	}

	const result = await query(
		`INSERT INTO brands (name, prompt, created_by) VALUES ($1, $2, $3) RETURNING *`,
		[name, prompt, req.userId]
	);

	res.status(201).json(result.rows[0]);
}

export async function updateBrand(req: AuthRequest, res: Response) {
	const { id } = req.params;
	const { name, prompt } = req.body;

	const result = await query(
		`UPDATE brands SET name = $1, prompt = $2 WHERE id = $3 AND created_by = $4 RETURNING *`,
		[name, prompt, id, req.userId]
	);

	if (result.rowCount === 0) {
		return res
			.status(404)
			.json({ message: "Brand not found or not authorized" });
	}

	res.status(200).json(result.rows[0]);
}

export async function deleteBrand(req: AuthRequest, res: Response) {
	const { id } = req.params;

	const result = await query(
		`DELETE FROM brands WHERE id = $1 AND created_by = $2 RETURNING *`,
		[id, req.userId]
	);

	if (result.rowCount === 0) {
		return res
			.status(404)
			.json({ message: "Brand not found or not authorized" });
	}

	res.status(200).json({ message: "Brand deleted" });
}
