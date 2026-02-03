import type { TodoRequest } from '../../types/todo.ts';
import { createToDo } from '../../api/todo/todo.ts';
import { Form, Input, notification, Button } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { isAxiosError } from 'axios';
import { todoTitleMaxLength, todoTitleMinLength } from '../../const/todo.ts';

type Props = {
  updateTodoData: () => Promise<void>;
};

export const CreateTodoForm = ({ updateTodoData }: Props) => {
  const [form] = useForm<TodoRequest>();
  const [api] = notification.useNotification();

  const onFormSubmit = async (todoData: TodoRequest) => {
    try {
      await createToDo(todoData);
      await updateTodoData();
      form.resetFields();
    } catch (error) {
      if (isAxiosError(error)) {
        api.error({
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
          { min: todoTitleMinLength, message: 'Минимальное количество символов - 2' },
          { max: todoTitleMaxLength, message: 'Максимальное количество символов - 64' },
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
