import type {ChangeEvent} from "react";

interface InputField {
	label: string;
	type: string;
	value: string;
	onChange: (val: string) => void;
	placeholder: string;
}

export default function InputField({label, type, value, onChange, placeholder}: InputField) {
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
	};

	return (
		<div>
			<label className="block text-sm font-medium text-gray-100 mb-xs">{label}</label>
			<input
				type={type}
				value={value}
				onChange={handleChange}
				className="w-full px-md py-sm rounded-lg bg-white/70 placeholder-gray focus:outline-none focus:ring-2 focus:ring-primary-400"
				placeholder={placeholder}
			/>
		</div>
	);
}
