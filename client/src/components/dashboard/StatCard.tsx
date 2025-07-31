import type { ReactNode } from "react";

interface StatCardProps {
	title: string;
	value: string | number;
	icon: ReactNode;
	colors?: Partial<{
		border: string;
		bg: string;
		text: string;
	}>;
}

export default function StatCard({
	title,
	value,
	icon,
	colors = {},
}: StatCardProps) {
	const defaults = {
		border: "border-primary-500",
		bg: "bg-primary-100",
		text: "text-primary-600",
	};

	const { border, bg, text } = { ...defaults, ...colors };

	return (
		<div
			className={`bg-white rounded-lg shadow-sm flex items-center p-6 border-l-4 ${border} transition-shadow hover:shadow-md`}
		>
			<div
				className={`flex-shrink-0 w-12 h-12 rounded-full ${bg} ${text} flex items-center justify-center mr-4`}
			>
				{icon}
			</div>

			<div className="flex flex-col">
				<p className="text-xs font-medium uppercase text-dark-gary tracking-wide">
					{title}
				</p>
				<p className="mt-1 text-2xl font-semibold text-black">
					{value}
				</p>
			</div>
		</div>
	);
}
