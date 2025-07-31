import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useResponseStore } from "../../store/response";
import type { Brand } from "../../api/brand";
import { FaRegComments, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FiArrowRightCircle } from "react-icons/fi";

interface LatestBrandPreviewProps {
	brand: Brand;
}

export function LatestBrandPreview({ brand }: LatestBrandPreviewProps) {
	const { responses, getResponsesForBrand, clearResponses } = useResponseStore();

	useEffect(() => {
		getResponsesForBrand(brand.id);

		return () => clearResponses();
	}, [brand.id, getResponsesForBrand, clearResponses]);

	const responseCount = responses.length;

	const likeCount = responses.filter((r) => r.rating === 1).length;

	const dislikeCount = responses.filter((r) => r.rating === 0).length;

	return (
		<section className="mt-8">
			<h3 className="text-2xl font-bold text-gray-800 mb-4">
				Latest Brand
			</h3>
			<Link to={`/brands/${brand.id}`}>
				<div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md duration-200 hover:shadow-lg transition hover:bg-gray-100/20 hover:border-primary-500/20 group">
					<div className="flex items-center justify-between mb-3">
						<h4 className="text-xl font-semibold text-gray-900">
							{brand.name}
						</h4>
						<FiArrowRightCircle
							className="text-primary-500 group-hover:translate-x-1 transition-transform duration-200"
							size={24}
						/>
					</div>
					<p className="text-gray-700 text-sm mb-4 whitespace-pre-wrap">
						{brand.prompt}
					</p>
					<div className="mt-4 grid grid-cols-3 gap-4 text-gray-600">
						<div className="flex items-center gap-2">
							<FaRegComments />
							<span>{responseCount} responses</span>
						</div>
						<div className="flex items-center gap-2">
							<FaThumbsUp />
							<span>{likeCount} likes</span>
						</div>
						<div className="flex items-center gap-2">
							<FaThumbsDown />
							<span>{dislikeCount} dislikes</span>
						</div>
					</div>
				</div>
			</Link>
		</section>
	);
}
