import { useEffect, useState } from "react";
import { useBrandStore } from "../store/brand";
import type { Brand } from "../api/brand";
import { Sidebar } from "../components/layout/Sidebar";
import { BrandCard } from "../components/brand/Card";
import { CreateBrandButton } from "../components/brand/CreateButton";
import StatSection from "../components/dashboard/Stats";
import { LatestBrandPreview } from "../components/brand/LatestPreview";
import { CreateBrandModal } from "../components/brand/CrateBrandModal";

export default function Dashboard() {
	const { brands, getBrands, createBrand } = useBrandStore();

	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		getBrands();
	}, [getBrands]);

	const handleCreate = (data: { name: string; prompt: string }) =>
		createBrand(data);

	const latest = brands[0];

	return (
		<div className="flex min-h-screen bg-gray-50">
			<Sidebar />

			<main className="flex-1 p-xl">
				<header className="mb-xl">
					<h1 className="text-3xl font-bold mb-xs">Dashboard</h1>
					<p className="text-gray-dark">
						Overview of your brands and performance
					</p>
				</header>

				<section>
					<h2 className="text-xl font-semibold text-gray-dark mb-md">
						Your Brands
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
						{brands.map((brand: Brand) => (
							<BrandCard key={brand.id} brand={brand} />
						))}

						<CreateBrandButton onClick={() => setShowModal(true)} />
					</div>
				</section>

				<StatSection
					brandsCount={brands.length}
					topBrand={latest?.name || ""}
				/>

				{latest && <LatestBrandPreview brand={latest} />}

				{showModal && (
					<CreateBrandModal
						onClose={() => setShowModal(false)}
						onSubmit={handleCreate}
					/>
				)}
			</main>
		</div>
	);
}
