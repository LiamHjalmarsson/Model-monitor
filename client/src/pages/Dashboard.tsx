import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBrandStore } from "../store/brand";

export default function Dashboard() {
	const { brands, getBrands } = useBrandStore();

	useEffect(() => {
		getBrands();
	}, [getBrands]);

	return (
		<div className="p-4">
			<h1 className="text-xl font-bold mb-4">Your Brands</h1>
			<ul className="space-y-2">
				{brands.map((brand) => (
					<li key={brand.id}>
						<Link
							to={`/brands/${brand.id}`}
							className="text-blue-600 underline"
						>
							{brand.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
