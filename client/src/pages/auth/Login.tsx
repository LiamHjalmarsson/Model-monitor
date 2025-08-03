import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {MdLockOutline} from "react-icons/md";
import {AxiosError} from "axios";
import {useAuthStore} from "../../store/auth";
import {login} from "../../api/auth";
import InputField from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function Login() {
	const [email, setEmail] = useState("");

	const [password, setPassword] = useState("");

	const [error, setError] = useState("");

	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const loginStore = useAuthStore((state) => state.login);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setError("");

		setLoading(true);

		try {
			const {token, user} = await login(email, password);

			loginStore(token, user.email);

			navigate("/");
		} catch (err) {
			const axiosErr = err as AxiosError<{message: string}>;

			setError(axiosErr.response?.data?.message || "Login failed");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="relative min-h-screen flex items-center justify-center bg-gray-900">
			<div
				className="absolute inset-0 bg-cover bg-center opacity-40"
				style={{backgroundImage: "url('/bg.png')"}}
			/>

			<div className="absolute inset-0 bg-primary-500/10" />

			<form
				onSubmit={handleSubmit}
				className="relative z-10 w-full max-w-[450px] bg-white/20 backdrop-blur-lg rounded-2xl p-xl shadow-lg"
			>
				<h2 className="text-2xl font-bold text-white mb-xl flex items-center">
					<MdLockOutline size={28} className="mr-sm" />
					Sign In
				</h2>

				<div className="space-y-xl">
					<InputField
						label="Email"
						type="email"
						value={email}
						onChange={setEmail}
						placeholder="you@example.com"
					/>

					<InputField
						label="Password"
						type="password"
						value={password}
						onChange={setPassword}
						placeholder="••••••••"
					/>

					{error && <p className="text-red-400 text-sm">{error}</p>}

					<Button type="submit" disabled={loading} className="w-full">
						{loading ? "Signing In..." : "Sign In"}
					</Button>
				</div>

				<p className="mt-lg text-center text-sm text-gray-200">
					Don't have an account?{" "}
					<Link to="/register" className="text-primary-500 block mt-xxs font-bold hover:underline">
						Register
					</Link>
				</p>
			</form>
		</div>
	);
}
