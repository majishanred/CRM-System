import { ToDoPage } from './pages/TodoPage/TodoPage.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ProfilePage } from './pages/ProfilePage/ProfilePage.tsx';
import { MainLayout } from './layouts/MainLayout/MainLayout.tsx';
import { NotificationProvider } from './contexts/notification/provider.tsx';

const router = createBrowserRouter([
  {
    Component: MainLayout,
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
]);

function App() {
  return (
    <>
      <NotificationProvider>
        <RouterProvider router={router} />
      </NotificationProvider>
    </>
  );
}

export default App;
