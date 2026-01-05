import { ToDoPage } from './pages/TodoPage/TodoPage.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ProfilePage } from './pages/ProfilePage/ProfilePage.tsx';
import { MainLayout } from './layouts/MainLayout/MainLayout.tsx';

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
      <RouterProvider router={router} />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      />
    </>
  );
}

export default App;
