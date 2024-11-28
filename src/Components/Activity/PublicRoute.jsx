import { Navigate, Outlet } from "react-router-dom";

export function PublicRoute({ children, redirectTo = "/home" }) {
    const token = localStorage.getItem("token");
    if (token) {
        return <Navigate to={redirectTo} />;
    }
    return children ? children : Outlet ? <Outlet /> : null;
}