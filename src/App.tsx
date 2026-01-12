import { ToDoPage } from './pages/TodoPage/TodoPage.tsx';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router';
import { ProfilePage } from './pages/ProfilePage/ProfilePage.tsx';
import { MainLayout } from './layouts/MainLayout/MainLayout.tsx';
import { NotificationProvider } from './contexts/notification/provider.tsx';
import AuthLayout from './layouts/AuthLayout/AuthLayout.tsx';
import { SignInPage } from './pages/SignInPage/SignInPage.tsx';
import { LogInPage } from './pages/LogInPage/LogInPage.tsx';
import { rootStore } from './store/rootStore.ts';
import { Provider } from 'react-redux';
import { withUnauthorizedRedirect } from './components/WithUnauthorizedRedirect/WithUnauthorizedRedirect.tsx';

const authMiddleware = async () => {
  if (!rootStore.getState().user.isAuthorized) {
    throw redirect('/user/login');
  }
};

const router = createBrowserRouter([
  {
    middleware: [authMiddleware],
    Component: withUnauthorizedRedirect(MainLayout),
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
        path: '/user/signin',
        Component: SignInPage,
      },
      { path: '/user/login', Component: LogInPage },
    ],
  },
]);

function App() {
  return (
    <>
      <Provider store={rootStore}>
        <NotificationProvider>
          <RouterProvider router={router} />
        </NotificationProvider>
      </Provider>
    </>
  );
}

export default App;
