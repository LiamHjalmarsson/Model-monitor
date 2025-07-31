import { FiArrowRightCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { Brand } from "../../api/brand";

interface BrandCard {
	brand: Brand;
	gradientFromClass?: string;
	gradientToClass?: string;
	borderClass?: string;
	hoverBorderClass?: string;
}

export function BrandCard({
	brand,
	gradientFromClass = "from-blue-300",
	gradientToClass = "to-blue-100",
	borderClass = "border-gray-200",
	hoverBorderClass = "hover:border-primary-500/30",
}: BrandCard) {
	return (
		<Link
			to={`/brands/${brand.id}`}
			className={`relative overflow-hidden bg-white p-lg rounded-xl shadow hover:shadow-lg transition-all duration-200 flex flex-col group ${borderClass} ${hoverBorderClass}`}
		>
			<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
				<div
					className={`absolute w-40 h-40 rounded-full left-[-50px] bottom-[-50px] transform scale-0 transition-transform duration-500 ease-in-out group-hover:scale-[8] bg-gradient-to-br ${gradientFromClass} ${gradientToClass}`}
				/>
			</div>

			{/* INNEHÅLL */}
			<div className="relative z-10 flex flex-col">
				<h3 className="text-lg font-semibold text-gray-dark flex items-center mb-xs">
					{brand.name}
					<FiArrowRightCircle
						className="ml-auto text-primary-500 group-hover:translate-x-1 transition-transform duration-500"
						size={22}
					/>
				</h3>
				<p className="text-gray text-sm">{brand.prompt}</p>
			</div>
		</Link>
	);
}
