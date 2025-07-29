import api from "./axios";
import type { ResponseItem } from "./response";

export interface Brand {
	id: string;
	name: string;
	prompt: string;
}

export async function getBrands(): Promise<Brand[]> {
	const res = await api.get("/brands");

	return res.data;
}

export async function createBrand(data: Partial<Brand>): Promise<Brand> {
	const res = await api.post("/brands", data);

	return res.data;
}

export async function getResponsesForBrand(
	brandId: string
): Promise<ResponseItem[]> {
	const res = await api.get(`/brands/${brandId}/responses`);

	return res.data;
}

export async function updateBrand(
	id: string,
	data: Partial<Brand>
): Promise<Brand> {
	const res = await api.put(`/brands/${id}`, data);

	return res.data;
}

export async function deleteBrand(id: string): Promise<void> {
	const res = await api.delete(`/brands/${id}`);

	return res.data;
}
