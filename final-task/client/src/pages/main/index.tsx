import { Flex } from "antd";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const MainPage = () => {
    return (
        <Flex vertical className="main-page" gap={6}>
            <Header />
            <Flex vertical className="main-content" gap={12}>
                <Outlet />
            </Flex>
        </Flex>
    )
}

export default MainPage