import {useEffect, useState} from "react";
import {useBrandStore} from "../store/brand";
import {Sidebar} from "../components/layout/Sidebar";
import StatSection from "../components/dashboard/Stats";
import {LatestBrandPreview} from "../components/brand/LatestPreview";
import Header from "../components/layout/Header";
import RatingsOverview from "../components/dashboard/Ratings";
import Brands from "../components/brand/Brands";
import {Modal} from "../components/shared/Modal";

export default function Dashboard() {
	const {brands, getBrands, createBrand} = useBrandStore();

	const [showModal, setShowModal] = useState(false);

	const latest = brands[0];

	useEffect(() => {
		getBrands();
	}, [getBrands]);

	const handleCreate = (data: {name: string; prompt: string}) => createBrand(data);

	return (
		<div className="flex min-h-screen bg-gray-50">
			<Sidebar />

			<main className="flex-1 p-xl container mx-auto">
				<Header title="Dashboard" subtitle="Overview of your brands and performance" />

				<Brands brands={brands} onCreate={() => setShowModal(true)} />

				<StatSection brandsCount={brands.length} topBrand={latest?.name || ""} />

				{latest && (
					<LatestBrandPreview
						brand={latest}
						gradientFromClass="from-pink-300"
						gradientToClass="to-pink-100"
						borderClass="border-pink-200"
						hoverBorderClass="hover:border-pink-400/30"
					/>
				)}

				<RatingsOverview />

				{showModal && <Modal onClose={() => setShowModal(false)} onSubmit={handleCreate} />}
			</main>
		</div>
	);
}
