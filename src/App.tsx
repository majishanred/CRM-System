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
