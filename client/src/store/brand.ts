import { create } from "zustand";
import type { Brand } from "../api/brand";
import { createBrand, updateBrand, deleteBrand, getBrands } from "../api/brand";

interface BrandStore {
	currentBrand: Brand | null;
	brands: Brand[];
	loading: boolean;

	getBrands: () => Promise<void>;
	createBrand: (data: Partial<Brand>) => Promise<void>;
	updateBrand: (id: string, data: Partial<Brand>) => Promise<void>;
	deleteBrand: (id: string) => Promise<void>;
}

export const useBrandStore = create<BrandStore>((set) => ({
	currentBrand: null,
	brands: [],
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
			brands: state.brands.filter((b) => b.id !== id),
			currentBrand: null,
		}));
	},
}));
