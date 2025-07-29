import api from "./axios";

export interface ResponseItem {
	id: string;
	content: string;
	created_at: string;
	brand_id: string;
	created_by?: number;
}

export async function getResponsesForBrand(
	brandId: string
): Promise<ResponseItem[]> {
	const res = await api.get(`/responses/brands/${brandId}`);

	return res.data;
}

export async function getResponseById(id: string): Promise<ResponseItem> {
	const res = await api.get(`/responses/${id}`);

	return res.data;
}

export async function getUserOwnedResponseById(
	id: string
): Promise<ResponseItem> {
	const res = await api.get(`/responses/owned/${id}`);

	return res.data;
}

export async function createResponse(brandId: string): Promise<ResponseItem> {
	const res = await api.post(`/responses/brands/${brandId}`);

	return res.data;
}

export async function generateAIResponse(
	brandId: string
): Promise<ResponseItem> {
	const res = await api.post(`/responses/brands/${brandId}/generate`);

	return res.data;
}
