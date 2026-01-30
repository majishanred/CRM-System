import { ToDoPage } from './pages/TodoPage/TodoPage.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ProfilePage } from './pages/ProfilePage/ProfilePage.tsx';
import { MainLayout } from './layouts/MainLayout/MainLayout.tsx';
import { NotificationProvider } from './contexts/notification/provider.tsx';
import AuthLayout from './layouts/AuthLayout/AuthLayout.tsx';
import { SignUpPage } from './pages/SignUpPage/SignUpPage.tsx';
import { SignInPage } from './pages/SignInPage/SignInPage.tsx';
import { rootStore } from './store/rootStore.ts';
import { Provider } from 'react-redux';
import { WithUnauthorizedRedirect } from './components/WithUnauthorizedRedirect/WithUnauthorizedRedirect.tsx';
import { AuthInitializer } from './components/AuthInitializer/AuthInitializer.tsx';
import { UsersPage } from './pages/UsersPage/UsersPage.tsx';
import { EditUserPage } from './pages/EditUserPage/EditUserPage.tsx';
import EditUserLayout from './layouts/UserEditLayout/EditUserLayout.tsx';
import { WithoutAdminRightsRedirect } from './components/WithoutAdminRightsRedirect/WithoutAdminRightsRedirect.tsx';

const router = createBrowserRouter([
  {
    element: (
      <WithUnauthorizedRedirect>
        <MainLayout />
      </WithUnauthorizedRedirect>
    ),
    children: [
      {
        path: '/',
        Component: ToDoPage,
      },
      {
        path: '/profile',
        Component: ProfilePage,
      },
    ],
  },
  {
    Component: AuthLayout,
    children: [
      {
        path: '/user/signup',
        Component: SignUpPage,
      },
      { path: '/user/signin', Component: SignInPage },
    ],
  },
  {
    path: '/admin',
    children: [
      {
        element: (
          <WithUnauthorizedRedirect>
            <WithoutAdminRightsRedirect>
              <MainLayout />
            </WithoutAdminRightsRedirect>
          </WithUnauthorizedRedirect>
        ),
        children: [
          {
            path: 'users',
            Component: UsersPage,
          },
        ],
      },
      {
        element: (
          <WithUnauthorizedRedirect>
            <WithoutAdminRightsRedirect>
              <EditUserLayout />
            </WithoutAdminRightsRedirect>
          </WithUnauthorizedRedirect>
        ),
        path: 'user/:id',
        children: [
          {
            index: true,
            loader: ({ params }) => {
              return { userId: params.id };
            },
            Component: EditUserPage,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Provider store={rootStore}>
        <NotificationProvider>
          <AuthInitializer>
            <RouterProvider router={router} />
          </AuthInitializer>
        </NotificationProvider>
      </Provider>
    </>
  );
}

export default App;
