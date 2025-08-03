import {useParams, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useResponseStore} from "../../store/response";
import Button from "../../components/ui/Button";
import ResponseCard from "../../components/response/Card";

export default function ResponseDetail() {
	const {id} = useParams<{id: string}>();

	const navigate = useNavigate();

	const {currentResponse, getResponseById, rateResponse} = useResponseStore();

	useEffect(() => {
		if (id) {
			getResponseById(Number(id));
		}
	}, [id, getResponseById]);

	const handleRate = async (responseId: number, rating: 0 | 1) => {
		await rateResponse(responseId, rating);
	};

	if (!currentResponse) {
		return (
			<div className="p-xl">
				<p>Loading response...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 p-xl container mx-auto">
			<Button onClick={() => navigate(-1)} variant="primary">
				← Back to brand
			</Button>

			<h1 className="text-2xl font-bold text-black my-md">Response #{currentResponse.id}</h1>

			<ResponseCard response={currentResponse} onRate={handleRate} />
		</div>
	);
}
