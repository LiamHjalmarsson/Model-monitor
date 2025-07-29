import type { FC } from "react";
import { Link } from "react-router-dom";

interface PrimaryButtonProps {
	label: string;
	to?: string;
	type?: "button" | "submit" | "reset";
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
	label,
	to,
	type = "button",
}) => {
	const sharedClass =
		"relative w-fit mx-auto h-14 group flex items-center px-8 cursor-pointer";

	const spanText =
		"relative z-10 font-semibold tracking-wide text-body-sm md:text-body-md lg:text-body-lg duration-300 group-hover:text-white";

	const spanBg =
		"absolute left-0 w-14 h-14 bg-primary-500 rounded-full group-hover:w-full transition-all duration-300";

	if (to) {
		return (
			<Link to={to} className={sharedClass}>
				<span className={spanText}>{label}</span>
				<span className={spanBg} />
			</Link>
		);
	}

	return (
		<button type={type} className={sharedClass}>
			<span className={spanText}>{label}</span>
			<span className={spanBg} />
		</button>
	);
};

export default PrimaryButton;
