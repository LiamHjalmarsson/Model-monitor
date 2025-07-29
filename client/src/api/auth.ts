import api from "./axios";

export interface LoginResponse {
	token: string;
	user: { id: number; email: string };
}

export async function login(email: string, password: string) {
	const res = await api.post("/auth/login", { email, password });

	return res.data;
}

export async function logout() {
	const res = await api.post("/auth/logout");

	return res.data;
}
