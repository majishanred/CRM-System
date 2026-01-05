import './Todo.scss';
import { useState } from 'react';
import { deleteToDo, updateToDo } from '../../api/todo/todo.ts';
import type { Todo, TodoRequest } from '../../types/todo.ts';
import { Button } from '../../ui/Button/Button.tsx';
import { Checkbox, Form, Typography, Input, Flex } from 'antd';
import { useForm } from 'antd/es/form/Form';

type ToDoProps = {
  todo: Todo;
  updateTodoData: () => Promise<void>;
};

export const ToDo = ({ todo, updateTodoData }: ToDoProps) => {
  const [form] = useForm<{ title: string }>();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const onTodoChange = async ({ title }: { title: string }) => {
    const data: TodoRequest = { ...todo, title };

    try {
      await updateToDo(todo.id, data);
      await updateTodoData();
      setIsEditing(false);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const onTodoStatusChange = async () => {
    const data = { ...todo, isDone: !todo.isDone };

    try {
      await updateToDo(todo.id, data);
      await updateTodoData();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const onTodoDelete = async () => {
    try {
      await deleteToDo(todo.id);
      await updateTodoData();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
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
              { min: 2, message: 'Минимальное количество символов - 2' },
              { max: 64, message: 'Максимальное количество символов - 64' },
              {
                message: 'Текст задачи не может состоять только из пробелов',
                validator: (_, value: string) => {
                  if (value.length > 1 && !value.trim()) {
                    return Promise.reject(
                      new Error('Текст задачи не может состоять только из пробелов')
                    );
                  } else {
                    return Promise.resolve();
                  }
                },
              },
            ]}
            validateTrigger={'onChange'}
            style={{ flex: 1, marginRight: '8px', marginBottom: 0 }}
          >
            <Input type="text" aria-required="true" />
          </Form.Item>
          <Flex gap="8px" style={{ marginLeft: 'auto' }}>
            <Form.Item noStyle>
              <Button type="primary" htmlType="submit">
                <span className="material-symbols-outlined">check</span>
              </Button>
            </Form.Item>
            <Form.Item noStyle>
              <Button type="primary" htmlType="reset">
                <span className="material-symbols-outlined">close</span>
              </Button>
            </Form.Item>
          </Flex>
        </Form>
      ) : (
        <div className="todo">
          <Checkbox name="isDone" defaultChecked={todo.isDone} onChange={onTodoStatusChange} />
          <Typography.Paragraph style={{ marginBottom: '0' }}>{todo.title}</Typography.Paragraph>
          <Flex gap="8px" style={{ marginLeft: 'auto' }}>
            <Button type="primary" onClick={() => setIsEditing(true)}>
              <span className="material-symbols-outlined todo_icon">edit</span>
            </Button>
            <Button type="primary" danger onClick={onTodoDelete}>
              <span className="material-symbols-outlined todo_icon">delete</span>
            </Button>
          </Flex>
        </div>
      )}
    </>
  );
};
