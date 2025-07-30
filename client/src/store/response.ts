import { create } from "zustand";
import type { ResponseItem } from "../api/response";
import {
	getResponsesForBrand,
	getResponseById,
	createResponse,
	generateAIResponse,
	getUserOwnedResponseById,
} from "../api/response";
import { createRating, updateRating } from "../api/rating";

interface ResponseStore {
	responses: ResponseItem[];
	currentResponse: ResponseItem | null;
	loading: boolean;

	getResponsesForBrand: (brandId: number) => Promise<void>;
	getResponseById: (id: number) => Promise<void>;
	getUserOwnedResponseById: (id: number) => Promise<void>;
	createResponse: (brandId: number) => Promise<void>;
	generateAIResponse: (brandId: number) => Promise<void>;
	rateResponse: (
		responseId: number,
		rating: 0 | 1,
		ratingId?: number
	) => Promise<void>;
	clearResponses: () => void;
}

export const useResponseStore = create<ResponseStore>((set) => ({
	responses: [],
	currentResponse: null,
	loading: false,

	getResponsesForBrand: async (brandId) => {
		set({ loading: true });

		const data = await getResponsesForBrand(brandId);

		set({ responses: data, loading: false });
	},

	getResponseById: async (id) => {
		set({ loading: true });

		const data = await getResponseById(id);

		set({ currentResponse: data, loading: false });
	},

	getUserOwnedResponseById: async (id) => {
		set({ loading: true });

		const data = await getUserOwnedResponseById(id);

		set({ currentResponse: data, loading: false });
	},

	createResponse: async (brandId) => {
		const res = await createResponse(brandId);

		set((state) => ({
			responses: [res, ...state.responses],
		}));
	},

	generateAIResponse: async (brandId) => {
		const res = await generateAIResponse(brandId);

		set((state) => ({
			responses: [res, ...state.responses],
		}));
	},

	rateResponse: async (responseId, rating) => {
		try {
			const rated = await createRating(responseId, rating);

			set((state) => ({
				responses: state.responses.map((res) =>
					res.id === rated.response_id
						? { ...res, rating: rated.rating }
						: res
				),
			}));
		} catch (err: any) {
			if (err?.response?.status === 409) {
				const existing = await getResponseById(responseId);

				if (existing) {
					const updated = await updateRating(existing.id, rating);

					set((state) => ({
						responses: state.responses.map((res) =>
							res.id === updated.response_id
								? { ...res, rating: updated.rating }
								: res
						),
					}));
				}
			} else {
				console.error("Rating error", err);
			}
		}
	},

	clearResponses: () => {
		set({ responses: [], currentResponse: null });
	},
}));
