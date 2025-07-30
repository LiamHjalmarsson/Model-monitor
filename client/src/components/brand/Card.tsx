import { FiArrowRightCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { Brand } from "../../api/brand";

export function BrandCard({ brand }: { brand: Brand }) {
	return (
		<Link
			to={`/brands/${brand.id}`}
			className="bg-white p-lg rounded-xl shadow hover:shadow-lg border border-gray-200 hover:bg-gray-100/20 hover:border-primary-500/30 transition transform scale-y-0.5 duration-200 flex flex-col group"
		>
			<h3 className="text-lg font-semibold text-gray-dark flex items-center mb-xs">
				{brand.name}
				<FiArrowRightCircle
					className="ml-auto text-primary-500 group-hover:translate-x-1 transition-transform"
					size={22}
				/>
			</h3>
			<p className="text-gray text-sm">{brand.prompt}</p>
		</Link>
	);
}
