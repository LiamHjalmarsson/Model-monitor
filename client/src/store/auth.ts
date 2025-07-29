import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
    token: string | null
    email: string | null
    isAuthenticated: () => boolean
    login: (token: string, email: string) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            email: null,

            isAuthenticated: () => !!get().token,

            login: (token, email) => {
                set({ token, email: email })
            },

            logout: () => {
                set({ token: null, email: null })
            },
        }),
        {
            name: 'auth-storage',
        }
    )
)
