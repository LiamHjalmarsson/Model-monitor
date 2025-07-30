import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBrandStore } from "../../store/brand";
import {
	MdOutlineBrandingWatermark,
	MdDashboard,
	MdLogout,
	MdEdit,
	MdDelete,
} from "react-icons/md";
import { FaRegComments, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

export default function Brand() {
	const { brandId } = useParams();
	const { brands } = useBrandStore();
	const brand = brands.find((b) => b.id === brandId);

	const [responses, setResponses] = useState<any[]>([]);
	const [selected, setSelected] = useState<any | null>(null);
	const [editModal, setEditModal] = useState(false);
	const [editContent, setEditContent] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!brandId) return;

		const fetchResponses = async () => {
			setLoading(true);
			try {
				const res = await getResponsesForBrand(brandId);
				setResponses(res);
			} catch (err) {
				console.error("Error loading responses:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchResponses();
	}, [brandId]);

	const openEditModal = (res: any) => {
		setSelected(res);
		setEditContent(res.content);
		setEditModal(true);
	};

	const handleEditSubmit = async () => {
		try {
			await updateResponse(selected.id, { content: editContent });
			setResponses((prev) =>
				prev.map((r) =>
					r.id === selected.id ? { ...r, content: editContent } : r
				)
			);
			setEditModal(false);
			setSelected(null);
		} catch (err) {
			console.error("Failed to update response", err);
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
					<a href="/" className="flex items-center gap-3 hover:text-blue-600 transition">
						<MdDashboard size={20} />
						Dashboard
					</a>
					<a href="/login" className="flex items-center gap-3 hover:text-red-500 transition mt-auto pt-4 border-t text-sm">
						<MdLogout size={18} />
						Log out
					</a>
				</nav>
			</aside>

			{/* Main */}
			<main className="flex-1 p-8">
				<header className="mb-8">
					<h1 className="text-3xl font-bold text-gray-800">
						{brand?.name ?? "Brand"}
					</h1>
					<p className="text-gray-500 text-sm mt-1">{brand?.prompt}</p>
				</header>

				{/* Responses */}
				<section className="space-y-4">
					{loading ? (
						<p className="text-gray-500">Loading responses...</p>
					) : responses.length === 0 ? (
						<p className="text-gray-500">No responses yet.</p>
					) : (
						responses.map((res) => (
							<div
								key={res.id}
								className="bg-white p-4 rounded-lg shadow border hover:border-blue-500 transition"
							>
								<p className="text-gray-800">{res.content}</p>
								<div className="flex justify-between items-center mt-3 text-sm text-gray-500">
									<span>{new Date(res.created_at).toLocaleString()}</span>
									<div className="flex items-center gap-3">
										<button
											onClick={() => openEditModal(res)}
											className="text-blue-500 hover:text-blue-700"
										>
											<MdEdit size={18} />
										</button>
										<button
											className="text-red-500 hover:text-red-700"
											// Add delete logic here
										>
											<MdDelete size={18} />
										</button>
										<FaThumbsUp className="text-green-500 cursor-pointer" />
										<FaThumbsDown className="text-red-500 cursor-pointer" />
									</div>
								</div>
							</div>
						))
					)}
				</section>
			</main>

			{/* Edit Modal */}
			{editModal && (
				<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
					<div className="bg-white p-6 rounded-xl w-full max-w-[500px] relative shadow-xl">
						<button
							onClick={() => setEditModal(false)}
							className="absolute top-3 right-4 text-gray-500 hover:text-red-500"
						>
							×
						</button>
						<h2 className="text-xl font-bold mb-4">Edit Response</h2>
						<textarea
							className="w-full h-32 border px-4 py-2 rounded-lg"
							value={editContent}
							onChange={(e) => setEditContent(e.target.value)}
						/>
						<div className="mt-4 flex justify-end gap-2">
							<button
								onClick={() => setEditModal(false)}
								className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
							>
								Cancel
							</button>
							<button
								onClick={handleEditSubmit}
								className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
