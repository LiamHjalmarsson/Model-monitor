import { useEffect, useState } from "react";
import { useBrandStore } from "../store/brand";
import { useNavigate } from "react-router-dom";
import { createBrand, getBrands } from "../api/brand";
import { getResponsesForBrand } from "../api/response";

export default function Dashboard() {
	const [modalOpen, setModalOpen] = useState(false);
	const [name, setName] = useState("");
	const [prompt, setPrompt] = useState("");
	const [latestResponses, setLatestResponses] = useState<Record<string, string>>({});
	const [loading, setLoading] = useState(false);

	const { brands, getBrands } = useBrandStore();
	const navigate = useNavigate();

	useEffect(() => {
		getBrands();
	}, []);

	useEffect(() => {
		const fetchResponses = async () => {
			const data: Record<string, string> = {};
			for (const brand of brands) {
				const responses = await getResponsesForBrand(brand.id);
				if (responses.length > 0) {
					data[brand.id] = responses[0].createdAt;
				}
			}
			setLatestResponses(data);
		};

		if (brands.length > 0) {
			fetchResponses();
		}
	}, [brands]);

	const handleCreate = async () => {
		if (!name || !prompt) return;

		setLoading(true);
		const brand = await createBrand({ name, prompt });
		setLoading(false);
		setModalOpen(false);
		setName("");
		setPrompt("");
		await getBrands();
		navigate(`/brands/${brand.id}`);
	};

	return (
		<div className="min-h-screen flex bg-gray-100">
			{/* Sidebar */}
			<div className="w-64 bg-white border-r p-6 flex flex-col justify-between">
				<div>
					<h1 className="text-xl font-bold mb-6">Model Monitor</h1>
					<nav className="space-y-2">
						<div className="text-gray-700 font-medium">Dashboard</div>
					</nav>
				</div>
				<button className="text-red-500">Logout</button>
			</div>

			{/* Main */}
			<div className="flex-1 p-6">
				{/* Header */}
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-semibold text-gray-800">Your Brands</h2>
					<button
						onClick={() => setModalOpen(true)}
						className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
					>
						New Brand
					</button>
				</div>

				{/* Brand Cards */}
				{brands.length === 0 ? (
					<p className="text-gray-500">You have no brands yet.</p>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
						{brands.map((brand) => (
							<div
								key={brand.id}
								className="bg-white p-5 rounded-xl shadow hover:shadow-md transition cursor-pointer"
								onClick={() => navigate(`/brands/${brand.id}`)}
							>
								<h3 className="text-lg font-semibold mb-2">{brand.name}</h3>
								<p className="text-sm text-gray-600 line-clamp-2 mb-3">{brand.prompt}</p>
								<div className="text-xs text-gray-400">
									Last response:{" "}
									{latestResponses[brand.id]
										? new Date(latestResponses[brand.id]).toLocaleDateString()
										: "No responses"}
								</div>
							</div>
						))}
					</div>
				)}

				{/* Modal */}
				{modalOpen && (
					<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
						<div className="bg-white w-full max-w-[450px] p-xl rounded-lg shadow-lg relative">
							<button
								onClick={() => setModalOpen(false)}
								className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
							>
								x
							</button>
							<h2 className="text-xl font-bold mb-4">Create New Brand</h2>

							<div className="space-y-xl">
								<div>
									<label className="block mb-1 text-sm font-medium">Brand Name</label>
									<input
										type="text"
										value={name}
										onChange={(e) => setName(e.target.value)}
										className="w-full border rounded px-3 py-2 outline-none"
										placeholder="e.g. Spotify"
									/>
								</div>
								<div>
									<label className="block mb-1 text-sm font-medium">Prompt</label>
									<input
										type="text"
										value={prompt}
										onChange={(e) => setPrompt(e.target.value)}
										className="w-full border rounded px-3 py-2 outline-none"
										placeholder="e.g. How is Spotify perceived by Gen Z?"
									/>
								</div>
								<button
									disabled={loading}
									onClick={handleCreate}
									className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
								>
									{loading ? "Creating..." : "Create"}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
