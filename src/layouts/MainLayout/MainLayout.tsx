import './MainLayout.scss';
import { NavLink, Outlet } from 'react-router';
import { Layout, Space, Typography } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';

export const MainLayout = () => {
  return (
    <Layout className="main-layout_root">
      <Header className="main-layout_header">
        <Typography.Title level={1}>ToDo List</Typography.Title>
      </Header>
      <Layout className="main-layout_body">
        <Content className="main-layout_content">
          <Outlet />
        </Content>
        <Sider className="main-layout_sider" width="15%">
          <Space orientation="vertical">
            <Typography.Title level={2}>Навигация</Typography.Title>
            <NavLink to={'/'}>Список задач</NavLink>
            <NavLink to={'/profile'}>Профиль</NavLink>
          </Space>
        </Sider>
      </Layout>
    </Layout>
  );
};
