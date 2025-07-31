import api from "./axios";

export interface Rating {
	id: number;
	response_id: number;
	rating: 0 | 1;
	user_id: number;
}

export interface CreateRatingInput {
	responseId: number;
	rating: 0 | 1;
}

export interface UpdateRatingInput {
	rating: 0 | 1;
}

/**
 * Fetch all ratings.
 */
export async function getRatings(): Promise<Rating[]> {
	const { data } = await api.get<Rating[]>("/ratings");

	return data;
}

/**
 * Fetch a rating by its ID.
 */
export async function getRatingById(id: number): Promise<Rating> {
	const { data } = await api.get<Rating>(`/ratings/${id}`);

	return data;
}

/**
 * Create a new rating for a response.
 */
export async function createRating(responseId: number, rating: 0 | 1): Promise<Rating> {
	const res = await api.post("/ratings", {
		responseId,
		rating,
	});

	return res.data;
}

/**
 * Update an existing rating.
 */
export async function updateRating(id: number, rating: 0 | 1): Promise<Rating> {
	const { data } = await api.put<Rating>(`/ratings/${id}`, {
		rating
	});

	return data;
}
