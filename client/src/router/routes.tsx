import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/error/NotFound";
import Brand from "../pages/brand/Brand";
import PrivateLayout from "../layouts/Private";

export const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Dashboard />
		),
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/brands/:brandId",
		element: (
			<Brand />
		),
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);

