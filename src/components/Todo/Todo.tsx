import './Todo.scss';
import { useEffect, useState } from 'react';
import type { Todo, TodoRequest } from '../../types/todo.ts';
import { Button, Checkbox, Form, Input, Space, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { CheckOutlined, CloseOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import { TODO_TITLE_MAX_LENGTH, TODO_TITLE_MIN_LENGTH } from '../../const/todo.ts';
import { useAppDispatch } from '../../store/rootStore.ts';
import { deleteTodoAction, updateTodoAction } from '../../store/todo/actions.ts';
import { useSelector } from 'react-redux';
import { deleteTodoSelector, updateTodoSelector } from '../../store/api/selectors/todo.ts';
import { useNotification } from '../../hooks/useNotification.ts';
import { useTranslation } from 'react-i18next';

type Props = {
  todo: Todo;
  updateTodoData: () => Promise<void>;
};

export const ToDo = ({ todo, updateTodoData }: Props) => {
  const { t } = useTranslation();
  const [form] = useForm<{ title: string }>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { error: updateTodoError } = useSelector(updateTodoSelector);
  const { error: deleteTodoError } = useSelector(deleteTodoSelector);
  const notificationApi = useNotification();

  const onTodoChange = async ({ title }: { title: string }) => {
    const data: TodoRequest = { ...todo, title };

    await dispatch(updateTodoAction({ todoId: todo.id, todoData: data }));
    await updateTodoData();
    setIsEditing(false);
  };

  const onTodoStatusChange = async () => {
    const data = { ...todo, isDone: !todo.isDone };

    await dispatch(updateTodoAction({ todoId: todo.id, todoData: data }));
    await updateTodoData();
  };

  const onTodoDelete = async () => {
    await dispatch(deleteTodoAction(todo.id));
    await updateTodoData();
  };

  useEffect(() => {
    [updateTodoError, deleteTodoError].forEach(error => {
      if (!error) return;
      notificationApi.error({
        title: `Ошибка ${error.code}`,
        description: error.message,
        placement: 'bottomRight',
      });
    });
  }, []);

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
              { required: true, message: `${t('Enter todos name')}` },
              {
                min: TODO_TITLE_MIN_LENGTH,
                message: `${t('Minimal symbols amount')} - ${TODO_TITLE_MIN_LENGTH}`,
              },
              {
                max: TODO_TITLE_MAX_LENGTH,
                message: `${t('Maximal symbols amount')} - ${TODO_TITLE_MAX_LENGTH}`,
              },
              {
                message: `${t('Space only not allowed')}`,
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
