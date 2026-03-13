import './EditUserPage.scss';
import { useEffect, useState } from 'react';
import { Button, Card, Flex, Form, Layout } from 'antd';
import { ProfileForm } from '../../components/ProfileForm/ProfileForm.tsx';
import { NavLink, useParams } from 'react-router';
import { useNotification } from '../../hooks/useNotification.ts';
import { useSelector } from 'react-redux';
import { getUserSelector, updateUserProfileSelector } from '../../store/api/selectors/admin.ts';
import { useAppDispatch } from '../../store/rootStore.ts';
import { getUserAction, updateUserAction } from '../../store/admin/actions.ts';
import type { UserRequest } from '../../types/admin.ts';
import { pickChangedFieldsFromObjects } from '../../utils/utils.ts';
import { ArrowLeftOutlined } from '@ant-design/icons';

export const EditUserPage = () => {
  const { id: userId } = useParams<{ id: string }>();
  const { data: userProfileData, error: getUserError } = useSelector(getUserSelector);
  const { error: updateUserProfileError } = useSelector(updateUserProfileSelector);
  const notificationApi = useNotification();
  const [isEditState, setIsEditState] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleUpdateUser = async (userData: UserRequest) => {
    if (!userProfileData) {
      return;
    }

    const updatedUser: UserRequest = pickChangedFieldsFromObjects(userData, userProfileData, [
      'username',
      'email',
      'phoneNumber',
    ]);

    await dispatch(updateUserAction({ userData: updatedUser, userId: +(userId || '') }));
    await dispatch(getUserAction(+(userId || '')));
    setIsEditState(false);
  };

  useEffect(() => {
    dispatch(getUserAction(+(userId || '')));
  }, []);

  useEffect(() => {
    [getUserError, updateUserProfileError].forEach(error => {
      if (!error) return;

      notificationApi.error({
        title: 'Произошла ошибка',
        description: 'Попробуйте позже',
        placement: 'bottomRight',
      });
    });
  }, [getUserError, updateUserProfileError]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Layout.Header style={{ backgroundColor: 'var(--ant-layout-color-bg-body)' }}>
          <NavLink to={'/admin/users'}>
            <ArrowLeftOutlined />
            Вернуться назад
          </NavLink>
        </Layout.Header>
        <Layout.Content>
          <Flex justify="center">
            <Card style={{ maxWidth: '640px', flexGrow: 1 }}>
              <ProfileForm
                profile={userProfileData}
                onFinish={handleUpdateUser}
                onResetCallback={() => setIsEditState(false)}
                isDisabled={!isEditState}
              >
                {isEditState && (
                  <>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Сохранить
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="reset" style={{ width: '100%' }}>
                        Отменить
                      </Button>
                    </Form.Item>
                  </>
                )}
              </ProfileForm>
              {!isEditState && (
                <Button
                  style={{ width: '100%' }}
                  type="primary"
                  onClick={() => setIsEditState(true)}
                >
                  Редактировать
                </Button>
              )}
            </Card>
          </Flex>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
