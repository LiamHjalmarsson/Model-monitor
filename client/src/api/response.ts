import api from "./axios";

export interface ResponseItem {
	id: string;
	text: string;
	createdAt: string;
	rating: "up" | "down" | null;
	brandId: string;
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
