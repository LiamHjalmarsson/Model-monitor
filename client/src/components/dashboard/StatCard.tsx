interface StatCardProps {
	title: string;
	value: string | number;
	icon: React.ReactNode;
}

export default function StatCard({ title, value, icon }: StatCardProps) {
	return (
		<div className="bg-white p-lg rounded-lg shadow flex items-center">
			<div className="mr-md">{icon}</div>
			<div>
				<p className="text-sm text-gray">{title}</p>
				<p className="text-lg font-semibold text-gray-dark line-clamp-1">
					{value}
				</p>
			</div>
		</div>
	);
}
