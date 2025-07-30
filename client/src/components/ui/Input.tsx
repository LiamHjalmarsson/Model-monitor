import { useState } from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label: string;
	error?: string;
	className?: string; 
}

export default function Input({ name, label, error, className, ...rest }: InputProps) {
	const [isFocused, setIsFocused] = useState(false);
	
	const isLabelMoved = isFocused || !!rest.value;

	return (
		<div>
			<div className="relative border border-md border-gray.dark rounded-md">
				<label
					htmlFor={name}
					className={`absolute px-xxs left-6 transition-all duration-300 text-gray-800 z-10 cursor-pointer font-medium ${
						isLabelMoved
							? "top-0 -translate-y-6 -translate-x-2 text-sm"
							: "top-1/2 -translate-y-1/2"
					}`}
				>
					{label}
				</label>

				<input
					id={name}
					name={name}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					className={`w-full rounded-lg px-6 py-3 outline-none text-gray-800 pr-12 bg-white ${className || ""}`}
					{...rest}
				/>
			</div>

			{error && (
				<p className="text-red-500 pl-sm text-sm mt-1">{error}</p>
			)}
		</div>
	);
}
