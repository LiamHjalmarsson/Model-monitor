import type { ButtonHTMLAttributes } from "react";

interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
	variant:
		| "primary"
		| "secondary"
		| "outline"
		| "danger"
		| "edit"
		| "confirm";
	className?: string;
}

export default function Button({
	children,
	loading = false,
	variant = "primary",
	className = "",
	...props
}: Button) {
	const baseStyles = [
		"py-sm",
		"px-md",
		"cursor-pointer",
		"rounded-lg",
		"font-semibold",
		"transition",
		"duration-200",
		"disabled:opacity-50",
	];

	const variantStyles: Record<Button["variant"], string[]> = {
		primary: ["bg-primary-500", "hover:bg-primary-600", "text-white"],
		secondary: ["bg-gray-500", "hover:bg-gray-600", "text-white"],
		danger: ["bg-danger-500", "hover:bg-danger-600", "text-white"],
		edit: ["bg-edit-500", "hover:bg-edit-600", "text-white"],
		confirm: ["bg-confirm-500", "hover:bg-confirm-600", "text-white"],
		outline: [
			"bg-transparent",
			"border",
			"border-primary-500",
			"hover:bg-primary-50",
			"text-primary-500",
		],
	};

	const classes = [...variantStyles[variant], ...baseStyles, className].join(
		" "
	);

	return (
		<button
			{...props}
			className={classes}
			disabled={loading || props.disabled}
		>
			{loading ? "Loading..." : children}
		</button>
	);
}
