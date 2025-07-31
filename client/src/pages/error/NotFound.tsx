import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="text-center mt-20 h-screen flex justify-center items-center">
			<h1 className="text-3xl font-bold mb-xl">404 - Page Not Found</h1>
			<Link to="/" className="text-white px-md py-sm bg-primary">
				Go Home
			</Link>
		</div>
	);
}
