import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logout } from '../api/auth';

export interface AuthState {
	token: string | null;
	userEmail: string | null;
	loading: boolean;
	login: (token: string, userEmail: string) => void;
	logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			token: null,
			userEmail: null,
			loading: false,
			login: (token: string, userEmail: string) => set({ token, userEmail }),
			logout: async () => {
				set({ loading: true });

				try {
					await logout();

					set({ token: null, userEmail: null, loading: false });
				} catch (error) {
					set({ loading: false });
				}
			},
		}),
		{
			name: 'auth-storage',
		}
	)
);