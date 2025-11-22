import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
    const userRole = sessionStorage.getItem("role")
    const token = sessionStorage.getItem("token");
    if (!token) {
        return <Navigate to="/signin" replace />;
    }
    if (role && userRole !== role) {
        return <Navigate to="/app" replace />;
    }
    return children;

}

export default PrivateRoute