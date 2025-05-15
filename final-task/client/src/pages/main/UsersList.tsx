import { StarOutlined } from "@ant-design/icons";
import { Button, Card, Empty, Flex, Skeleton, Typography } from "antd";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { RouteNames } from "../../routes/config";
import { useGetUsersQuery } from "../../services/user";
import { Role } from "../../store/slices/type";
import { RootState } from "../../store/store";

const UsersList = () => {
    const user = useSelector((store: RootState) => store.auth.user);
    const { data: users, isFetching, isError } = useGetUsersQuery(undefined, { skip: user?.role !== Role.Admin })

    if (user?.role !== Role.Admin) return <Navigate to={RouteNames.Main} replace />

    if (isFetching) return <Skeleton active />

    if (isError || !users?.length) return <Empty />

    return (
        <Flex vertical gap={24}>
            <Flex gap={12} wrap align="center" justify="space-between">
                <Typography.Title style={{ margin: 0 }}>User List</Typography.Title>
                <Link to={RouteNames.Main}>
                    <Button icon={<StarOutlined />} type="primary">Todos</Button>
                </Link>
            </Flex>
            <Flex gap={20} wrap>
                {
                    users?.map(user => (
                        <Card key={user?.name}>
                            <Flex vertical gap={8}>
                                <Typography.Text strong>{user?.name}</Typography.Text>
                                <Typography.Text strong>{user?.role}</Typography.Text>
                            </Flex>
                        </Card>
                    ))
                }
            </Flex>
        </Flex>
    )
}

export default UsersList