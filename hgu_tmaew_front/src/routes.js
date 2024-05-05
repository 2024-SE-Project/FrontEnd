// routes.js
import { Navigate, useRoutes } from 'react-router-dom';
// pages
import Home from './view/HomePage';
import LoginPage from './view/LoginPage';

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
      path: '*',
      element: <Navigate to="/login" replace />,
    },
  ]);

  return routes;
}
