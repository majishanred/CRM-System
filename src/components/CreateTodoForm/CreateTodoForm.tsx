import type { TodoRequest } from '../../types/todo.ts';
import { createToDo } from '../../api/todo/todo.ts';
import { Button } from '../../ui/Button/Button.tsx';
import { Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';

type CreateTodoFormProps = {
  updateTodoData: () => Promise<void>;
};

export const CreateTodoForm = ({ updateTodoData }: CreateTodoFormProps) => {
  const [form] = useForm<TodoRequest>();

  const onFormSubmit = async (todoData: TodoRequest) => {
    try {
      await createToDo(todoData);
      await updateTodoData();
      form.resetFields();
    } catch (error) {
      if (error instanceof Error) alert(error.message);
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
        validateTrigger={['onChange', 'onBlur']}
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
