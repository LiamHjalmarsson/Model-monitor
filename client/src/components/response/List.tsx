import type { ResponseItem } from "../../api/response";
import ResponseCard from "./Card";

export default function ResponseList({
	responses,
}: {
	responses: ResponseItem[];
}) {
	return (
		<section className="space-y-xl">
			{responses.map((res) => (
				<ResponseCard key={res.id} response={res} />
			))}
		</section>
	);
}
