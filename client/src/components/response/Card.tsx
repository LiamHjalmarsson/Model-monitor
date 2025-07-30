import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import type { ResponseItem } from "../../api/response";

export default function ResponseCard({ response }: { response: ResponseItem }) {
	return (
		<div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col justify-between h-full">
			<div className="mb-4">
				<p className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
					{response.content}
				</p>
			</div>
			<div className="flex items-center justify-between">
				<p className="text-xs text-gray-400">
					{new Date(response.created_at).toLocaleString()}
				</p>
				<div className="flex items-center gap-2">
					<button
						onClick={() => {
							/* pass rate handler here */
						}}
						className="p-2 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition"
					>
						<FaThumbsUp />
					</button>
					<button
						onClick={() => {
							/* pass rate handler here */
						}}
						className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition"
					>
						<FaThumbsDown />
					</button>
				</div>
			</div>
		</div>
	);
}
