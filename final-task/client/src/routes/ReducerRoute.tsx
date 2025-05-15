import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Role } from "../store/slices/type";
import { RootState } from "../store/store";
import { RouteNames } from "./config";

const ReducerRoute = () => {
    const role = useSelector((store: RootState) => store.auth.user?.role);
    const [redirecting, setRedirecting] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setRedirecting(false);
        }, 5000)
    })

    switch (role) {
        case Role.User:
        case Role.Admin: return <Navigate to={RouteNames.Main} replace />;
    }

    return redirecting ? "Redirecting..." : <Navigate to={RouteNames.Auth} replace />
}

export default ReducerRoute