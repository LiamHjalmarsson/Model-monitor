import {create} from "zustand";
import type {Brand} from "../api/brand";
import {createBrand, updateBrand, deleteBrand, getBrands} from "../api/brand";

interface BrandStore {
	currentBrand: Brand | null;
	brands: Brand[];
	loading: boolean;
	getBrands: () => Promise<void>;
	createBrand: (data: Partial<Brand>) => Promise<void>;
	updateBrand: (id: number, data: Partial<Brand>) => Promise<void>;
	deleteBrand: (id: number) => Promise<void>;
}

export const useBrandStore = create<BrandStore>((set) => ({
	currentBrand: null,
	loading: false,
	brands: [],

	getBrands: async () => {
		try {
			const brands = await getBrands();

			set({brands, loading: false});
		} catch {
			set({loading: false});
		}
	},

	createBrand: async (payload: Partial<Brand>) => {
		set({loading: true});
		try {
			const brand = await createBrand(payload);

			set((state) => ({
				brands: [brand, ...state.brands],
				currentBrand: brand,
				loading: false,
			}));
		} catch {
			set({loading: false});
		}
	},

	updateBrand: async (id: number, payload: Partial<Brand>) => {
		set({loading: true});

		try {
			const updated = await updateBrand(id, payload);

			set((state) => ({
				brands: state.brands.map((brand) => (brand.id === id ? updated : brand)),
				currentBrand: updated,
				loading: false,
			}));
		} catch {
			set({loading: false});
		}
	},

	deleteBrand: async (id: number) => {
		set({loading: true});

		try {
			await deleteBrand(id);

			set((state) => ({
				brands: state.brands.filter((brand) => brand.id !== id),
				currentBrand: null,
				loading: false,
			}));
		} catch {
			set({loading: false});
		}
	},
}));
