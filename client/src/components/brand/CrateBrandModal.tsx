import React, { useState, useRef, useEffect } from "react";
import { FiX } from "react-icons/fi";
import Button from "../ui/Button";

interface CreateBrandModalProps {
	onClose: () => void;
	onSubmit: (data: { name: string; prompt: string }) => Promise<void>;
}

export function CreateBrandModal({ onClose, onSubmit }: CreateBrandModalProps) {
	const [formData, setFormData] = useState({ name: "", prompt: "" });

	const [error, setError] = useState("");

	const [loading, setLoading] = useState(false);

	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, [onClose]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		setError("");

		if (!formData.name.trim() || !formData.prompt.trim()) {
			setError("Name and prompt are required.");

			return;
		}

		setLoading(true);
		try {
			await onSubmit(formData);

			setFormData({ name: "", prompt: "" });

			onClose();
		} catch {
			setError("Failed to create brand.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
			<div
				ref={modalRef}
				className="bg-black text-white rounded-2xl max-w-[450px] w-full p-8 relative shadow-2xl transform transition-transform duration-300 scale-100"
			>
				<div className="flex justify-between items-center mb-xl">
					<h2 className="text-2xl font-bold">Create New Brand</h2>

					<button
						onClick={onClose}
						className="cursor-pointer bg-dark-gray rounded-full p-xs hover:bg-primary-500/70 transition-colors duration-150"
					>
						<FiX size={24} />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="space-y-xl">
					<div>
						<label className="block text-sm font-medium mb-sm">
							Brand Name
						</label>
						<input
							type="text"
							value={formData.name}
							onChange={(event) =>
								setFormData({
									...formData,
									name: event.target.value,
								})
							}
							className="w-full border border-gray px-md py-sm rounded-lg outline-none"
							placeholder="Enter brand name"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-sm">
							Prompt
						</label>
						<textarea
							value={formData.prompt}
							onChange={(event) =>
								setFormData({
									...formData,
									prompt: event.target.value,
								})
							}
							className="w-full border border-gray px-md py-sm rounded-lg min-h-[120px] outline-none"
							placeholder="Enter brand prompt"
						/>
					</div>

					{error && <p className="text-red-500 text-sm">{error}</p>}

					<Button type="submit" loading={loading} className="w-full">
						Create Brand
					</Button>
				</form>
			</div>
		</div>
	);
}
