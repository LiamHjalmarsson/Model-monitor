type RatingStatProps = {
	icon: React.ReactNode;
	label: string;
	count: number;
	variant: "like" | "dislike";
};

export default function RatingStat({ icon, label, count, variant }: RatingStatProps) {
	const bgClass = variant === "like" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600";

	return (
		<div className="bg-white p-lg rounded-lg shadow flex items-center gap-md border border-gray-200">
			<div className={`p-sm rounded-full ${bgClass}`}>{icon}</div>
			<div>
				<p className="text-sm text-gray">{label}</p>
				<p className="text-base font-medium">{count}</p>
			</div>
		</div>
	);
}
