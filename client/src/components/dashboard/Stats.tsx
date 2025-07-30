import { FiRefreshCw, FiTrendingUp } from "react-icons/fi";
import { FaRegComments } from "react-icons/fa";
import { MdOutlineBrandingWatermark } from "react-icons/md";
import StatCard from "./StatCard";

export default function StatSection({
	brandsCount,
	topBrand,
}: {
	brandsCount: number;
	topBrand: string;
}) {
	return (
		<section className="mt-xxl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg">
			<StatCard
				title="Total Brands"
				value={brandsCount}
				icon={<FiRefreshCw size={28} />}
			/>
			<StatCard
				title="Tracked Responses"
				value={brandsCount * 2}
				icon={<FaRegComments size={26} />}
			/>
			<StatCard
				title="Avg. Rating"
				value="92%"
				icon={<FiTrendingUp size={26} />}
			/>
			<StatCard
				title="Top Brand"
				value={topBrand || "-"}
				icon={<MdOutlineBrandingWatermark size={26} />}
			/>
		</section>
	);
}
