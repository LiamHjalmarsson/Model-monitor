import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import type { Brand } from "../../api/brand";

export function LatestBrandPreview({ brand }: { brand: Brand }) {
	return (
		<section className="mt-8">
			<h3 className="text-2xl font-bold text-gray-800 mb-4">
				Latest Brand
			</h3>

			<Link to={`/brands/${brand.id}`}>
				<div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition transform duration-200 hover:-translate-y-0.5">
					<div className="flex items-center justify-between mb-3">
						<h4 className="text-xl font-semibold text-gray-900">
							{brand.name}
						</h4>
						<FaArrowRight className="text-primary-500" />
					</div>
					<p className="text-gray-700 text-sm mb-4 whitespace-pre-wrap">
						{brand.prompt}
					</p>
				</div>
			</Link>
		</section>
	);
}
