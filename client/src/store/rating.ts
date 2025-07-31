import { create } from "zustand";
import type { Rating } from "../api/rating";
import { getRatings } from "../api/rating";

interface RatingStore {
	ratings: Rating[];
	loading: boolean;
	fetchRatings: (responseId?: number) => Promise<void>;
}

export const useRatingStore = create<RatingStore>((set) => ({
	ratings: [],
	loading: false,
	fetchRatings: async () => {
		set({ loading: true });

		try {
			const ratings = await getRatings();

			set({ ratings, loading: false });
		} catch (error) {
			set({ loading: false });
		}
	},
}));
