import api from "./axios";

export interface Rating {
	id: string;
	responseId: string;
	value: "up" | "down";
	userId: string;
	createdAt: string;
}

export async function getRatings(): Promise<Rating[]> {
	const res = await api.get("/ratings");

	return res.data;
}

export async function getRatingById(id: string): Promise<Rating> {
	const res = await api.get(`/ratings/${id}`);

	return res.data;
}

export async function createRating(
	responseId: string,
	value: "up" | "down"
): Promise<Rating> {
	const res = await api.post("/ratings", { responseId, value });

	return res.data;
}

export async function updateRating(
	id: string,
	value: "up" | "down"
): Promise<Rating> {
	const res = await api.put(`/ratings/${id}`, { value });

	return res.data;
}
