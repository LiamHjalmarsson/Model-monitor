import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Sidebar} from "../../components/layout/Sidebar";
import {useBrandStore} from "../../store/brand";
import {useResponseStore} from "../../store/response";
import {useRatingStore} from "../../store/rating";
import {Modal} from "../../components/shared/Modal";
import Button from "../../components/ui/Button";
import Header from "../../components/layout/Header";
import {deleteBrand} from "../../api/brand";
import {useNavigate} from "react-router-dom";
import ResponseList from "../../components/response/List";
import ConfirmationModal from "../../components/shared/ConfirmationModal";

interface UpdateBrand {
	name: string;
	prompt: string;
}

export default function BrandPage() {
	const {brandId} = useParams<{brandId: string}>();

	const numberId = Number(brandId);

	const {brands, getBrands, updateBrand} = useBrandStore();

	const {ratings, addRating, editRating} = useRatingStore();

	const {responses, clearResponses, getResponsesForBrand, createResponse, generateAIResponse} = useResponseStore();

	const [loading, setLoading] = useState(false);

	const [error, setError] = useState("");

	const [showEditModal, setShowEditModal] = useState(false);

	const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

	const brand = brands.find((brand) => brand.id === numberId);

	const navigate = useNavigate();

	useEffect(() => {
		getBrands();
	}, [getBrands]);

	useEffect(() => {
		if (brandId) {
			getResponsesForBrand(numberId);
		}

		return () => clearResponses();
	}, [brandId, numberId, getResponsesForBrand, clearResponses]);

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
			const existing = ratings.find((r) => r.response_id === responseId);

			if (existing) {
				await editRating(existing.id, rating);
			} else {
				await addRating({responseId, rating});
			}
		} catch {
			setError("Failed to rate response");
		}
	};

	const handleUpdateBrand = async (data: UpdateBrand) => {
		await updateBrand(numberId, data);

		await getBrands();

		setShowEditModal(false);
	};

	const handleDelete = async () => {
		try {
			await deleteBrand(numberId);

			navigate("/");
		} catch {
			setError("Failed to delete brand.");
		}
	};

	return (
		<div className="flex min-h-screen bg-gray-50">
			<Sidebar />
			<main className="flex-1 p-xl container mx-auto">
				<Header title={brand ? brand.name : "Brand"} subtitle={brand ? brand.prompt : "Promt"}>
					{brand && (
						<div className="flex space-x-xl">
							<Button onClick={() => setShowEditModal(true)} variant="edit">
								Edit Brand
							</Button>
							<Button onClick={() => setShowConfirmModal(true)} variant="danger">
								Delete Brand
							</Button>
						</div>
					)}
				</Header>

				<div className="flex gap-xl mb-xl">
					<Button onClick={handleCreate} disabled={loading} variant="secondary">
						Create Dummy Response
					</Button>

					<Button
						onClick={handleGenerate}
						disabled={loading}
						variant="primary"
						className="bg-primary-500 hover:bg-primary-600 text-white px-md py-sm rounded-md cursor-pointer"
					>
						Generate AI Response
					</Button>
				</div>

				{error && <p className="text-danger-500 text-sm mb-sm">{error}</p>}

				<ResponseList responses={responses} ratings={ratings} onRate={handleRate} />
			</main>

			{showEditModal && brand && (
				<Modal
					title={`Edit brand: ${brand.name}`}
					onClose={() => setShowEditModal(false)}
					onSubmit={handleUpdateBrand}
					submitButtonLabel="Update"
					initialData={{name: brand.name, prompt: brand.prompt}}
				/>
			)}

			{showConfirmModal && (
				<ConfirmationModal
					title={`Edit brand: ${brand?.name}`}
					message="Are you sure you want to delete"
					onConfirm={handleDelete}
					onCancel={() => setShowConfirmModal(false)}
				/>
			)}
		</div>
	);
}
