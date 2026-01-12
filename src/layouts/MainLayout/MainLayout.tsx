import './MainLayout.scss';
import { NavLink, Outlet } from 'react-router';
import { Layout, Space, Typography } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';

export const MainLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width="15%"
        style={{
          padding: '12px 24px',
        }}
        theme="light"
      >
        <Space orientation="vertical">
          <Typography.Title level={2}>Навигация</Typography.Title>
          <NavLink to={'/'}>Список задач</NavLink>
          <NavLink to={'/profile'}>Профиль</NavLink>
        </Space>
      </Sider>
      <Layout>
        <Header
          style={{
            placeItems: 'center',
            backgroundColor: 'var(--ant-layout-color-bg-body)',
          }}
        >
          <Typography.Title level={1}>ToDo List</Typography.Title>
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
