import { Navigate, useRoutes } from 'react-router-dom';
// pages
import Home from './page/Home';
import LoginPage from './page/Login';
import Main from './page/Main';
import Dashboard from './page/dashboard/Dashboard';
import Profile from './page/Profile';
import Ranking from './page/Ranking';
import DetailView from './page/DetailView'; // 추가된 DetailView 컴포넌트
import Reference from './page/Reference';
import Temp from './page/temp';

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
      path: '/temp',
      element: <Temp />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      children: [
        { path: 'main', element: <Main /> },
        { path: 'detail', element: <DetailView /> },
        { path: 'profile', element: <Profile /> },
        { path: 'ranking', element: <Ranking /> },
        { path: 'teammatch', element: <div>Team Meeting Match Page</div> },
        { path: 'photo', element: <div>Photo Studio Page</div> },
        { path: 'library', element: <Reference /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/login" replace />,
    },
  ]);

  return routes;
}