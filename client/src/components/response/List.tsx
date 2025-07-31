import type { Rating } from "../../api/rating";
import type { ResponseItem } from "../../api/response";
import ResponseCard from "./Card";

interface ResponseListProps {
	responses: ResponseItem[];
	ratings: Rating[];
	onRate: (responseId: number, rating: 0 | 1) => void;
}

export default function ResponseList({
	responses,
	ratings,
	onRate,
}: ResponseListProps) {
	return (
		<section className="space-y-xl">
			{responses.length === 0 ? (
				<p className="mt-xl text-sm text-gray">No responses yet.</p>
			) : (
				responses.map((response) => {
					const userRating = ratings.find(
						(rating) => rating.response_id === response.id
					);

					return (
						<ResponseCard
							key={response.id}
							response={response}
							rating={userRating?.rating}
							onRate={onRate}
						/>
					);
				})
			)}
		</section>
	);
}
