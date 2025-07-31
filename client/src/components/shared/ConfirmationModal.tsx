import Button from "../ui/Button";
import ModalHeader from "./ModalHeader";
import { useRef, useState } from "react";

interface ConfirmationModalProps {
	title: string;
	message: string;
	onConfirm: () => Promise<void>;
	onCancel: () => void;
}

export default function ConfirmationModal({
	title,
	message,
	onConfirm,
	onCancel,
}: ConfirmationModalProps) {
	const [loading, setLoading] = useState<boolean>(false);

	const modalRef = useRef<HTMLDivElement>(null);

	const handleConfirm = async () => {
		setLoading(true);
		try {
			await onConfirm();

			onCancel();
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
			<div
				ref={modalRef}
				className="bg-black text-white rounded-2xl max-w-[450px] w-full p-lg relative shadow-2xl transform transition-transform duration-200 scale-100"
			>
				<div className="w-full max-w-[450px] rounded-2xl bg-black p-lg text-white shadow-2xl transition-transform duration-300 cursor-pointer">
					<ModalHeader title={title} onClose={onCancel} />

					<div className="space-y-xl">
						<p className="text-sm text-gray-200">{message}</p>
						<div className="flex gap-xl">
							<Button
								variant="outline"
								onClick={onCancel}
								disabled={loading}
								className="w-full hover:bg-primary-100/10"
							>
								Cancel
							</Button>

							<Button
								variant="primary"
								onClick={handleConfirm}
								disabled={loading}
								className="w-full"
							>
								Confirm
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
