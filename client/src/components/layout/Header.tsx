import { useAuthStore } from "../../store/auth";
import { useNavigate } from "react-router-dom";

export default function Header() {
	const userEmail = useAuthStore((state) => state.userEmail);
	const logout = useAuthStore((state) => state.logout);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<div className="flex items-center justify-between">
			<h1 className="text-2xl font-bold text-white">
				Welcome, {userEmail}
			</h1>
			<button
				onClick={handleLogout}
				className="px-4 py-2 bg-white/20 backdrop-filter backdrop-blur-sm rounded-md text-white hover:bg-white/30"
			>
				Logout
			</button>
		</div>
	);
}
