import { Empty, Flex, Skeleton, Typography } from "antd";
import { useGetTodosQuery } from "../../services/todo";
import AddTodoCard from "./components/AddTodoCard";
import TodoItem from "./components/TodoItem";
import UsersBtn from "./components/UsersBtn";

const Todos = () => {
    const { data: todos, isFetching, isError } = useGetTodosQuery();

    if (isFetching) return <Skeleton active />

    if (isError || !todos?.length) return <Empty />

    return (
        <Flex vertical gap={24}>
            <Flex gap={12} wrap align="center" justify="space-between">
                <Typography.Title style={{ margin: 0 }}>Todo List</Typography.Title>
                <UsersBtn />
            </Flex>
            <Flex wrap gap={12} justify="flex-start">
                <AddTodoCard />
                {
                    todos?.map(todo => (
                        <TodoItem key={todo?.id} todo={todo} />
                    ))
                }
            </Flex>
        </Flex>
    )
}

export default Todos