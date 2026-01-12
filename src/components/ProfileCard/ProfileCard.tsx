import type { Profile, ProfileRequest } from '../../types/auth.ts';
import { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { Button, Flex, Form, Input, Typography } from 'antd';
import { fetchProfile } from '../../api/user/user.ts';
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router';
import AuthService from '../../services/auth.ts';
import { useNotification } from '../../hooks/useNotification.ts';

export const ProfileCard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form] = useForm<ProfileRequest>();
  const notificationApi = useNotification();

  const handleLogout = async () => {
    try {
      await AuthService.logout();
    } finally {
      navigate('/user/login');
    }
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        const profileData = await fetchProfile();
        setProfile(profileData);
        form.setFieldsValue({
          username: profileData.username,
          email: profileData.email,
          phoneNumber: profileData.phoneNumber,
        });
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

    getProfile();
  }, []);

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
