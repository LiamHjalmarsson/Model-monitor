import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthState {
	token: string | null;
	userEmail: string | null;
	login: (token: string, userEmail: string) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			token: null,
			userEmail: null,
			login: (token, userEmail) => set({ token, userEmail }),
			logout: () => set({ token: null, userEmail: null }),
		}),
		{
			name: "auth-storage",
		}
	)
);
