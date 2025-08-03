import {Request, Response} from "express";
import {query} from "../db/index.js";
import {StatusCodes} from "http-status-codes";

interface AuthRequest extends Request {
	userId?: number;
}

export async function getBrands(req: AuthRequest, res: Response) {
	const userId = req.userId;

	if (!userId) {
		return res.status(StatusCodes.UNAUTHORIZED).json({message: "Unauthorized"});
	}

	try {
		const {rows} = await query("SELECT * FROM brands WHERE created_by = $1", [userId]);

		res.status(StatusCodes.OK).json(rows);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server error"});
	}
}

export async function createBrand(req: AuthRequest, res: Response) {
	const {name, prompt} = req.body;

	const userId = req.userId;

	if (!userId) {
		return res.status(StatusCodes.UNAUTHORIZED).json({message: "Unauthorized"});
	}

	if (!name || !prompt) {
		return res.status(StatusCodes.BAD_REQUEST).json({message: "Name and prompt are required"});
	}

	try {
		const {rows} = await query(`INSERT INTO brands (name, prompt, created_by) VALUES ($1, $2, $3) RETURNING *`, [
			name,
			prompt,
			req.userId,
		]);

		res.status(StatusCodes.CREATED).json(rows[0]);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server error"});
	}
}

export async function updateBrand(req: AuthRequest, res: Response) {
	try {
		const brandId = Number(req.params.id);

		const {name, prompt} = req.body;

		const userId = req.userId;

		if (!userId) {
			return res.status(StatusCodes.UNAUTHORIZED).json({message: "Unauthorized"});
		}

		if (!name || !prompt) {
			return res.status(StatusCodes.BAD_REQUEST).json({message: "Name and prompt are required"});
		}

		const check = await query(`SELECT * FROM brands WHERE id = $1 AND created_by = $2`, [brandId, userId]);

		if (check.rowCount === 0) {
			return res.status(StatusCodes.FORBIDDEN).json({message: "Not authorized to update this brand"});
		}

		const result = await query(`UPDATE brands SET name = $1, prompt = $2 WHERE id = $3 RETURNING *`, [
			name,
			prompt,
			brandId,
		]);

		res.status(StatusCodes.OK).json(result.rows[0]);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server error"});
	}
}

export async function deleteBrand(req: AuthRequest, res: Response) {
	const {id} = req.params;

	const userId = req.userId;

	if (!userId) {
		return res.status(StatusCodes.UNAUTHORIZED).json({message: "Unauthorized"});
	}

	try {
		await query(`DELETE FROM responses WHERE brand_id = $1 AND created_by = $2`, [id, req.userId]);

		const {rowCount} = await query(`DELETE FROM brands WHERE id = $1 AND created_by = $2 RETURNING *`, [
			id,
			req.userId,
		]);

		if (rowCount === 0) {
			return res.status(StatusCodes.NOT_FOUND).json({message: "Brand not found or not authorized"});
		}

		res.status(StatusCodes.OK).json({message: "Brand deleted"});
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server error"});
	}
}
