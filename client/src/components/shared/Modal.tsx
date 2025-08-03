import {useEffect, useRef} from "react";
import ModalHeader from "./ModalHeader";
import ModalForm from "./ModalForn";

interface Modal {
	onClose: () => void;
	onSubmit: (payload: {name: string; prompt: string}) => Promise<void>;
	initialData?: {name: string; prompt: string};
	title?: string;
	submitButtonLabel?: string;
}

type BrandPayload = {name: string; prompt: string};

export function Modal({
	onClose,
	onSubmit,
	initialData = {name: "", prompt: ""},
	title = "Create New Brand",
	submitButtonLabel = "Create Brand",
}: Modal) {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				onClose();
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [onClose]);

	async function submit(payload: BrandPayload) {
		await onSubmit(payload);

		onClose();
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
			<div
				ref={modalRef}
				className="bg-black text-white rounded-2xl max-w-[450px] w-full p-8 relative shadow-2xl transform transition-transform duration-200 scale-100"
			>
				<ModalHeader title={title} onClose={onClose} />

				<ModalForm initialData={initialData} onSubmit={submit} label={submitButtonLabel} />
			</div>
		</div>
	);
}
