interface Props {
	message: string;
}

export default function ErrorMessage({message}: Props) {
	if (!message) return null;

	return <div className="bg-red-100 text-red-600 p-2.5 rounded text-sm">{message}</div>;
}
