import { create } from "zustand";
import type { Brand } from "../api/brand";
import type { ResponseItem } from "../api/response";
import { createBrand, updateBrand, deleteBrand, getBrands } from "../api/brand";
import { getResponsesForBrand } from "../api/response";

interface BrandStore {
	currentBrand: Brand | null;
	brands: Brand[];
	responses: ResponseItem[];
	loading: boolean;
	getBrands: () => Promise<void>;
	createBrand: (data: Partial<Brand>) => Promise<void>;
	updateBrand: (id: number, data: Partial<Brand>) => Promise<void>;
	deleteBrand: (id: number) => Promise<void>;
	getResponsesForBrand: (id: number) => Promise<void>;
}

export const useBrandStore = create<BrandStore>((set) => ({
	currentBrand: null,
	loading: false,
	brands: [],
	responses: [],

	getBrands: async () => {
		try {
			const brands = await getBrands();

			set({ brands, loading: false });
		} catch (error) {
			set({ loading: false });
		}
	},

	createBrand: async (payload: Partial<Brand>) => {
		set({ loading: true });
		try {
			const brand = await createBrand(payload);

			set((state) => ({
				brands: [ brand, ...state.brands ],
				currentBrand: brand,
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
		}
	},

	updateBrand: async (id: number, payload: Partial<Brand>) => {
		set({ loading: true });

		try {
			const updated = await updateBrand(id, payload);

			set((state) => ({
				brands: state.brands.map((brand) => (brand.id === id ? updated : brand)),
				currentBrand: updated,
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
		}
	},

	deleteBrand: async (id: number) => {
		set({ loading: true });

		try {
			await deleteBrand(id);

			set((state) => ({
				brands: state.brands.filter((brand) => brand.id !== id),
				currentBrand: null,
				responses: [],
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
		}
	},

	getResponsesForBrand: async (id: number) => {
		set({ loading: true });

		try {
			const responses = await getResponsesForBrand(id);

			set({ responses, loading: false });
		} catch (error) {
			set({ loading: false });
		}
	},
}));
