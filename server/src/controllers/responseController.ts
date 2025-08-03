import {Request, Response} from "express";
import {query} from "../db/index.js";
import {faker} from "@faker-js/faker";
import {OpenAI} from "openai";
import {StatusCodes} from "http-status-codes";
import config from "../config/config.js";

const openai = new OpenAI({
	apiKey: config.openAi,
});

interface AuthenticatedRequest extends Request {
	userId?: number;
}

export async function getResponsesForBrand(req: AuthenticatedRequest, res: Response) {
	const {brand_id} = req.params;

	const userId = req.userId;

	if (!userId) {
		return res.status(StatusCodes.UNAUTHORIZED).json({message: "Unauthorized"});
	}

	try {
		const {rows} = await query(
			`
				SELECT r.*
				FROM responses r
				JOIN brands b ON r.brand_id = b.id
				WHERE b.created_by = $1
				AND r.brand_id = $2
				ORDER BY r.created_at DESC
			`,
			[userId, brand_id]
		);

		res.status(StatusCodes.OK).json(rows);
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server error"});
	}
}

export async function getResponseById(req: AuthenticatedRequest, res: Response) {
	const responseId = Number(req.params.id);

	const userId = req.userId;

	if (!userId) {
		return res.status(StatusCodes.UNAUTHORIZED).json({message: "Unauthorized"});
	}

	try {
		const {rows} = await query(
			`SELECT r.*
			 FROM responses r
			 JOIN brands b ON r.brand_id = b.id
			 WHERE r.id = $1 AND b.created_by = $2`,
			[responseId, userId]
		);

		if (rows.length === 0) {
			return res.status(404).json({message: "Response not found or not authorized"});
		}

		res.status(StatusCodes.OK).json(rows[0]);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server error");
	}
}

export async function getUserOwnedResponseById(req: AuthenticatedRequest, res: Response) {
	const id = Number(req.params.id);

	const userId = req.userId;

	if (!userId) {
		return res.status(StatusCodes.UNAUTHORIZED).json({message: "Unauthorized"});
	}

	try {
		const {rows, rowCount} = await query(
			`SELECT r.*
		 		FROM responses r
		 		JOIN brands b ON r.brand_id = b.id
				WHERE r.id = $1
		  		AND b.created_by = $2`,
			[id, userId]
		);

		if (rowCount === 0) {
			return res.status(StatusCodes.NOT_FOUND).json({message: "Response not found or not authorized"});
		}

		res.status(StatusCodes.OK).json(rows);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server error"});
	}
}

export async function createResponse(req: AuthenticatedRequest, res: Response) {
	const {brand_id} = req.params;

	const userId = req.userId;

	if (!userId) {
		return res.status(StatusCodes.UNAUTHORIZED).json({message: "Unauthorized"});
	}

	try {
		const check = await query(`SELECT id FROM brands WHERE id = $1 AND created_by = $2`, [brand_id, userId]);

		if (check.rowCount === 0) {
			return res.status(StatusCodes.FORBIDDEN).json({message: "Not authorized to add response to this brand"});
		}

		const aiContent = faker.lorem.paragraphs(2);

		const {rows} = await query(
			`INSERT INTO responses (brand_id, created_by, content)
			 	VALUES ($1, $2, $3) RETURNING *`,
			[brand_id, userId, aiContent]
		);

		res.status(StatusCodes.CREATED).json(rows[0]);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server error");
	}
}

export async function generateAIResponse(req: AuthenticatedRequest, res: Response) {
	const brandId = Number(req.params.brand_id);

	const userId = req.userId;

	if (!userId) {
		return res.status(StatusCodes.UNAUTHORIZED).json({message: "Unauthorized"});
	}

	try {
		const check = await query<{id: number}>(`SELECT id FROM brands WHERE id = $1 AND created_by = $2`, [
			brandId,
			userId,
		]);

		if (check.rowCount === 0) {
			return res.status(StatusCodes.FORBIDDEN).json({message: "Not authorized to generate for this brand"});
		}

		const {rows} = await query<{prompt: string}>(`SELECT prompt FROM brands WHERE id = $1`, [brandId]);

		const prompt = rows[0].prompt;

		if (!prompt) {
			return res.status(StatusCodes.BAD_REQUEST).json({message: "Brand prompt not found"});
		}

		const completion = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [{role: "user", content: prompt}],
		});

		const aiContent = completion.choices?.[0]?.message?.content?.trim();

		if (!aiContent) {
			throw new Error("No content from OpenAI");
		}

		const data = await query(
			`INSERT INTO responses (brand_id, content, created_by)
				VALUES ($1, $2, $3)
				RETURNING id, content, created_at`,
			[brandId, aiContent, userId]
		);

		res.status(StatusCodes.CREATED).json(data.rows[0]);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Failed to generate AI response"});
	}
}
