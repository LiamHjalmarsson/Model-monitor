import { FiPlusCircle } from "react-icons/fi";

export function CreateBrandButton({ onClick }: { onClick: () => void }) {
	return (
		<button
			onClick={onClick}
			className="border-dashed border-2 border-gray p-lg rounded-xl flex flex-col justify-center items-center text-dark-gray hover:border-primary-400 hover:text-primary-500 transition duration-200 cursor-pointer"
		>
			<FiPlusCircle size={36} />
			<p className="mt-2 text-sm font-medium">Create New Brand</p>
		</button>
	);
}
