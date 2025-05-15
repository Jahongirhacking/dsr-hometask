import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Card, Flex, Form, Input, message, Modal, Typography } from "antd"
import { useSelector } from "react-redux"
import { useDeleteTodoItemMutation, useEditTodoItemMutation } from "../../../services/todo"
import { ITodo } from "../../../services/todo/type"
import { Role } from "../../../store/slices/type"
import { RootState } from "../../../store/store"

const TodoItem = ({ todo }: { todo: ITodo }) => {
    const user = useSelector((store: RootState) => store.auth.user);
    const [editTodo] = useEditTodoItemMutation();
    const [deleteTodo] = useDeleteTodoItemMutation();


    const handleEdit = async (values: Pick<ITodo, 'title' | 'description'>) => {
        try {
            await editTodo({ id: todo?.id, ...values }).unwrap();
            message.destroy();
            message.success(`Successfully edited`);
            Modal.destroyAll();
        } catch (err) {
            console.error(err);
            message.error("Error in editing todo")
        }
    }


    const handleDelete = async () => {
        try {
            if (confirm(`Do you really want to delete: ${todo?.title}`)) {
                await deleteTodo({ id: todo?.id });
            }
            message.destroy();
            message.success(`${todo?.title} successfully deleted`)
        } catch (err) {
            console.error(err);
            message.error("Error in deleting todo")
        }
    }

    const openEditModal = () => {
        Modal.confirm({
            title: "Edit Todo",
            icon: null,
            closable: true,
            footer: null,
            maskClosable: true,
            content: (
                <Form
                    onFinish={handleEdit}
                    initialValues={{
                        title: todo?.title,
                        description: todo?.description
                    }}
                >
                    <Flex vertical gap={8}>
                        <Form.Item name={'title'} rules={[{ required: true, message: "Title should not be empty" }]}>
                            <Input placeholder="Title" />
                        </Form.Item>
                        <Form.Item name={'description'} rules={[{ required: true, message: "Description should not be empty" }]}>
                            <Input placeholder="Description" />
                        </Form.Item>
                        <Button htmlType="submit" icon={<EditOutlined />} type="primary">Edit</Button>
                    </Flex>
                </Form>
            )
        })
    }

    return (
        <Card
            key={todo?.id}
            className="task-card"
            actions={user?.role === Role.Admin || todo?.createdBy === user?.role ? [
                <Button variant='filled' color='primary' icon={<EditOutlined />} onClick={openEditModal} />,
                <Button variant='filled' color='danger' icon={<DeleteOutlined />} onClick={handleDelete} />,
            ] : []}
        >
            <Flex vertical gap={8}>
                <Typography.Text strong>{todo?.title}</Typography.Text>
                <Typography.Text>{todo?.description}</Typography.Text>
                <Typography.Text>by {todo?.createdBy}</Typography.Text>
            </Flex>
        </Card>
    )
}

export default TodoItem