import './MainLayout.scss';
import { NavLink, Outlet, useLocation } from 'react-router';
import { Layout, Menu, Typography } from 'antd';
import type { MenuItemType } from 'antd/es/menu/interface';
import { ControlOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/user/selectors.ts';
import { Roles } from '../../types/admin.ts';
import { useTranslation } from 'react-i18next';

export const MainLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { userRoles } = useSelector(userSelector);

  const navigationElements: MenuItemType[] = [
    ...[
      {
        key: '/',
        label: <NavLink to={'/'}>{t('Todo List')}</NavLink>,
        icon: <UnorderedListOutlined />,
      },
      {
        key: '/profile',
        label: <NavLink to={'/profile'}>{t('Profile')}</NavLink>,
        icon: <UserOutlined />,
      },
    ],
    ...(userRoles.includes(Roles.ADMIN)
      ? [
          {
            key: '/admin/users',
            label: <NavLink to={'/admin/users'}>{t('Users')}</NavLink>,
            icon: <ControlOutlined />,
          },
        ]
      : []),
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider theme="light">
        <div style={{ padding: '12px' }}>
          <Typography.Title level={2}>{t('Navigation')}</Typography.Title>
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
