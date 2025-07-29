import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/error/NotFound";
import Brand from "../pages/brand/Brand";
import PrivateLayout from "../layouts/Private";

export const router = createBrowserRouter([
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/",
		element: <PrivateLayout />,
		children: [
			{
				path: "",
				element: <Dashboard />,
			},
			{
				path: "brands/:brandId",
				element: <Brand />,
			},
		],
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);
