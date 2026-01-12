import './ProfilePage.scss';
import { ProfileCard } from '../../components/ProfileCard/ProfileCard.tsx';
import { Flex } from 'antd';

export const ProfilePage = () => {
  return (
    <Flex className="profile-page_container">
      <ProfileCard />
    </Flex>
  );
};
