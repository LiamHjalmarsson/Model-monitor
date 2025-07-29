import type { FC } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
	{ label: "Dashboard", to: "/" },
	{ label: "Analytics", to: "/analytics" },
	{ label: "Settings", to: "/settings" },
];

const Sidebar: FC = () => (
	<nav className="h-full flex flex-col p-6 space-y-4">
		{navItems.map((item) => (
			<NavLink
				key={item.to}
				to={item.to}
				className={({ isActive }) =>
					`block px-4 py-2 rounded-lg transition-colors duration-200 font-medium
          ${
				isActive
					? "bg-white/30 text-white"
					: "text-gray-200 hover:bg-white/10 hover:text-white"
			}`
				}
			>
				{item.label}
			</NavLink>
		))}
	</nav>
);

export default Sidebar;
