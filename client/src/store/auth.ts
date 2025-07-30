import { create } from "zustand";
import { persist } from "zustand/middleware";
import { logout } from "../api/auth";

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

			logout: async () => {
				try {
					await logout();
				} catch (err) {
					console.error("Logout API call failed:", err);
				}
				set({ token: null, userEmail: null });
			},
		}),
		{
			name: "auth-storage",
		}
	)
);
