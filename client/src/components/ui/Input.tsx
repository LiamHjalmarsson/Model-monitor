interface InputFieldProps {
	label: string;
	type: string;
	value: string;
	onChange: (val: string) => void;
	placeholder: string;
}

export default function InputField({
	label,
	type,
	value,
	onChange,
	placeholder,
}: InputFieldProps) {
	return (
		<div>
			<label className="block text-sm font-medium text-gray-100 mb-xs">
				{label}
			</label>
			<input
				type={type}
				value={value}
				onChange={({ target }) => onChange(target.value)}
				className="w-full px-md py-sm rounded-lg bg-white/70 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
				placeholder={placeholder}
			/>
		</div>
	);
}
