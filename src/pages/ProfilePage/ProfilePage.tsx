import './ProfilePage.scss';
import { ProfileCard } from '../../components/ProfileCard/ProfileCard.tsx';
import { Button, Flex } from 'antd';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store/rootStore.ts';
import { getProfileSelector, logoutUserSelector } from '../../store/api/selectors/user.ts';
import { getProfileAction, logoutUserAction } from '../../store/user/actions.ts';
import { useSelector } from 'react-redux';
import { useNotification } from '../../hooks/useNotification.ts';

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { data: profile, error: profileError } = useSelector(getProfileSelector);
  const { error: logoutError } = useSelector(logoutUserSelector);
  const notificationApi = useNotification();

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

  return (
    <Flex className="profile-page_container" orientation="vertical">
      <ProfileCard
        profile={profile}
        onFinish={async () => {
          return;
        }}
        disabled={true}
      />
      <Button type="primary" onClick={handleLogout} style={{ width: '100%', marginTop: '16px' }}>
        Выйти
      </Button>
    </Flex>
  );
};
