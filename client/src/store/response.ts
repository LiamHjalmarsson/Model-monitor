import {create} from "zustand";
import type {ResponseItem} from "../api/response";
import {
	getResponsesForBrand,
	getResponseById,
	createResponse,
	generateAIResponse,
	getUserOwnedResponseById,
} from "../api/response";
import {createRating, updateRating} from "../api/rating";

interface ResponseStore {
	responses: ResponseItem[];
	currentResponse: ResponseItem | null;
	loading: boolean;
	getResponsesForBrand: (brandId: number) => Promise<void>;
	getResponseById: (id: number) => Promise<void>;
	getUserOwnedResponseById: (id: number) => Promise<void>;
	createResponse: (brandId: number) => Promise<void>;
	generateAIResponse: (brandId: number) => Promise<void>;
	rateResponse: (responseId: number, rating: 0 | 1, ratingId?: number) => Promise<void>;
	clearResponses: () => void;
}

export const useResponseStore = create<ResponseStore>((set) => ({
	currentResponse: null,
	loading: false,
	responses: [],

	getResponsesForBrand: async (brandId: number) => {
		set({loading: true});

		try {
			const responses = await getResponsesForBrand(brandId);

			set({responses, loading: false});
		} catch {
			set({loading: false});
		}
	},

	getResponseById: async (id: number) => {
		set({loading: true});

		try {
			const response = await getResponseById(id);

			set({currentResponse: response, loading: false});
		} catch {
			set({loading: false});
		}
	},

	getUserOwnedResponseById: async (id: number) => {
		set({loading: true});
		try {
			const response = await getUserOwnedResponseById(id);

			set({currentResponse: response, loading: false});
		} catch {
			set({loading: false});
		}
	},

	createResponse: async (brandId: number) => {
		set({loading: true});

		try {
			const response = await createResponse(brandId);

			set((state) => ({
				responses: [response, ...state.responses],
				loading: false,
			}));
		} catch {
			set({loading: false});
		}
	},

	generateAIResponse: async (brandId: number) => {
		set({loading: true});

		try {
			const response = await generateAIResponse(brandId);

			set((state) => ({
				responses: [response, ...state.responses],
				loading: false,
			}));
		} catch {
			set({loading: false});
		}
	},

	rateResponse: async (responseId: number, rating: 0 | 1) => {
		try {
			const rated = await createRating(responseId, rating);

			set((state) => ({
				responses: state.responses.map((res) =>
					res.id === rated.response_id ? {...res, rating: rated.rating} : res
				),
			}));
		} catch {
			const existing = await getResponseById(responseId);

			if (existing) {
				const updated = await updateRating(existing.id, rating);

				set((state) => ({
					responses: state.responses.map((res) =>
						res.id === updated.response_id ? {...res, rating: updated.rating} : res
					),
				}));
			}
		}
	},

	clearResponses: () => {
		set({responses: [], currentResponse: null});
	},
}));
