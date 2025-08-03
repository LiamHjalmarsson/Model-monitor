import {useEffect} from "react";
import {useRatingStore} from "../../store/rating";
import {FaThumbsUp, FaThumbsDown} from "react-icons/fa";
import RatingStat from "./RatingStat";

export default function RatingsOverview() {
	const {fetchRatings, ratings} = useRatingStore();

	useEffect(() => {
		fetchRatings();
	}, [fetchRatings]);

	const likeCount = ratings.filter((r) => r.rating === 1).length;

	const dislikeCount = ratings.filter((r) => r.rating === 0).length;

	return (
		<section className="mt-xxl">
			<h2 className="text-xl font-semibold mb-md">Ratings Overview</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-xl">
				<RatingStat icon={<FaThumbsUp />} label="Total Likes" count={likeCount} variant="like" />
				<RatingStat icon={<FaThumbsDown />} label="Total Dislikes" count={dislikeCount} variant="dislike" />
			</div>
		</section>
	);
}
