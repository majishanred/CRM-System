import './EditUserPage.scss';
import { useEffect, useState } from 'react';
import { Button, Card, Form } from 'antd';
import { ProfileCard } from '../../components/ProfileCard/ProfileCard.tsx';
import { useLoaderData } from 'react-router';
import { useNotification } from '../../hooks/useNotification.ts';
import { useSelector } from 'react-redux';
import { getUserSelector, updateUserProfileSelector } from '../../store/api/selectors/admin.ts';
import { useAppDispatch } from '../../store/rootStore.ts';
import { getUserAction, updateUserAction } from '../../store/admin/actions.ts';
import type { UserRequest } from '../../types/admin.ts';

export const EditUserPage = () => {
  const { userId } = useLoaderData<{ userId: number }>();
  const { data: userProfileData, error: getUserError } = useSelector(getUserSelector);
  const { error: updateUserProfileError } = useSelector(updateUserProfileSelector);
  const notificationApi = useNotification();
  const [isEditState, setIsEditState] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleUpdateUser = async (userData: UserRequest) => {
    if (!userProfileData) {
      return;
    }

    const updatedUser: UserRequest = {};

    const userKeys: (keyof UserRequest)[] = ['username', 'email', 'phoneNumber'];

    for (const key of userKeys) {
      if (userProfileData[key] === userData[key]) continue;

      updatedUser[key] = userData[key];
    }

    await dispatch(updateUserAction({ userData: updatedUser, userId }));
    await dispatch(getUserAction(userId));
    setIsEditState(false);
  };

  useEffect(() => {
    dispatch(getUserAction(userId));
  }, []);

  useEffect(() => {
    [getUserError, updateUserProfileError].forEach(error => {
      if (!error) return;

      notificationApi.error({
        title: 'Прозошла ошибка',
        description: 'Попробуйте позже',
        placement: 'bottomRight',
      });
    });
  }, [getUserError, updateUserProfileError]);

  return (
    <Card style={{ maxWidth: '640px', flexGrow: 1 }}>
      <ProfileCard
        profile={userProfileData}
        onFinish={handleUpdateUser}
        onResetCallback={() => setIsEditState(false)}
        disabled={!isEditState}
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
      </ProfileCard>
      {!isEditState && (
        <Button style={{ width: '100%' }} type="primary" onClick={() => setIsEditState(true)}>
          Редактировать
        </Button>
      )}
    </Card>
  );
};
