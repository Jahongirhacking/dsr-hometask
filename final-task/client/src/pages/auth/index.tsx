import { LoadingOutlined, LoginOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, message, Typography } from "antd";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RouteNames } from "../../routes/config";
import { useLoginMutation } from "../../services/auth";
import { ILoginReq } from "../../services/auth/type";
import { RootState } from "../../store/store";

const LoginPage = () => {
    const [login, { isLoading }] = useLoginMutation();
    const token = useSelector((store: RootState) => store.auth.token);

    const handleLogin = async (values: ILoginReq) => {
        try {
            await login(values).unwrap();
            message.destroy();
            message.success("Login is successful");
        } catch (err) {
            console.error(err);
            message.error("Incorrect login or password");
        }
    }

    if (token) return <Navigate to={RouteNames.Reducer} />

    return (
        <Flex vertical gap={12} className="auth-page">
            <Typography.Title level={2} style={{ margin: 0 }}>Authorization</Typography.Title>
            <Form
                onFinish={handleLogin}
                layout="vertical"
            >
                <Flex vertical gap={4} align="center" className="login-box">
                    <Form.Item
                        name={'login'}
                        rules={[{ required: true, message: 'Login should not be empty' }]}
                    >
                        <Input placeholder="Login" />
                    </Form.Item>
                    <Form.Item
                        name={'password'}
                        rules={[{ required: true, message: 'Password should not be empty' }]}
                    >
                        <Input placeholder="Password" />
                    </Form.Item>
                    <Button
                        htmlType="submit"
                        type="primary"
                        icon={isLoading ? <LoadingOutlined /> : <LoginOutlined />}
                        style={{ width: 'min(200px, 100%)' }}
                        disabled={isLoading}
                    >
                        Enter
                    </Button>
                </Flex>
            </Form>
        </Flex>
    )
}

export default LoginPage