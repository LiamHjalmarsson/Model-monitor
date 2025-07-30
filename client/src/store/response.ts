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

	rateResponse: async (responseId, rating, ratingId) => {
		const rated = ratingId
			? await updateRating(ratingId, { rating })
			: await createRating({ responseId, rating });

		set((state) => ({
			responses: state.responses.map((response) =>
				response.id === rated.response_id
					? { ...response, rating: rated.rating }
					: response
			),
		}));
	},

	clearResponses: () => {
		set({ responses: [], currentResponse: null });
	},
}));
