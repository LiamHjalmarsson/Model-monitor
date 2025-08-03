type RatingStat = {
	icon: React.ReactNode;
	label: string;
	count: number;
	variant: "like" | "dislike";
};

export default function RatingStat({icon, label, count, variant}: RatingStat) {
	const bgClass =
		variant === "like"
			? "bg-confirm-500/20 text-confirm-600 text-confirm-600"
			: "bg-danger-500/20 text-danger-600 text-danger-600";

	return (
		<div className="flex items-center gap-md rounded-lg border border-gray-200 bg-white p-lg shadow-sm">
			<div className={`rounded-full p-sm ${bgClass}`}>{icon}</div>
			<div>
				<p className="text-sm text-gray">{label}</p>
				<p className="text-base font-medium text-black">{count}</p>
			</div>
		</div>
	);
}
