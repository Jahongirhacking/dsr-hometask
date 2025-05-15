import { Button, Result } from "antd"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { BrowserRouter, Link, Routes } from "react-router-dom"
import LoginPage from "../pages/auth"
import MainPage from "../pages/main"
import Todos from "../pages/main/Todos"
import UsersList from "../pages/main/UsersList"
import { useLogoutMutation } from "../services/auth"
import { useLazyGetMeQuery } from "../services/user"
import { RootState } from "../store/store"
import { buildRoutes } from "../utils/routeUtils"
import { RouteNames } from "./config"
import ReducerRoute from "./ReducerRoute"

const Router = () => {
    const [getMe] = useLazyGetMeQuery();
    const { token, user } = useSelector((store: RootState) => store.auth)
    const [logout] = useLogoutMutation();

    useEffect(() => {
        (async () => {
            try {
                if (token && !user) {
                    await getMe().unwrap();
                }
            } catch (err: unknown) {
                if (
                    typeof err === "object" &&
                    err !== null &&
                    "status" in err
                ) {
                    return await logout();
                }
            }
        })()
    }, [getMe, logout, user, token])

    const routes = buildRoutes([
        { path: RouteNames.Auth, element: <LoginPage /> },
        { path: RouteNames.Reducer, element: <ReducerRoute /> },

        {
            path: RouteNames.Main,
            element: <MainPage />,
            access: 'private',
            children: [
                {
                    path: RouteNames.Main,
                    element: <Todos />,
                    access: 'private'
                },
                { path: RouteNames.Users, element: <UsersList />, access: 'private' },
            ]
        },
        {
            path: '*', element: (
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Link to={RouteNames.Auth}><Button type="primary">Back Home</Button></Link>}
                />
            )
        }
    ]);

    return (
        <BrowserRouter>
            <Routes>
                {routes}
            </Routes>
        </BrowserRouter>
    )
}

export default Router