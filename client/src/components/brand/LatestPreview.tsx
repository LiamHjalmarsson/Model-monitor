import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useResponseStore } from "../../store/response";
import type { Brand } from "../../api/brand";
import { FaRegComments, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FiArrowRightCircle } from "react-icons/fi";

interface LatestBrandPreview {
	brand: Brand;
}

export function LatestBrandPreview({ brand }: LatestBrandPreview) {
	const { responses, getResponsesForBrand, clearResponses } =
		useResponseStore();

	useEffect(() => {
		getResponsesForBrand(brand.id);

		return () => clearResponses();
	}, [brand.id, getResponsesForBrand, clearResponses]);

	const responseCount = responses.length;

	return (
		<section className="mt-xl">
			<h3 className="text-2xl font-bold text-gray-800 mb-xl">
				Latest Brand
			</h3>
			<Link to={`/brands/${brand.id}`}>
				<div className="bg-white p-xl rounded-2xl border border-gray-200 shadow-md duration-200 hover:shadow-lg transition hover:bg-gray-100/20 hover:border-primary-500/20 group">
					<div className="flex items-center justify-between mb-3">
						<h4 className="text-xl font-semibold text-black">
							{brand.name}
						</h4>
						<FiArrowRightCircle
							className="text-primary-500 group-hover:translate-x-1 transition-transform duration-200"
							size={24}
						/>
					</div>
					<p className="text-dark-gray text-sm mb-lg whitespace-pre-wrap">
						{brand.prompt}
					</p>
					<div className="flex justify-between items-center text-gray">
						<div className="flex items-center">
							<FaRegComments className="mr-sm" />
							<span>{responseCount} responses</span>
						</div>

						<div className="flex items-center">
							<FaThumbsUp className="mr-sm" />
							<span> likes</span>
						</div>

						<div className="flex items-center">
							<FaThumbsDown className="mr-sm" />
							<span>dislikes</span>
						</div>
					</div>
				</div>
			</Link>
		</section>
	);
}
