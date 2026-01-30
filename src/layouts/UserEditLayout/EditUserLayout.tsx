import { Flex, Layout } from 'antd';
import { NavLink, Outlet } from 'react-router';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Content, Header } from 'antd/es/layout/layout';

const EditUserLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Header style={{ backgroundColor: 'var(--ant-layout-color-bg-body)' }}>
          <NavLink to={'/admin/users'}>
            <ArrowLeftOutlined />
            Вернуться назад
          </NavLink>
        </Header>
        <Content>
          <Flex justify="center">
            <Outlet />
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
};

export default EditUserLayout;
