import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
	MdOutlineBrandingWatermark,
	MdDashboard,
	MdLogout,
} from "react-icons/md";
import {
	FiArrowRightCircle,
	FiPlusCircle,
	FiZap,
} from "react-icons/fi";
import { FaRegComments } from "react-icons/fa";
import type { ResponseItem } from "../../api/response";

export default function BrandPage() {
	const { brandId } = useParams();
	const [showModal, setShowModal] = useState(false);
	const [formData, setFormData] = useState({ content: "" });

	const [editingResponse, setEditingResponse] = useState<ResponseItem | null>(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [editContent, setEditContent] = useState("");
	const [editError, setEditError] = useState("");


	// Dummy brand and responses – replace with API later
	const brand = {
		id: brandId!,
		name: "Nike",
		prompt: "How is Nike perceived among Gen Z consumers?",
	};

	const [responses, setResponses] = useState([
		{
			id: "1",
			content:
				"Nike is often seen as a symbol of athletic excellence and youth culture.",
			createdAt: new Date().toISOString(),
		},
		{
			id: "1",
			content:
				"Nike is often seen as a symbol of athletic excellence and youth culture.",
			createdAt: new Date().toISOString(),
		},
		{
			id: "1",
			content:
				"Nike is often seen as a symbol of athletic excellence and youth culture.",
			createdAt: new Date().toISOString(),
		},
	]);

	const handleCreateResponse = (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.content) return;

		const newResponse = {
			id: crypto.randomUUID(),
			content: formData.content,
			createdAt: new Date().toISOString(),
		};

		setResponses([newResponse, ...responses]);
		setFormData({ content: "" });
		setShowModal(false);
	};

	const handleEdit = (res: ResponseItem) => {
	setEditingResponse(res);
	setShowEditModal(true);
};

const handleDelete = async (id: string) => {
	if (confirm("Are you sure you want to delete this response?")) {
		await deleteResponse(id); // Du behöver implementera denna
		getResponsesForBrand(currentBrandId);
	}
};

const handleRate = async (
	responseId: string,
	rating: "up" | "down",
	ratingId?: string
) => {
	await rateResponse(responseId, rating, ratingId);
};

const handleEdit = (res: ResponseItem) => {
	setEditingResponse(res);
	setEditContent(res.content);
	setEditError("");
	setShowEditModal(true);
};

const handleUpdateResponse = async (e: React.FormEvent) => {
	e.preventDefault();

	if (!editingResponse) return;

	if (!editContent.trim()) {
		setEditError("Response cannot be empty");
		return;
	}

	try {
		await updateResponse(editingResponse.id, editContent); // Skapa denna i din API
		await getResponsesForBrand(currentBrandId); // Uppdatera listan
		setShowEditModal(false);
		setEditingResponse(null);
	} catch {
		setEditError("Failed to update response");
	}
};

	return (
		<div className="flex min-h-screen bg-gray-50">
			{/* Sidebar */}
			<aside className="w-64 bg-white shadow-md border-r border-gray-200 p-6 flex flex-col">
				<h2 className="text-2xl font-bold text-blue-600 mb-8 flex items-center gap-2">
					<MdOutlineBrandingWatermark size={28} />
					Model Monitor
				</h2>
				<nav className="flex flex-col gap-4 text-gray-700 text-md">
					<Link
						to="/"
						className="flex items-center gap-3 hover:text-blue-600 transition"
					>
						<MdDashboard size={20} />
						Dashboard
					</Link>
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
				<header className="mb-8">
					<h1 className="text-3xl font-bold text-gray-800">{brand.name}</h1>
					<p className="text-gray-500 text-sm mt-1">{brand.prompt}</p>
				</header>

				{/* Action Buttons */}
				<div className="flex gap-4 mb-6">
					<button
						onClick={() => setShowModal(true)}
						className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
					>
						<FiPlusCircle />
						Add Response
					</button>

					<button
						className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
					>
						<FiZap />
						Generate AI Response
					</button>
				</div>

				{/* Responses */}
<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
	{responses.map((res) => (
		<div
			key={res.id}
			className="relative bg-white/70 backdrop-blur-lg border border-gray-200 shadow-md rounded-xl p-6 hover:shadow-lg transition"
		>
			{/* Actions: Edit/Delete */}
			<div className="absolute top-3 right-3 flex gap-2 text-gray-400">
				<button
					onClick={() => handleEdit(res)}
					className="hover:text-blue-600 transition"
					title="Edit"
				>
					✏️
				</button>
				<button
					onClick={() => handleDelete(res.id)}
					className="hover:text-red-500 transition"
					title="Delete"
				>
					🗑️
				</button>
			</div>

			{/* Content */}
				<div className="flex items-start gap-3">
					<div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg shadow">
						💬
					</div>
					<div className="flex-1">
						<p className="text-gray-800 text-md leading-relaxed">
							{res.content}
						</p>
						<div className="mt-3 flex items-center text-gray-400 text-xs gap-1">
							<span>🕒</span>
							{new Date(res.createdAt).toLocaleString()}
						</div>
					</div>
				</div>

				{/* Rating Buttons */}
				<div className="mt-4 flex justify-end gap-3 text-xl">
					<button
						onClick={() => handleRate(res.id, "up", res.ratingId)}
						className="hover:scale-110 transition transform"
						title="Thumbs Up"
					>
						👍
					</button>
					<button
						onClick={() => handleRate(res.id, "down", res.ratingId)}
						className="hover:scale-110 transition transform"
						title="Thumbs Down"
					>
						👎
					</button>
				</div>
			</div>
		))}
	</section>

			</main>

			{/* Modal */}
			{showModal && (
				<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
					<div className="bg-white p-6 rounded-xl w-full max-w-[450px] relative shadow-xl">
						<button
							onClick={() => setShowModal(false)}
							className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl"
						>
							×
						</button>
						<h2 className="text-xl font-bold mb-4">Create Response</h2>
						<form onSubmit={handleCreateResponse} className="space-y-4">
							<textarea
								placeholder="Write response..."
								value={formData.content}
								onChange={(e) =>
									setFormData({ content: e.target.value })
								}
								className="w-full border px-4 py-2 rounded-lg"
							/>
							<button
								type="submit"
								className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg w-full"
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
