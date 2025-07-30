import { useState } from "react";
import type { FC } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { login } from "../../api/auth";
import Input from "../../components/ui/Input";
import PrimaryButton from "../../components/ui/PrimaryButton";

const Login: FC = () => {
	const [email, setEmail] = useState("");

	const [password, setPassword] = useState("");

	const [error, setError] = useState("");

	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const loginStore = useAuthStore((state) => state.login);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setError("");

		setLoading(true);

		try {
			const { token, user } = await login(email, password);

			loginStore(token, user.email);

			navigate("/");
		} catch (err) {
			const axiosErr = err as AxiosError<{ message: string }>;
			
			setError(axiosErr.response?.data?.message || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-600 to-cyan-600 px-4">
			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-25"
				style={{ backgroundImage: `url('/bg.png')` }}
			/>
			<div className="w-full max-w-[450px] p-xxl space-y-xxl rounded-xl bg-blue-200/30 border border-white/30 backdrop-blur-3xl shadow-lg z-10">
				<div className="text-center">
					<h1 className="text-heading-lg font-bold text-black">Login</h1>
					<p className="text-gray-dark text-lg font-semibold mt-xs">Welcome back!</p>
				</div>

				{error && (
					<div className="text-red-700 bg-red-100 border border-red-300 rounded-lg px-md py-sm text-center">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-xl">
					<Input
						name="email"
						label="Email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						autoComplete="email"
						error={error}
						className="glass-input"
					/>

					<Input
						name="password"
						label="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete="current-password"
						className="glass-input"
					/>

					<div className="flex justify-center text-sm text-gray-600 font-medium cursor-pointer hover:underline">
						Forgot password?
					</div>

					<PrimaryButton
						label={loading ? "Logging in..." : "Login"}
						type="submit"
					/>
				</form>
			</div>
		</div>
	);
};

export default Login;
