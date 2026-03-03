import { useForm } from 'antd/es/form/Form';
import type { AuthData } from '../../types/auth.ts';
import { Button, Divider, Flex, Form, Input, Typography } from 'antd';
import { NavLink, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useNotification } from '../../hooks/useNotification.ts';
import { signInUserAction } from '../../store/user/actions.ts';
import { useAppDispatch } from '../../store/rootStore.ts';
import { useSelector } from 'react-redux';
import { signInUserSelector } from '../../store/api/selectors/user.ts';

export const SignInPage = () => {
  const [form] = useForm<AuthData>();
  const {
    error,
    status: { isLoading, isLoaded },
  } = useSelector(signInUserSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const notificationApi = useNotification();

  const handleSubmit = async (authData: AuthData) => {
    await dispatch(signInUserAction(authData));
  };

  useEffect(() => {
    if (isLoaded) {
      navigate('/');
    }
  }, [isLoaded]);

  useEffect(() => {
    if (!error) {
      return;
    }

    notificationApi.error({
      title: `Ошибка`,
      description: 'Не удалось выполнить вход',
      placement: 'bottomRight',
    });
  }, [error]);

  return (
    <>
      <Flex justify="center" style={{ paddingBottom: '24px' }}>
        <Typography.Title level={2}>Войти</Typography.Title>
      </Flex>
      <Form
        form={form}
        onFinish={handleSubmit}
        disabled={isLoading}
        initialValues={{
          login: '',
          password: '',
        }}
        labelAlign="left"
        style={{ width: '100%' }}
      >
        <Form.Item
          name="login"
          label="Логин"
          required={false}
          rules={[{ required: true, message: 'Введите логин' }]}
        >
          <Input placeholder="Введите логин" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Пароль"
          required={false}
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password placeholder="Введите пароль" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" styles={{ root: { width: '100%' } }}>
            Войти
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <Flex justify="center" gap={8}>
        <Typography.Paragraph>Ещё не зарегестрированы?</Typography.Paragraph>
        <NavLink to={'/user/signup'}>Зарегестрироваться</NavLink>
      </Flex>
    </>
  );
};
