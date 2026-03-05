import type { ProfileRequest } from '../../types/auth.ts';
import { useEffect } from 'react';
import { Button, Flex, Form, Input, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useNotification } from '../../hooks/useNotification.ts';
import { getProfileAction, logoutUserAction } from '../../store/user/actions.ts';
import { useAppDispatch } from '../../store/rootStore.ts';
import { useSelector } from 'react-redux';
import { logoutUserSelector, getProfileSelector } from '../../store/api/selectors/user.ts';

export const ProfileCard = () => {
  const dispatch = useAppDispatch();
  const [form] = useForm<ProfileRequest>();
  const notificationApi = useNotification();
  const { error: logoutError } = useSelector(logoutUserSelector);
  const { data: profile, error: profileError } = useSelector(getProfileSelector);

  const handleLogout = async () => {
    await dispatch(logoutUserAction());
  };

  useEffect(() => {
    dispatch(getProfileAction());
  }, []);

  useEffect(() => {
    [logoutError, profileError].forEach(error => {
      if (!error) return;
      notificationApi.error({
        title: `Ошибка`,
        description: 'Произошла ошибка',
        placement: 'bottomRight',
      });
    });
  }, [logoutError, profileError]);

  useEffect(() => {
    form.setFieldsValue({
      username: profile?.username,
      email: profile?.email,
      phoneNumber: profile?.phoneNumber,
    });
  }, [profile]);

  return (
    <Flex gap="8px" orientation="vertical" flex={1}>
      <Flex justify="center" style={{ marginBottom: '24px' }}>
        <Typography.Title level={2}>Профиль</Typography.Title>
      </Flex>
      <Form
        initialValues={{
          username: profile?.username,
          email: profile?.email,
          phoneNumber: profile?.phoneNumber,
        }}
        disabled
        form={form}
        labelAlign="left"
        style={{ width: '100%' }}
      >
        <Form.Item name="username" label="Имя пользователя">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Почта">
          <Input />
        </Form.Item>
        <Form.Item name="phoneNumber" label="Номер телефона">
          <Input />
        </Form.Item>
      </Form>
      <Button type="primary" onClick={handleLogout} style={{ marginTop: '16px' }}>
        Выйти
      </Button>
    </Flex>
  );
};
