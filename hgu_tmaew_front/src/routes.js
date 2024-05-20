// routes.js
import { Navigate, useRoutes } from 'react-router-dom';
// pages
import Home from './page/Home';
import LoginPage from './page/Login';
import Main from './page/Main';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="/home" replace />,
      index: true,
    },
    {
      path: '/home',
      element: <Home />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/main',
      element: <Main />,
    },
    {
      path: '*',
      element: <Navigate to="/login" replace />,
    },
  ]);

  return routes;
}
