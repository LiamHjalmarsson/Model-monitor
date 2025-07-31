interface Card {
	gradientFromClass?: string;
	gradientToClass?: string;
	borderClass?: string;
	hoverBorderClass?: string;
	children?: React.ReactNode;
}

export default function Card({
	children,
	gradientFromClass = "from-blue-300",
	gradientToClass = "to-blue-100",
	borderClass = "border-gray-200",
	hoverBorderClass = "hover:border-primary-500/30",
}) {
	return (
		<div
			className={`relative overflow-hidden bg-white p-lg rounded-xl shadow hover:shadow-lg transition-all duration-200 flex flex-col group ${borderClass} ${hoverBorderClass}`}
		>
			<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
				<div
					className={`absolute w-40 h-40 rounded-full left-[-50px] bottom-[-50px] transform scale-0 transition-transform duration-700 ease-in-out group-hover:scale-[8] bg-gradient-to-br ${gradientFromClass} ${gradientToClass}`}
				/>
			</div>

			<div className="relative z-10 flex flex-col">{children}</div>
		</div>
	);
}
