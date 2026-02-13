import type { TodoRequest } from '../../types/todo.ts';
import { createTodo } from '../../api/todo/todo.ts';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { isAxiosError } from 'axios';
import { TODO_TITLE_MAX_LENGTH, TODO_TITLE_MIN_LENGTH } from '../../const/todo.ts';
import { useNotification } from '../../hooks/useNotification.ts';

type Props = {
  updateTodoData: () => Promise<void>;
};

export const CreateTodoForm = ({ updateTodoData }: Props) => {
  const [form] = useForm<TodoRequest>();
  const notificationApi = useNotification();

  const onFormSubmit = async (todoData: TodoRequest) => {
    try {
      await createTodo(todoData);
      await updateTodoData();
      form.resetFields();
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
    <Form
      form={form}
      id="taskForm"
      onFinish={onFormSubmit}
      initialValues={{
        title: '',
        isDone: false,
      }}
      layout="inline"
      variant="outlined"
      styles={{
        root: {
          width: '100%',
          display: 'flex',
          flexWrap: 'nowrap',
          gap: '8px',
        },
      }}
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
        style={{ flex: 1 }}
      >
        <Input type="text" id="taskTitle" placeholder="Введите название задачи" />
      </Form.Item>
      <Form.Item noStyle>
        <Button htmlType="submit" type="primary">
          Создать задачу
        </Button>
      </Form.Item>
    </Form>
  );
};
