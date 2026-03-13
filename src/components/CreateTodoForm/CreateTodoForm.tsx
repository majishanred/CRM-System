import type { TodoRequest } from '../../types/todo.ts';
import { Button, Form, Input } from 'antd';
import { TODO_TITLE_MAX_LENGTH, TODO_TITLE_MIN_LENGTH } from '../../const/todo.ts';
import { useAppDispatch } from '../../store/rootStore.ts';
import { createTodoAction } from '../../store/todo/actions.ts';
import { useSelector } from 'react-redux';
import { createTodoSelector } from '../../store/api/selectors/todo.ts';
import { useEffect } from 'react';
import { useNotification } from '../../hooks/useNotification.ts';
import { useTranslation } from 'react-i18next';

type Props = {
  updateTodoData: () => Promise<void>;
};

export const CreateTodoForm = ({ updateTodoData }: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<TodoRequest>();
  const dispatch = useAppDispatch();
  const { error } = useSelector(createTodoSelector);
  const notificationApi = useNotification();

  const onFormSubmit = async (todoData: TodoRequest) => {
    await dispatch(createTodoAction(todoData));
    await updateTodoData();
    form.resetFields();
  };

  useEffect(() => {
    if (!error) return;

    notificationApi.error({
      title: `Ошибка ${error.code}`,
      description: error.message,
      placement: 'bottomRight',
    });
  }, [error]);

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
        style={{ flex: 1 }}
      >
        <Input type="text" id="taskTitle" placeholder={t('Enter todo name')} />
      </Form.Item>
      <Form.Item noStyle>
        <Button htmlType="submit" type="primary">
          {t('Create Todo')}
        </Button>
      </Form.Item>
    </Form>
  );
};
