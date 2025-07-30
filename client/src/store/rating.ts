import { create } from "zustand";
import type { Rating } from "../api/rating";
import { getRatings } from "../api/rating";

interface RatingStore {
	ratings: Rating[];
	fetchRatings: (responseId?: number) => Promise<void>;
}

export const useRatingStore = create<RatingStore>((set) => ({
	ratings: [],
	fetchRatings: async () => {
		const data = await getRatings();

		set({ ratings: data });
	},
}));
