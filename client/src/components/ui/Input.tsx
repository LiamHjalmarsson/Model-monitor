import type { FC } from "react";
import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label: string;
	error?: string;
}

const Input: FC<InputProps> = ({ name, label, error, ...rest }) => {
	const [isFocused, setIsFocused] = useState(false);

	const isLabelMoved = isFocused || !!rest.value;

	return (
		<div className="mb-4">
			<div className="relative rounded-md border border-white/30 bg-white/10 backdrop-filter backdrop-blur-md shadow-md">
				<label
					htmlFor={name}
					className={`absolute left-4 px-1 transition-all duration-300 text-gray-800 z-10 bg-white/10 pointer-events-none ${
						isLabelMoved
							? "top-0 -translate-y-4 text-sm"
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
					className="w-full bg-transparent px-4 py-3 pr-12 outline-none text-gray-800"
					{...rest}
				/>
			</div>
			{error && <p className="text-red-500 text-sm mt-1 pl-1">{error}</p>}
		</div>
	);
};

export default Input;
