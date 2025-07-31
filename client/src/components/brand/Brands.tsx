import type { Brand } from "../../api/brand";
import { BrandCard } from "./Card";
import { CreateBrandButton } from "./CreateButton";

interface BrandsProps {
	brands: Brand[];
	onCreate: () => void;
}

export default function Brands({ brands, onCreate }: BrandsProps) {
	return (
		<section>
			<h2 className="text-xl font-semibold text-gray-dark mb-md">
				Your Brands
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
				{brands.map((brand) => (
					<BrandCard
						key={brand.id}
						brand={brand}
						gradientFromClass="from-green-200"
						gradientToClass="to-green-50"
						borderClass="border-green-200"
						hoverBorderClass="hover:border-green-400/30"
					/>
				))}

				<CreateBrandButton onClick={onCreate} />
			</div>
		</section>
	);
}
