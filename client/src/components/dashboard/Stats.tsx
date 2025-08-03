import {FiRefreshCw, FiTrendingUp} from "react-icons/fi";
import {FaRegComments} from "react-icons/fa";
import {MdOutlineBrandingWatermark} from "react-icons/md";
import StatCard from "./StatCard";

interface StatSection {
	brandsCount: number;
	topBrand: string;
}

export default function StatSection({brandsCount, topBrand}: StatSection) {
	return (
		<section className="mt-xxl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg">
			<StatCard
				title="Total Brands"
				value={brandsCount}
				icon={<FiRefreshCw size={28} />}
				colors={{
					border: "border-pink-500",
					bg: "bg-pink-100",
					text: "text-pink-600",
				}}
			/>
			<StatCard
				title="Tracked Responses"
				value={brandsCount * 2}
				icon={<FaRegComments size={26} />}
				colors={{
					border: "border-cyan-500",
					bg: "bg-cyan-100",
					text: "text-cyan-600",
				}}
			/>
			<StatCard
				title="Avg. Rating"
				value="92%"
				icon={<FiTrendingUp size={26} />}
				colors={{
					border: "border-amber-500",
					bg: "bg-amber-100",
					text: "text-amber-600",
				}}
			/>
			<StatCard
				title="Top Brand"
				value={topBrand || "-"}
				icon={<MdOutlineBrandingWatermark size={26} />}
				colors={{
					border: "border-indigo-500",
					bg: "bg-indigo-100",
					text: "text-indigo-600",
				}}
			/>
		</section>
	);
}
