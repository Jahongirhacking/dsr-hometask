import { LoadingOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Flex, message, Typography } from "antd";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../../../services/auth";
import { RootState } from "../../../store/store";

const Header = () => {
    const [logout, { isLoading }] = useLogoutMutation();
    const user = useSelector((store: RootState) => store.auth.user);

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            message.destroy();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Flex gap={8} className="main-header" justify="space-between" align="center">
            <Typography.Text>Welcome, {user?.name}</Typography.Text>
            <Button
                variant="solid"
                color="danger"
                icon={isLoading ? <LoadingOutlined /> : <LogoutOutlined />}
                disabled={isLoading}
                onClick={handleLogout}
            >
                Logout
            </Button>
        </Flex>
    )
}

export default Header