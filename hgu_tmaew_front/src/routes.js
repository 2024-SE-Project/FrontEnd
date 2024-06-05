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
import RefDialog from './page/dialog/RefDialogTag';
import Temp from './page/temp';
import TeamMatching from './page/TeamMatching';
import PhotoStudio from './page/PhotoStudio';
import MyTeam from './page/MyTeam';

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
        { path: 'myteam', element: <MyTeam /> },
        { path: 'detail', element: <DetailView /> },
        { path: 'profile', element: <Profile /> },
        { path: 'ranking', element: <Ranking /> },
        { path: 'teammatch', element: <TeamMatching /> },
        { path: 'photo', element: <PhotoStudio /> },
        { path: 'library', element: <Reference /> },
        { path: 'library/create', element: <RefDialog /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/login" replace />,
    },
  ]);

  return routes;
}