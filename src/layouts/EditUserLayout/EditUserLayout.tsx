import { Flex, Layout } from 'antd';
import { NavLink, Outlet } from 'react-router';
import { ArrowLeftOutlined } from '@ant-design/icons';

const EditUserLayout = () => {
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
            <Outlet />
          </Flex>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default EditUserLayout;
