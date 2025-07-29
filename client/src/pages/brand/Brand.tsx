import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useBrandStore } from "../../store/brand";
import { useResponseStore } from "../../store/response";

export default function Brand() {
	const { brandId } = useParams();
	const { brands, getBrands } = useBrandStore();
	const {
		responses,
		getResponsesForBrand,
		generateAIResponse,
		createResponse,
	} = useResponseStore();

	const brand = brands.find((b) => b.id === brandId);

	useEffect(() => {
		if (brandId) {
			getBrands();
			getResponsesForBrand(brandId);
		}
	}, [brandId]);

	if (!brand) return <p>Brand not found</p>;

	return (
		<div className="p-4">
			<h2 className="text-xl font-bold">{brand.name}</h2>
			<p className="text-gray-600 mb-4">{brand.prompt}</p>

			<div className="flex gap-2 mb-4">
				<button
					className="bg-green-500 text-white px-4 py-1 rounded"
					onClick={() => generateAIResponse(brandId!)}
				>
					Generate AI Response
				</button>
				<button
					className="bg-blue-500 text-white px-4 py-1 rounded"
					onClick={() => createResponse(brandId!)}
				>
					Add Fake Response
				</button>
			</div>

			<h3 className="font-semibold mb-2">Responses:</h3>
			<ul className="space-y-2">
				{responses.map((r) => (
					<li key={r.id} className="border p-2 rounded">
						<p>{r.text || r.content}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
