import api from "./axios";

export interface ResponseItem {
	id: number;
	brand_id: number;
	created_by: number;
	content: string;
	created_at: string;
	rating?: 0 | 1;
}

/**
 * Fetch all responses for a specific brand.
 */
export async function getResponsesForBrand(brandId: number): Promise<ResponseItem[]> {
	const { data } = await api.get<ResponseItem[]>(`/responses/brands/${brandId}`);

	return data;
}

/**
 * Fetch a single response by its ID.
 */
export async function getResponseById(id: number): Promise<ResponseItem> {
	const { data } = await api.get<ResponseItem>(`/responses/${id}`);

	return data;
}

/**
 * Fetch a response owned by the current user.
 */
export async function getUserOwnedResponseById(id: number): Promise<ResponseItem> {
	const { data } = await api.get<ResponseItem>(`/responses/owned/${id}`);

	return data;
}

/**
 * Create a new random response for a brand.
 */
export async function createResponse(brandId: number): Promise<ResponseItem> {
	const { data } = await api.post<ResponseItem>(`/responses/brands/${brandId}`);

	return data;
}

/**
 * Generate an AI-driven response for a brand.
 */
export async function generateAIResponse(brandId: number): Promise<ResponseItem> {
	const { data } = await api.post<ResponseItem>(`/responses/brands/${brandId}/generate`);

	return data;
}
