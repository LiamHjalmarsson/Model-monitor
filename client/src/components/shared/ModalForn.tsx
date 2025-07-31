import { useState } from "react";
import Button from "../ui/Button";

interface ModalForm {
	initialData: { name: string; prompt: string };
	onSubmit: (data: { name: string; prompt: string }) => Promise<void>;
	label: string;
}

export default function ModalForm({ initialData, onSubmit, label }: ModalForm) {
	const [formData, setFormData] = useState<{ name: string; prompt: string }>(
		initialData
	);

	const [error, setError] = useState("");

	const [loading, setLoading] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
		} catch {
			setError("Failed to create brand.");
		} finally {
			setLoading(false);
		}
	};

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-xl">
			<div>
				<label className="mb-sm block text-sm font-medium">
					Brand Name
				</label>
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleInputChange}
					className="w-full rounded-lg border border-gray px-md py-sm outline-none"
					placeholder="Enter brand name"
				/>
			</div>
			<div>
				<label className="mb-sm block text-sm font-medium">
					Prompt
				</label>
				<textarea
					name="prompt"
					value={formData.prompt}
					onChange={handleInputChange}
					className="min-h-[120px] w-full rounded-lg border border-gray px-md py-sm outline-none"
					placeholder="Enter brand prompt"
				/>
			</div>

			{error && <p className="text-sm text-red-500">{error}</p>}

			<Button
				variant="primary"
				type="submit"
				loading={loading}
				className="w-full"
			>
				{label}
			</Button>
		</form>
	);
}
