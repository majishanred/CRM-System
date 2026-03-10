import type { Profile, ProfileRequest } from '../../types/auth.ts';
import { type PropsWithChildren, useEffect } from 'react';
import { Flex, Form, Input, Typography } from 'antd';
import {
  PROFILE_CARD_PHONE_NUMBER_PATTERN,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_PATTERN,
} from '../../const/user.ts';

type Props = {
  profile?: Profile | null;
  onFinish?: (profileData: ProfileRequest) => Promise<void>;
  onResetCallback?: () => void;
  isDisabled?: boolean;
};

export const ProfileCard = ({
  profile,
  onFinish,
  onResetCallback,
  isDisabled,
  children,
}: PropsWithChildren<Props>) => {
  const [form] = Form.useForm<ProfileRequest>();

  const onFormReset = () => {
    form.resetFields();
    onResetCallback?.();
  };

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
        onFinish={onFinish}
        onReset={onFormReset}
        disabled={isDisabled}
        form={form}
        labelAlign="left"
        style={{ width: '100%' }}
      >
        <Form.Item
          name="username"
          label="Имя пользователя"
          required={false}
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
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Почта"
          required={false}
          rules={[
            { type: 'email', message: 'Некоректная почта' },
            { required: true, message: 'Поле обязательно' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Номер телефона"
          rules={[
            {
              pattern: PROFILE_CARD_PHONE_NUMBER_PATTERN,
              message: 'Введите корректный номер телефона',
            },
          ]}
        >
          <Input />
        </Form.Item>
        {children}
      </Form>
    </Flex>
  );
};
