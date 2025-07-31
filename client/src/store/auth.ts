import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logout } from '../api/auth';

export interface AuthState {
	token: string | null;
	userEmail: string | null;
	login: (token: string, userEmail: string) => void;
	logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			token: null,
			userEmail: null,
			login: (token: string, userEmail: string) => set({ token, userEmail }),
			logout: async () => {
				try {
					await logout();
				} catch (error) {
					console.error("Logout API call failed:", error);
				}
				set({ token: null, userEmail: null });
			},
		}),
		{
			name: 'auth-storage',
		}
	)
);