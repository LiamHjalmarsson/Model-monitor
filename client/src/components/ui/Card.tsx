import type { FC, ReactNode } from "react";

interface CardProps {
	title: string;
	children: ReactNode;
}

const Card: FC<CardProps> = ({ title, children }) => (
	<div className="bg-white/10 backdrop-filter backdrop-blur-md border border-white/30 rounded-xl p-6 shadow-lg">
		<h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
		<div className="text-gray-100">{children}</div>
	</div>
);

export default Card;
