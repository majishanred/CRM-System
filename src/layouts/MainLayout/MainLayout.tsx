import './MainLayout.scss';
import { NavLink, Outlet, useLocation } from 'react-router';
import { Layout, Menu, Typography } from 'antd';
import type { MenuItemType } from 'antd/es/menu/interface';
import { ControlOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/user/selectors.ts';

const siderNavigationItems: MenuItemType[] = [
  {
    key: '/',
    label: <NavLink to={'/'}>Список задач</NavLink>,
    icon: <UnorderedListOutlined />,
  },
  {
    key: '/profile',
    label: <NavLink to={'/profile'}>Профиль</NavLink>,
    icon: <UserOutlined />,
  },
];

export const MainLayout = () => {
  const location = useLocation();
  const { isAdmin } = useSelector(userSelector);

  const navigationElements: MenuItemType[] = [
    ...siderNavigationItems,
    ...(isAdmin
      ? [
          {
            key: '/admin/users',
            label: <NavLink to={'/admin/users'}>Пользователи</NavLink>,
            icon: <ControlOutlined />,
          },
        ]
      : []),
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider theme="light">
        <div style={{ padding: '12px' }}>
          <Typography.Title level={2}>Навигация</Typography.Title>
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
          items={navigationElements}
        />
      </Layout.Sider>
      <Layout>
        <Layout.Header
          style={{
            placeItems: 'center',
            backgroundColor: 'var(--ant-layout-color-bg-body)',
          }}
        >
          <Typography.Title level={1}>ToDo List</Typography.Title>
        </Layout.Header>
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
