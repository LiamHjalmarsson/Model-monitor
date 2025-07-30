import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/error/NotFound";
import Brand from "../pages/brand/Brand";
import ResponseDetailPage from "../pages/response/ResponseDetailPage";
import PrivateLayout from "../layouts/Private";

export const router = createBrowserRouter([
	{
		children: [{ path: "/login", element: <Login /> }],
	},
	{
		element: <PrivateLayout />,
		children: [
			{ path: "/", element: <Dashboard /> },
			{ path: "/brands/:brandId", element: <Brand /> },
			{ path: "/responses/:id", element: <ResponseDetailPage /> },
			{ path: "*", element: <NotFound /> },
		],
	},
]);
