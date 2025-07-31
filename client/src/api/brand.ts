import api from "./axios";
import type { ResponseItem } from "./response";

export interface Brand {
	id: number;
	name: string;
	prompt: string;
	created_by: number;
}

/**
 * Fetch all brands.
 */
export async function getBrands(): Promise<Brand[]> {
	const { data } = await api.get<Brand[]>("/brands");

	return data;
}

/**
 * Fetch responses for a specific brand.
 */
export async function getResponsesForBrand(brandId: number): Promise<ResponseItem[]> {
	const { data } = await api.get<ResponseItem[]>(`/brands/${brandId}/responses`);

	return data;
}

/**
 * Create a new brand.
 */
export async function createBrand(payload: Partial<Brand>): Promise<Brand> {
	const { data: created } = await api.post<Brand>("/brands", payload);

	return created;
}

/**
 * Update an existing brand.
 */
export async function updateBrand(id: number, payload: Partial<Brand>): Promise<Brand> {
	const { data: updated } = await api.put<Brand>(`/brands/${id}`, payload);

	return updated;
}

/**
 * Delete a brand by its ID.
 */
export async function deleteBrand(id: number): Promise<void> {
	await api.delete<void>(`/brands/${id}`);
}
