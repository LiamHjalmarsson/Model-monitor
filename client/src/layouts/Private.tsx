import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

const PrivateLayout = () => {
	const token = useAuthStore((state) => state.token);

	if (!token) return <Navigate to="/login" />;

	return <Outlet />;
};

export default PrivateLayout;
