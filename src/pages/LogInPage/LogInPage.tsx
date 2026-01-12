import { useForm } from 'antd/es/form/Form';
import type { AuthData } from '../../types/auth.ts';
import { Button, Divider, Flex, Form, Input, Typography } from 'antd';
import { NavLink, useNavigate } from 'react-router';
import { AxiosError } from 'axios';
import { useState } from 'react';
import AuthService from '../../services/auth.ts';
import { useNotification } from '../../hooks/useNotification.ts';

export const LogInPage = () => {
  const [form] = useForm<AuthData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const notificationApi = useNotification();

  const handleSubmit = async (authData: AuthData) => {
    setIsLoading(true);

    try {
      await AuthService.login(authData);
      navigate('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.status) {
          case 400:
            form.setFields([
              {
                name: 'login',
                errors: ['Недопустимое значение поля'],
              },
              {
                name: 'password',
                errors: ['Недопустимое значение поля'],
              },
            ]);
            break;
          case 401:
            form.setFields([
              {
                name: 'login',
                errors: ['Неверные логин или пароль'],
              },
              {
                name: 'password',
                errors: ['Неверные логин или пароль'],
              },
            ]);
            break;
          case 500:
            notificationApi.error({
              title: `Ошибка ${error.code}`,
              description: error.message,
              placement: 'bottomRight',
            });
        }
      }
    }

    setIsLoading(false);
  };

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
        <NavLink to={'/user/signin'}>Зарегестрироваться</NavLink>
      </Flex>
    </>
  );
};
