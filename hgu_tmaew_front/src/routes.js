// routes.js
import { Navigate, useRoutes } from 'react-router-dom';
// pages
import Home from './page/Home';
import LoginPage from './page/Login';
import Main from './page/Main';
import Dashboard from './page/dashboard/Dashboard';

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
      path: '/dashboard',
      element: <Dashboard />,
      children: [
        { path: 'main', element: <Main /> },
        { path: 'profile', element: <div>Profile Page</div> },
        { path: 'ranking', element: <div>Ranking Page</div> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/login" replace />,
    },
  ]);

  return routes;
}