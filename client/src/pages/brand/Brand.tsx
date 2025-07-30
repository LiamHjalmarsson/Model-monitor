import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Sidebar } from "../../components/layout/Sidebar";
import { useBrandStore } from "../../store/brand";
import { useResponseStore } from "../../store/response";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

export default function BrandPage() {
	const { brandId } = useParams<{ brandId: string }>();

	const brandIdNum = Number(brandId);

	const { brands, getBrands, getResponsesForBrand } = useBrandStore();

	const {
		responses,
		clearResponses,
		rateResponse,
		createResponse,
		generateAIResponse,
	} = useResponseStore();

	const [error, setError] = useState("");

	const [loading, setLoading] = useState(false);

	const brand = brands.find((brand) => brand.id === Number(brandId));

	useEffect(() => {
		getBrands();
	}, []);

	useEffect(() => {
		if (brandId) {
			getResponsesForBrand(brandIdNum);
		}
		return () => {
			clearResponses();
		};
	}, [brandId]);

	const handleCreate = async () => {
		if (!brandId) return;
		setLoading(true);
		setError("");

		try {
			await createResponse(brandIdNum);

			await getResponsesForBrand(brandIdNum);
		} catch {
			setError("Failed to create response");
		}
		setLoading(false);
	};

	const handleGenerate = async () => {
		if (!brandId) return;
		setLoading(true);

		setError("");

		try {
			await generateAIResponse(brandIdNum);

			await getResponsesForBrand(brandIdNum);
		} catch {
			setError("Failed to generate AI response");
		}
		setLoading(false);
	};

	const handleRate = async (responseId: number, rating: 0 | 1) => {
		try {
			await rateResponse(responseId, rating);
		} catch {
			setError("Failed to rate response");
		}
	};

	return (
		<div className="flex min-h-screen bg-gray-50">
			<Sidebar />

			<main className="flex-1 p-8">
				<header className="mb-8">
					<h1 className="text-3xl font-bold text-gray-800">
						{brand ? brand.name : "Brand"}
					</h1>
					<p className="text-gray-500 text-sm mt-1">
						All AI-generated responses for this brand
					</p>
				</header>

				<div className="flex gap-4 mb-6">
					<button
						onClick={handleCreate}
						disabled={loading}
						className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md"
					>
						Create dummy response
					</button>
					<button
						onClick={handleGenerate}
						disabled={loading}
						className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
					>
						Generate AI response
					</button>
				</div>

				{error && <p className="text-red-500 text-sm mb-4">{error}</p>}

				<section className="space-y-4">
					{responses.map((res) => (
						<div
							key={res.id}
							className="bg-white p-4 rounded-lg shadow border hover:border-blue-500 transition"
						>
							<p className="text-gray-800 whitespace-pre-wrap">
								{res.content}
							</p>
							<p className="text-xs text-gray-400 mt-2">
								{new Date(res.created_at).toLocaleString()}
							</p>

							<div className="mt-4 flex gap-3 text-sm items-center">
								<button
									onClick={() => handleRate(res.id, 1)}
									className="flex items-center gap-1 text-green-600 hover:underline"
								>
									<FaThumbsUp />
									Like
								</button>
								<button
									onClick={() => handleRate(res.id, 0)}
									className="flex items-center gap-1 text-red-500 hover:underline"
								>
									<FaThumbsDown />
									Dislike
								</button>
							</div>
						</div>
					))}

					{responses.length === 0 && (
						<p className="text-gray-500 text-sm mt-6">
							No responses yet.
						</p>
					)}
				</section>
			</main>
		</div>
	);
}
