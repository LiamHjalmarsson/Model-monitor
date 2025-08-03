import type {Brand} from "../../api/brand";
import {BrandCard} from "./Card";
import {CreateBrandButton} from "./CreateButton";

interface BrandsProps {
	brands: Brand[];
	onCreate: () => void;
}

const colorMap = [
	{
		gradientFromClass: "from-amber-200",
		gradientToClass: "to-amber-100",
		borderClass: "border-amber-200",
		hoverBorderClass: "hover:border-amber-300/30",
	},
	{
		gradientFromClass: "from-lime-200",
		gradientToClass: "to-lime-50",
		borderClass: "border-lime-200",
		hoverBorderClass: "hover:border-lime-300/30",
	},
	{
		gradientFromClass: "from-emerald-200",
		gradientToClass: "to-emerald-50",
		borderClass: "border-emerald-200",
		hoverBorderClass: "hover:border-emerald-300/30",
	},
	{
		gradientFromClass: "from-cyan-200",
		gradientToClass: "to-cyan-100",
		borderClass: "border-cyan-200",
		hoverBorderClass: "hover:border-cyan-300/30",
	},
	{
		gradientFromClass: "from-violet-200",
		gradientToClass: "to-violet-100",
		borderClass: "border-violet-200",
		hoverBorderClass: "hover:border-violet-300/30",
	},
	{
		gradientFromClass: "from-fuchsia-200",
		gradientToClass: "to-fuchsia-100",
		borderClass: "border-fuchsia-200",
		hoverBorderClass: "hover:border-fuchsia-300/30",
	},
];

export default function Brands({brands, onCreate}: BrandsProps) {
	return (
		<section>
			<h2 className="text-xl font-semibold text-gray-dark mb-md">Your Brands</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
				{brands.map((brand, index) => {
					const {gradientFromClass, gradientToClass, borderClass, hoverBorderClass} =
						colorMap[index % colorMap.length];

					return (
						<BrandCard
							key={brand.id}
							brand={brand}
							gradientFromClass={gradientFromClass}
							gradientToClass={gradientToClass}
							borderClass={borderClass}
							hoverBorderClass={hoverBorderClass}
						/>
					);
				})}

				<CreateBrandButton onClick={onCreate} />
			</div>
		</section>
	);
}
