import './MainLayout.scss';
import { NavLink, Outlet } from 'react-router';
import { Layout, Menu, Typography } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import type { MenuItemType } from 'antd/es/menu/interface';
import { ControlOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/user/selectors.ts';

const items: MenuItemType[] = [
  {
    key: '0',
    label: <NavLink to={'/'}>Список задач</NavLink>,
    icon: <UnorderedListOutlined />,
  },
  {
    key: '1',
    label: <NavLink to={'/profile'}>Профиль</NavLink>,
    icon: <UserOutlined />,
  },
];

export const MainLayout = () => {
  const { isAdmin } = useSelector(userSelector);

  const navigationElements: MenuItemType[] = [
    ...items,
    ...(isAdmin
      ? [
          {
            key: '3',
            label: <NavLink to={'/admin/users'}>Пользователи</NavLink>,
            icon: <ControlOutlined />,
          },
        ]
      : []),
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light">
        <div style={{ padding: '12px' }}>
          <Typography.Title level={2}>Навигация</Typography.Title>
        </div>
        <Menu theme="light" defaultSelectedKeys={['0']} mode="inline" items={navigationElements} />
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
