import {FiPlus, FiZap} from "react-icons/fi";
import Button from "../ui/Button";

interface Props {
	loading: boolean;
	onCreate: () => void;
	onGenerate: () => void;
}

export default function ResponseActions({loading, onCreate, onGenerate}: Props) {
	return (
		<div className="flex gap-4 mb-6">
			<Button
				onClick={onCreate}
				variant="edit"
				loading={loading}
				className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 w-auto"
			>
				<FiPlus /> Create Random Response
			</Button>

			<Button
				onClick={onGenerate}
				variant="danger"
				loading={loading}
				className="bg-green-600 hover:bg-green-700 flex items-center gap-2 w-auto"
			>
				<FiZap /> Generate AI Response
			</Button>
		</div>
	);
}
