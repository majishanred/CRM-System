import { Button, Divider, Flex, Form, Input, Modal, Space, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import type { UserRegistration } from '../../types/auth.ts';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import {
  USER_LOGIN_MAX_LENGTH,
  USER_LOGIN_MIN_LENGTH,
  USER_LOGIN_PATTERN,
  USER_PASSWORD_MAX_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
  USER_PHONE_NUMBER_PATTERN,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_PATTERN,
} from '../../const/user.ts';
import { useNotification } from '../../hooks/useNotification.ts';
import { signUpUser } from '../../store/user/actions.ts';
import { useAppDispatch } from '../../store/rootStore.ts';
import { useSelector } from 'react-redux';
import { signUpUserSelector } from '../../store/api/selectors/user.ts';

type UserRegistrationData = UserRegistration & {
  confirmPassword: string;
  phoneNumberPrefix: string;
};

export const SignUpPage = () => {
  const [form] = useForm<UserRegistrationData>();
  const { error } = useSelector(signUpUserSelector);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalApi, contextHolder] = Modal.useModal();
  const notificationApi = useNotification();

  const handleSubmit = async (userData: Omit<UserRegistrationData, 'confirmPassword'>) => {
    try {
      setIsLoading(true);

      const { login, username, email, password, phoneNumber = '', phoneNumberPrefix } = userData;

      await dispatch(
        signUpUser({
          login,
          username,
          email,
          password,
          phoneNumber: phoneNumber ? phoneNumberPrefix + phoneNumber : phoneNumber,
        })
      );

      await modalApi.success({
        title: 'Вы успешно зарегестрированы!',
        content: (
          <Typography.Paragraph>
            Для авторизации перейдите по ссылке: <NavLink to={'/user/login'}>войти</NavLink>
          </Typography.Paragraph>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    switch (error?.status) {
      case 400:
        notificationApi.error({
          title: `Ошибка ${error.code}`,
          description: 'Неправильный ввод полей',
          placement: 'bottomRight',
        });

        break;
      case 409:
        form.setFields([
          {
            name: 'email',
            errors: ['Этот email или логин уже зарегистрированы'],
          },
          {
            name: 'login',
            errors: ['Этот логин или email уже зарегистрированы'],
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
  }, [error]);

  return (
    <>
      <Flex justify="center" style={{ paddingBottom: '24px' }}>
        <Typography.Title level={2}>Зарегистрироваться</Typography.Title>
      </Flex>
      <Form
        form={form}
        validateTrigger="onSubmit"
        initialValues={{
          login: '',
          username: '',
          email: '',
          password: '',
          phoneNumber: '',
          phoneNumberPrefix: '+7',
          confirmPassword: '',
        }}
        onFinish={handleSubmit}
        disabled={isLoading}
        variant="outlined"
        labelAlign="left"
        style={{ width: '100%' }}
      >
        <Form.Item
          name="username"
          label="Имя пользователя"
          rules={[
            { min: USERNAME_MIN_LENGTH, message: 'Минимальная длинна - 1 символ' },
            { max: USERNAME_MAX_LENGTH, message: 'Минимальная длинна - 60 символов' },
            { required: true, message: 'Поле обязательно' },
            {
              pattern: USERNAME_PATTERN,
              message: 'Допустимо вводить только русские/латинские символы',
            },
          ]}
        >
          <Input placeholder="Введите имя пользователя" />
        </Form.Item>
        <Form.Item
          name="login"
          label="Логин"
          rules={[
            { min: USER_LOGIN_MIN_LENGTH, message: 'Минимальная длинна - 2 символа' },
            { max: USER_LOGIN_MAX_LENGTH, message: 'Минимальная длинна - 60 символов' },
            { required: true, message: 'Поле обязательно' },
            { pattern: USER_LOGIN_PATTERN, message: 'Допустимо вводить только латинские символы' },
          ]}
        >
          <Input placeholder="Введите логин" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Пароль"
          rules={[
            { min: USER_PASSWORD_MIN_LENGTH, message: 'Минимальная длинна - 6 символов' },
            { max: USER_PASSWORD_MAX_LENGTH, message: 'Минимальная длинна - 60 символа' },
            { required: true, message: 'Поле обязательно' },
          ]}
        >
          <Input.Password placeholder="Введите пароль" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Повторите пароль"
          rules={[
            { required: true, message: 'Поле обязательно' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Повторите пароль" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Почта"
          rules={[
            { type: 'email', message: 'Некоректная почта' },
            { required: true, message: 'Поле обязательно' },
          ]}
        >
          <Input placeholder="Введите почту" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Номер телефона"
          rules={[
            {
              pattern: USER_PHONE_NUMBER_PATTERN,
              message: 'Введите корректный номер телефона',
            },
          ]}
        >
          <Space.Compact block>
            <Form.Item noStyle name="phoneNumberPrefix">
              <Input disabled style={{ width: 50 }} />
            </Form.Item>
            <Input placeholder="Введите номер телефона" />
          </Space.Compact>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" styles={{ root: { width: '100%' } }}>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <Flex justify="center" gap={8}>
        <Typography.Paragraph>Уже зарегистрированы?</Typography.Paragraph>
        <NavLink to={'/user/login'}>Войти</NavLink>
      </Flex>
      {contextHolder}
    </>
  );
};
