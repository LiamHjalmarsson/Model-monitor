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
	brands: [],
	responses: [],
	loading: false,

	getBrands: async () => {
		const brands = await getBrands();

		set({ brands });
	},

	createBrand: async (data) => {
		const brand = await createBrand(data);

		set((state) => ({
			brands: [brand, ...state.brands],
			currentBrand: brand,
		}));
	},

	updateBrand: async (id, data) => {
		const updated = await updateBrand(id, data);

		set({ currentBrand: updated });
	},

	deleteBrand: async (id) => {
		await deleteBrand(id);

		set((state) => ({
			brands: state.brands.filter((brand) => brand.id !== id),
			currentBrand: null,
			responses: [],
		}));
	},

	getResponsesForBrand: async (id) => {
		const responses = await getResponsesForBrand(id);

		set({ responses });
	},
}));
