import './AuthLayout.scss';
import autyLayoutImageUrl from './../../assets/illustration.png';
import { Flex, Layout } from 'antd';
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <>
      <Layout className="auth-layout_root">
        <div className="auth-layout_container">
          <div>
            <img className="auth-layout_thumbnail" src={autyLayoutImageUrl} alt="logo" />
          </div>
          <div>
            <Flex
              orientation="vertical"
              align="center"
              justify="center"
              style={{ width: '100%', height: '100%', padding: '64px' }}
            >
              <Outlet />
            </Flex>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AuthLayout;
