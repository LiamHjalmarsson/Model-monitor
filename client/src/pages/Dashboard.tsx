import { useEffect, useState } from "react";
import { useBrandStore } from "../store/brand";
import {
	MdOutlineBrandingWatermark,
	MdDashboard,
	MdLogout,
} from "react-icons/md";
import {
	FiArrowRightCircle,
	FiPlusCircle,
	FiRefreshCw,
	FiTrendingUp,
} from "react-icons/fi";
import { FaRegComments } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Dashboard() {
	const { brands, getBrands, createBrand } = useBrandStore();
	const [showModal, setShowModal] = useState(false);
	const [formData, setFormData] = useState({ name: "", prompt: "" });
	const [error, setError] = useState("");

	useEffect(() => {
		getBrands();
	}, [getBrands]);

	const handleCreateBrand = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!formData.name || !formData.prompt) {
			setError("Name and prompt are required.");
			return;
		}

		try {
			await createBrand(formData);
			setShowModal(false);
			setFormData({ name: "", prompt: "" });
		} catch (err) {
			setError("Failed to create brand.");
		}
	};

	const latestBrand = brands[0];

	return (
		<div className="flex min-h-screen bg-gray-50">
			{/* Sidebar */}
			<aside className="w-64 bg-white shadow-md border-r border-gray-200 pt-xxl px-xl pb-xl flex flex-col">
				<h2 className="text-2xl font-bold text-blue-600 mb-xl flex items-center gap-2">
					Model Monitor
				</h2>
				<nav className="flex flex-col gap-4 text-gray-700 text-md">
					<div className="flex-1 flex-grow h-full">
						<Link to="/" className="flex items-center gap-3 hover:text-blue-600 transition">
							<MdDashboard size={20} />
							Dashboard
						</Link>
					</div>		

					<Link
						to="/login"
						className="flex items-center gap-3 hover:text-red-500 transition mt-auto pt-4 border-t text-sm"
						>
						<MdLogout size={18} />
						Log out
					</Link>
				</nav>
			</aside>

			{/* Main */}
			<main className="flex-1 p-8">
				<header className="mb-10">
					<h1 className="text-3xl font-bold text-gray-800 mb-1">Dashboard</h1>
					<p className="text-gray-500">Overview of your brands and performance</p>
				</header>

				{/* Brand Cards */}
				<section>
					<h2 className="text-xl font-semibold text-gray-700 mb-4">
						Your Brands
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{brands.map((brand) => (
							<Link
								to={`/brands/${brand.id}`}
								key={brand.id}
								className="bg-white p-5 rounded-xl shadow hover:shadow-lg border hover:border-blue-500 transition flex flex-col gap-2 group"
							>
								<h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
									{brand.name}
									<FiArrowRightCircle className="ml-auto text-blue-500 group-hover:translate-x-1 transition-transform" />
								</h3>
								<p className="text-gray-500 text-sm">{brand.prompt}</p>
							</Link>
						))}

						{/* Add Brand */}
						<button
							onClick={() => setShowModal(true)}
							className="border-dashed border-2 border-gray-400 p-6 rounded-xl flex flex-col justify-center items-center text-gray-500 hover:border-blue-400 hover:text-blue-500 transition"
						>
							<FiPlusCircle size={36} />
							<p className="mt-2 text-sm font-medium">Create New Brand</p>
						</button>
					</div>
				</section>

				{/* Stats */}
				<section className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<StatCard
						title="Total Brands"
						icon={<FiRefreshCw size={28} />}
						color="indigo"
						value={brands.length}
					/>
					<StatCard
						title="Tracked Responses"
						icon={<FaRegComments size={26} />}
						color="green"
						value={brands.length * 2}
					/>
					<StatCard
						title="Avg. Rating"
						icon={<FiTrendingUp size={26} />}
						color="yellow"
						value={"92%"}
					/>
					<StatCard
						title="Top Brand"
						icon={<MdOutlineBrandingWatermark size={26} />}
						color="purple"
						value={brands[0]?.name || "-"}
					/>
				</section>

				{/* Latest Brand Preview */}
				{latestBrand && (
					<section className="mt-14">
						<h3 className="text-xl font-semibold text-gray-700 mb-3">Latest Brand</h3>
						<div className="bg-white p-6 rounded-lg border shadow flex flex-col gap-2">
							<h4 className="text-lg font-semibold text-gray-800">
								{latestBrand.name}
							</h4>
							<p className="text-sm text-gray-600 whitespace-pre-wrap">
								{latestBrand.prompt}
							</p>
							<Link
								to={`/brands/${latestBrand.id}`}
								className="mt-2 text-sm text-blue-600 hover:underline"
							>
								View Details →
							</Link>
						</div>
					</section>
				)}
			</main>

			{/* Modal */}
			{showModal && (
				<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
					<div className="bg-white p-xl rounded-xl w-full max-w-[450px] relative shadow-xl">
						<button
							onClick={() => setShowModal(false)}
							className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl"
						>
							×
						</button>
						<h2 className="text-xl font-bold mb-5">Create New Brand</h2>
						<form onSubmit={handleCreateBrand} className="space-y-xl">
							<input
								type="text"
								placeholder="Brand Name"
								value={formData.name}
								onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								className="w-full border px-4 py-2 rounded-lg"
							/>
							<textarea
								placeholder="Prompt"
								value={formData.prompt}
								onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
								className="w-full border px-4 py-2 rounded-lg min-h-[100px]"
							/>
							{error && <p className="text-red-500 text-sm">{error}</p>}
							<button
								type="submit"
								className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg w-full"
							>
								Create Brand
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}

function StatCard({
	title,
	value,
	icon,
	color,
}: {
	title: string;
	value: string | number;
	icon: React.ReactNode;
	color: "blue" | "green" | "indigo" | "yellow" | "purple";
}) {
	const colorMap: Record<typeof color, string> = {
		blue: "text-blue-500",
		green: "text-green-500",
		indigo: "text-indigo-500",
		yellow: "text-yellow-500",
		purple: "text-purple-500",
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
			<div>{icon}</div>
			<div>
				<p className="text-sm text-gray-500">{title}</p>
				<p className="text-lg font-semibold text-gray-800">{value}</p>
			</div>
		</div>
	);
}
