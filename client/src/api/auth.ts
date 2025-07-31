import api from "./axios";

export interface LoginResponse {
	token: string;
	user: { id: number; email: string };
}

export interface LogoutResponse {
	message: string;
}

/**
 * Log in a user with email and password.
 */
export async function login(email: string, password: string): Promise<LoginResponse> {
	const { data } = await api.post<LoginResponse>("/auth/login", {
		email,
		password,
	});

	return data;
}

/**
 * Log out the current user.
 */
export async function logout(): Promise<LogoutResponse> {
	const { data } = await api.post<LogoutResponse>('/auth/logout');

	return data;
}