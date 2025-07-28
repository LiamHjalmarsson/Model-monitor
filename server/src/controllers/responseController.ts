import { Request, Response } from "express";
import { query } from "../db/index.js";
import { faker } from "@faker-js/faker";
import { OpenAI } from "openai";
import config from "../config/config.js";

const openai = new OpenAI({
	apiKey: config.openAi,
});

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

export async function generateAIResponse(
	req: AuthenticatedRequest,
	res: Response
) {
	const brandId = Number(req.params.brand_id);

	const userId = req.userData?.id;

	const check = await query<{ id: number }>(
		`SELECT id FROM brands WHERE id = $1 AND created_by = $2`,
		[brandId, userId]
	);

	if (check.rowCount === 0) {
		return res
			.status(403)
			.json({ message: "Not authorized to generate for this brand" });
	}

	try {
		const { rows } = await query<{ prompt: string }>(
			`SELECT prompt FROM brands WHERE id = $1`,
			[brandId]
		);

		const prompt = rows[0].prompt;

		const completion = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [{ role: "user", content: prompt }],
		});

		const aiContent = completion.choices?.[0]?.message?.content?.trim();

		if (!aiContent) {
			throw new Error("No content from OpenAI");
		}

		const insert = await query<{
			id: number;
			content: string;
			created_at: string;
		}>(
			`INSERT INTO responses (brand_id, content)
         VALUES ($1, $2)
       RETURNING id, content, created_at`,
			[brandId, aiContent]
		);

		res.status(201).json(insert.rows[0]);
	} catch (err) {
		res.status(500).json({ message: "Failed to generate AI response" });
	}
}
