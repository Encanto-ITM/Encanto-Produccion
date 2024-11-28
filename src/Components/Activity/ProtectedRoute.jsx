import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({ children, redirectTo = "/login" }) {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to={redirectTo} />;
    }
    return children ? children : Outlet ? <Outlet /> : null;
}