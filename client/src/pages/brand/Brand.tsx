import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Sidebar } from "../../components/layout/Sidebar";
import { useBrandStore } from "../../store/brand";
import { useResponseStore } from "../../store/response";
import { BrandModal } from "../../components/brand/BrandModal";
import Button from "../../components/ui/Button";
import ResponseCard from "../../components/response/Card";
import Header from "../../components/layout/Header";
import { deleteBrand } from "../../api/brand";
import { useNavigate } from "react-router-dom";
import ResponseList from "../../components/response/List";

export default function BrandPage() {
	const { brandId } = useParams<{ brandId: string }>();

	const numberId = Number(brandId);

	const { brands, getBrands, updateBrand } = useBrandStore();

	const { responses, clearResponses, getResponsesForBrand, createResponse, generateAIResponse, rateResponse } = useResponseStore();

	const [loading, setLoading] = useState(false);

	const [error, setError] = useState("");

	const [showEditModal, setShowEditModal] = useState(false);

	const brand = brands.find((b) => b.id === numberId);

	const navigate = useNavigate();

	useEffect(() => {
		getBrands();
	}, []);

	useEffect(() => {
		if (brandId) {
			getResponsesForBrand(numberId);
		}

		return () => {
			clearResponses();
		};
	}, [brandId]);

	const handleCreate = async () => {
		setLoading(true);

		setError("");

		try {
			await createResponse(numberId);

			await getResponsesForBrand(numberId);
		} catch {
			setError("Failed to create response");
		}
		setLoading(false);
	};

	const handleGenerate = async () => {
		setLoading(true);

		setError("");
		try {
			await generateAIResponse(numberId);

			await getResponsesForBrand(numberId);
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

	const handleUpdateBrand = async (data: { name: string; prompt: string; }) => {
		await updateBrand(numberId, data);

		await getBrands();

		setShowEditModal(false);
	};

	const handleDelete = async () => {
		try {
			await deleteBrand(numberId);

			navigate("/");
		} catch (err) {
			setError("Failed to delete brand.");
		}
	};

	return (
		<div className="flex min-h-screen bg-gray-50">
			<Sidebar />
			<main className="flex-1 p-8">
				<Header
					title={brand ? brand.name : "Brand"}
					subtitle={brand ? brand.prompt : "Promt"}
				>
					{brand && (
						<div className="flex space-x-xl">
							<Button
								onClick={() => setShowEditModal(true)}
								className="text-sm px-md py-sm rounded-md border-blue-500 border text-blue-500 hover:bg-primary-100/50 cursor-pointer"
							>
								Edit Brand
							</Button>
							<Button
								onClick={handleDelete}
								className="text-sm px-md py-sm rounded-md border-red-500 border text-red-500 hover:bg-primary-100/50 cursor-pointer"
							>
								Delete Brand
							</Button>
						</div>
					)}
				</Header>

				<div className="flex gap-xl mb-xl">
					<Button
						onClick={handleCreate}
						disabled={loading}
						variant="secondary"
					>
						Create Dummy Response
					</Button>
					<Button
						onClick={handleGenerate}
						disabled={loading}
						className="bg-primary-500 hover:bg-primary-600 text-white px-md py-sm rounded-md cursor-pointer"
					>
						Generate AI Response
					</Button>
				</div>

				{error && <p className="text-red-500 text-sm mb-4">{error}</p>}

				<ResponseList />
			</main>

			{showEditModal && brand && (
				<BrandModal
					title={`Edit brand: ${brand.name}`}
					onClose={() => setShowEditModal(false)}
					onSubmit={handleUpdateBrand}
				/>
			)}
		</div>
	);
}
