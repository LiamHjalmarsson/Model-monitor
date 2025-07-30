import { MdDashboard, MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";

export function Sidebar() {
	const navigate = useNavigate();

	const logout = useAuthStore((state) => state.logout);

	const handleLogout = () => {
		logout();

		navigate("/login");
	};

	return (
		<aside className="w-64 bg-white shadow-md border-r border-gray-200 pt-xxl px-xl pb-xl flex flex-col">
			<h2 className="text-2xl font-bold text-primary-500 mb-xl flex items-center">
				Model Monitor
			</h2>
			<nav className="flex flex-col space-y-md text-gray-dark text-md flex-1">
				<Link
					to="/"
					className="flex items-center hover:text-primary-600 transition font-semibold"
				>
					<MdDashboard size={20} className="mr-md" />
					Dashboard
				</Link>
				<button
					onClick={handleLogout}
					className="flex items-center hover:text-red-500 transition mt-auto pt-md border-t text-md cursor-pointer"
				>
					<MdLogout size={18} className="mr-md" />
					Log out
				</button>
			</nav>
		</aside>
	);
}
