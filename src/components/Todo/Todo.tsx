import './Todo.scss';
import { useState } from 'react';
import { deleteTodo, updateTodo } from '../../api/todo/todo.ts';
import type { Todo, TodoRequest } from '../../types/todo.ts';
import { Button, Checkbox, Form, Input, Space, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { isAxiosError } from 'axios';
import { CheckOutlined, CloseOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import { TODO_TITLE_MAX_LENGTH, TODO_TITLE_MIN_LENGTH } from '../../const/todo.ts';
import { useNotification } from '../../hooks/useNotification.ts';

type Props = {
  todo: Todo;
  updateTodoData: () => Promise<void>;
};

export const ToDo = ({ todo, updateTodoData }: Props) => {
  const [form] = useForm<{ title: string }>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const notificationApi = useNotification();

  const onTodoChange = async ({ title }: { title: string }) => {
    const data: TodoRequest = { ...todo, title };

    try {
      await updateTodo(todo.id, data);
      await updateTodoData();
      setIsEditing(false);
    } catch (error) {
      if (isAxiosError(error)) {
        notificationApi.error({
          title: `Ошибка ${error.code}`,
          description: error.message,
          placement: 'bottomRight',
        });
      }
    }
  };

  const onTodoStatusChange = async () => {
    const data = { ...todo, isDone: !todo.isDone };

    try {
      await updateTodo(todo.id, data);
      await updateTodoData();
    } catch (error) {
      if (isAxiosError(error)) {
        notificationApi.error({
          title: `Ошибка ${error.code}`,
          description: error.message,
          placement: 'bottomRight',
        });
      }
    }
  };

  const onTodoDelete = async () => {
    try {
      await deleteTodo(todo.id);
      await updateTodoData();
    } catch (error) {
      if (isAxiosError(error)) {
        notificationApi.error({
          title: `Ошибка ${error.code}`,
          description: error.message,
          placement: 'bottomRight',
        });
      }
    }
  };

  return (
    <>
      {isEditing ? (
        <Form
          form={form}
          className="todo"
          onFinish={onTodoChange}
          onReset={() => setIsEditing(false)}
          initialValues={{
            title: todo.title,
          }}
          variant="outlined"
          validateTrigger="onChange"
        >
          <Form.Item
            name="title"
            rules={[
              { required: true, message: 'Введите название задачи' },
              { min: TODO_TITLE_MIN_LENGTH, message: 'Минимальное количество символов - 2' },
              { max: TODO_TITLE_MAX_LENGTH, message: 'Максимальное количество символов - 64' },
              {
                message: 'Текст задачи не может состоять только из пробелов',
                whitespace: true,
              },
            ]}
            validateTrigger={'onSubmit'}
            style={{ flex: 1, marginRight: '8px', marginBottom: 0 }}
          >
            <Input type="text" aria-required="true" />
          </Form.Item>
          <Space orientation="horizontal" style={{ marginLeft: 'auto' }}>
            <Form.Item noStyle>
              <Button type="primary" size="large" htmlType="submit">
                <CheckOutlined />
              </Button>
            </Form.Item>
            <Form.Item noStyle>
              <Button type="primary" size="large" htmlType="reset">
                <CloseOutlined />
              </Button>
            </Form.Item>
          </Space>
        </Form>
      ) : (
        <div className="todo">
          <Checkbox name="isDone" defaultChecked={todo.isDone} onChange={onTodoStatusChange} />
          <Typography.Paragraph style={{ marginBottom: '0' }}>{todo.title}</Typography.Paragraph>
          <Space orientation="horizontal" style={{ marginLeft: 'auto' }}>
            <Button type="primary" size="large" onClick={() => setIsEditing(true)}>
              <EditFilled />
            </Button>
            <Button type="primary" size="large" danger onClick={onTodoDelete}>
              <DeleteFilled />
            </Button>
          </Space>
        </div>
      )}
    </>
  );
};
