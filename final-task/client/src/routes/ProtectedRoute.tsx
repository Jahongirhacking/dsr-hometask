import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";

const ProtectedRoute = ({ children }: { children?: ReactElement }) => {
    const token = useSelector((store: RootState) => store.auth.token);

    if (!token) return <Navigate to={"/"} replace />

    return children;
}

export default ProtectedRoute