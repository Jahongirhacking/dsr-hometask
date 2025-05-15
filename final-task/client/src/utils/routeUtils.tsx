import { ReactElement } from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";

export type RouteAccessType = "private" | "public";

export interface IRoute {
    path?: string;
    element?: ReactElement;
    children?: IRoute[];
    access?: RouteAccessType;
}

export const buildRoutes = (routes: IRoute[], parentAccess: RouteAccessType = 'public') => {
    return routes.map(({ path, element, children, access }) => (
        <Route
            key={path || "index"}
            path={path} // Remove `path` for index routes
            element={
                access === "private" || parentAccess === "private" ? <ProtectedRoute>{element}</ProtectedRoute> : element
            }
        >
            {children && buildRoutes(children, parentAccess === 'private' ? 'private' : access)}
        </Route>
    ));
};
