import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useResponseStore } from "../../store/response";
import Button from "../../components/ui/Button";
import ResponseCard from "../../components/response/Card";

export default function ResponseDetailPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const { currentResponse, getResponseById, rateResponse } =
		useResponseStore();

	useEffect(() => {
		if (id) getResponseById(Number(id));
	}, [id]);

	if (!currentResponse) {
		return (
			<div className="p-8">
				<p>Loading response...</p>
			</div>
		);
	}

	const handleRate = async (responseId: number, rating: 0 | 1) => {
		await rateResponse(responseId, rating);
	};

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<Button onClick={() => navigate(-1)}>← Back to brand</Button>

			<h1 className="text-2xl font-bold text-gray-800 my-md">
				Response #{currentResponse.id}
			</h1>

			<ResponseCard response={currentResponse} onRate={handleRate} />
		</div>
	);
}
