import { useEffect, useState } from "react";
import { useBrandStore } from "../store/brand";
import { Sidebar } from "../components/layout/Sidebar";
import StatSection from "../components/dashboard/Stats";
import { LatestBrandPreview } from "../components/brand/LatestPreview";
import { BrandModal } from "../components/brand/BrandModal";
import Header from "../components/layout/Header";
import RatingsOverview from "../components/dashboard/Ratings";
import Brands from "../components/brand/Brands";

export default function Dashboard() {
	const { brands, getBrands, createBrand } = useBrandStore();

	const [showModal, setShowModal] = useState(false);

	const latest = brands[0];

	useEffect(() => {
		getBrands();
	}, [getBrands]);

	const handleCreate = (data: { name: string; prompt: string }) =>
		createBrand(data);

	return (
		<div className="flex min-h-screen bg-gray-50">
			<Sidebar />

			<main className="flex-1 p-xl">
				<Header
					title="Dashboard"
					subtitle="Overview of your brands and performance"
				/>

				<Brands />

				<StatSection
					brandsCount={brands.length}
					topBrand={latest?.name || ""}
				/>

				{latest && <LatestBrandPreview brand={latest} />}

				<RatingsOverview />

				{showModal && (
					<BrandModal
						onClose={() => setShowModal(false)}
						onSubmit={handleCreate}
					/>
				)}
			</main>
		</div>
	);
}
