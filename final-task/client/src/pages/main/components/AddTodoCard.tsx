import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Form, Input, message, Modal, Typography } from "antd";
import { useCreateTodoMutation } from "../../../services/todo";
import { ITodo } from "../../../services/todo/type";

const AddTodoCard = () => {
    const [createTodo] = useCreateTodoMutation();

    const handleCreateTodo = async (values: Omit<ITodo, 'id' | 'createdBy'>) => {
        try {
            await createTodo(values).unwrap();
            message.destroy();
            message.success(`${values?.title} is successfully created`);
            Modal.destroyAll();

        } catch (err) {
            console.error(err);
            message.error("Error in creating todo")
        }
    }

    const openModal = () => {
        Modal.confirm({
            title: "Create Todo",
            icon: null,
            closable: true,
            footer: null,
            maskClosable: true,
            content: (
                <Form onFinish={handleCreateTodo}>
                    <Flex vertical gap={8}>
                        <Form.Item name={'title'} rules={[{ required: true, message: "Title should not be empty" }]}>
                            <Input placeholder="Title" />
                        </Form.Item>
                        <Form.Item name={'description'} rules={[{ required: true, message: "Description should not be empty" }]}>
                            <Input placeholder="Description" />
                        </Form.Item>
                        <Button htmlType="submit" icon={<PlusOutlined />} type="primary">Add</Button>
                    </Flex>
                </Form>
            )
        })
    }

    return (
        <Card hoverable onClick={openModal} className="add-todo-card">
            <Flex vertical gap={8} align='center' justify="center">
                <PlusOutlined style={{ fontSize: 50 }} />
                <Typography.Text>Add Todo</Typography.Text>
            </Flex>
        </Card>
    )
}

export default AddTodoCard