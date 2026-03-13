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
import { WithoutAdminRightsRedirect } from './components/WithoutAdminRightsRedirect/WithoutAdminRightsRedirect.tsx';
import { Roles } from './types/admin.ts';

import './locales/init.ts';

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
        element: <ToDoPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/user/signup',
        element: <SignUpPage />,
      },
      { path: '/user/signin', element: <SignInPage /> },
    ],
  },
  {
    path: '/admin',
    children: [
      {
        element: (
          <WithUnauthorizedRedirect>
            <WithoutAdminRightsRedirect checkRoles={roles => roles.includes(Roles.ADMIN)}>
              <MainLayout />
            </WithoutAdminRightsRedirect>
          </WithUnauthorizedRedirect>
        ),
        children: [
          {
            path: 'users',
            element: <UsersPage />,
          },
        ],
      },
      {
        path: 'user/:id',
        children: [
          {
            index: true,
            element: (
              <WithUnauthorizedRedirect>
                <WithoutAdminRightsRedirect checkRoles={roles => roles.includes(Roles.ADMIN)}>
                  <EditUserPage />
                </WithoutAdminRightsRedirect>
              </WithUnauthorizedRedirect>
            ),
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
