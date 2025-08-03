import {FiX} from "react-icons/fi";

interface ModalHeader {
	title: string;
	onClose: () => void;
}

export default function ModalHeader({title, onClose}: ModalHeader) {
	return (
		<div className="mb-xl flex items-center justify-between">
			<h2 className="text-2xl font-bold">{title}</h2>
			<button
				onClick={onClose}
				className="cursor-pointer rounded-full bg-dark-gray p-xs transition-colors duration-150 hover:bg-primary-500/70"
				aria-label="Close modal"
			>
				<FiX size={24} />
			</button>
		</div>
	);
}
