import {useEffect} from "react";
import {Link} from "react-router-dom";
import {useResponseStore} from "../../store/response";
import type {Brand} from "../../api/brand";
import {FaRegComments, FaThumbsUp, FaThumbsDown} from "react-icons/fa";
import {FiArrowRightCircle} from "react-icons/fi";

interface LatestBrandPreviewProps {
	brand: Brand;
	gradientFromClass?: string;
	gradientToClass?: string;
	borderClass?: string;
	hoverBorderClass?: string;
}

export function LatestBrandPreview({
	brand,
	gradientFromClass = "from-blue-300",
	gradientToClass = "to-blue-100",
	borderClass = "border-blue-200",
	hoverBorderClass = "hover:border-blue-400/30",
}: LatestBrandPreviewProps) {
	const {responses, getResponsesForBrand, clearResponses} = useResponseStore();

	useEffect(() => {
		getResponsesForBrand(brand.id);
		return () => clearResponses();
	}, [brand.id, getResponsesForBrand, clearResponses]);

	const responseCount = responses.length;

	return (
		<section className="mt-xl">
			<h3 className="text-2xl font-bold text-gray-800 mb-xl">Latest Brand</h3>

			<Link to={`/brands/${brand.id}`}>
				<div
					className={`relative overflow-hidden bg-white p-xl rounded-2xl shadow-md transition-shadow duration-200 hover:shadow-lg hover:bg-gray-100/20 border border-gray-200 group border-l-4 ${borderClass} ${hoverBorderClass}`}
				>
					<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
						<div
							className={`absolute w-40 h-40 rounded-full left-[-50px] bottom-[-50px] transform scale-0 group-hover:scale-[12] transition-transform duration-700 ease-in-out bg-gradient-to-br ${gradientFromClass} ${gradientToClass}`}
						/>
					</div>

					<div className="relative z-10 flex flex-col space-y-3">
						<div className="flex items-center justify-between">
							<h4 className="text-xl font-semibold text-black">{brand.name}</h4>
							<FiArrowRightCircle
								className="text-primary-500 group-hover:translate-x-1 transition-transform duration-200"
								size={24}
							/>
						</div>

						<p className="text-dark-gray text-sm whitespace-pre-wrap">{brand.prompt}</p>

						<div className="flex justify-between items-center text-gray">
							<div className="flex items-center">
								<FaRegComments className="mr-sm" />
								<span>{responseCount} responses</span>
							</div>
							<div className="flex items-center">
								<FaThumbsUp className="mr-sm" />
								<span>likes</span>
							</div>
							<div className="flex items-center">
								<FaThumbsDown className="mr-sm" />
								<span>dislikes</span>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</section>
	);
}
