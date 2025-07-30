import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import type { ResponseItem } from "../../api/response";
import { Link } from "react-router-dom";

interface ResponseCardProps {
	response: ResponseItem;
	onRate: (id: number, rating: 0 | 1) => void;
}

export default function ResponseCard({ response, onRate }: ResponseCardProps) {
	const isLiked = response.rating === 1;

	const isDisliked = response.rating === 0;

	const borderClass = isLiked
		? "border-green-200 bg-green-50"
		: isDisliked
			? "border-red-200 bg-red-50"
			: "border-gray-200 bg-white";

	return (
		<div
			className={`rounded-2xl shadow-lg transition p-6 flex flex-col justify-between h-full border ${borderClass}`}
		>
			<div className="mb-4">
				<p className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
					{response.content}
				</p>
			</div>

			<div className="flex items-center justify-between">
				<p className="text-xs text-gray-400">
					{new Date(response.created_at).toLocaleString()}
				</p>
				<div className="flex items-center gap-2">
					<button
						onClick={() => onRate(response.id, 1)}
						className={`p-2 rounded-full transition cursor-pointer ${
							isLiked
								? "bg-green-100 text-green-700"
								: "bg-green-50 text-green-600 hover:bg-green-100"
						}`}
						aria-label="Like"
					>
						<FaThumbsUp />
					</button>
					<button
						onClick={() => onRate(response.id, 0)}
						className={`p-2 rounded-full transition cursor-pointer ${
							isDisliked
								? "bg-red-100 text-red-700"
								: "bg-red-50 text-red-600 hover:bg-red-100"
						}`}
						aria-label="Dislike"
					>
						<FaThumbsDown />
					</button>

					<Link
						to={`/responses/${response.id}`}
						className="ml-auto text-blue-600 hover:underline"
					>
						View Details
					</Link>
				</div>
			</div>
		</div>
	);
}
