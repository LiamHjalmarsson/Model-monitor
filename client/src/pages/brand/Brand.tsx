import { useParams } from "react-router-dom";
import type { FC } from "react";

const Brand: FC = () => {
	const { brandId } = useParams<{ brandId: string }>();

	return (
		<div className="min-h-screen px-6 py-8 max-w-4xl mx-auto">
			{brandId}
		</div>
	);
};

export default Brand;
