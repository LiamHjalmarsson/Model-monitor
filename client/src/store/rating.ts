import { create } from "zustand";
import type { Rating } from "../api/rating";
import { createRating, getRatings, updateRating } from "../api/rating";

interface RatingStore {
	ratings: Rating[];
	loading: boolean;
	fetchRatings: (responseId?: number) => Promise<void>;
	addRating: (payload: {
		responseId: number;
		rating: 0 | 1;
	}) => Promise<void>;
	editRating: (id: number, rating: 0 | 1) => Promise<void>;
}

export const useRatingStore = create<RatingStore>((set) => ({
	loading: false,
	ratings: [],
	fetchRatings: async () => {
		set({ loading: true });

		try {
			const ratings = await getRatings();

			set({ ratings, loading: false });
		} catch {
			set({ loading: false });
		}
	},

	addRating: async ({ responseId, rating }) => {
		const newRating = await createRating(responseId, rating);
		set((state) => ({ ratings: [...state.ratings, newRating] }));
	},

	editRating: async (id, rating) => {
		const updated = await updateRating(id, rating);
		set((state) => ({
			ratings: state.ratings.map((r) => (r.id === id ? updated : r)),
		}));
	},
}));
