import { createBrowserRouter, RouteObject } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import MainCalendar from '../components/calendar/MainCalendar';

const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <MainCalendar />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
