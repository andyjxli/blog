import Layout from '@/components/layout';
// import RouteLayout from '@/components/route-layout';
import Home from '@/views/note';
import { RouteConfig } from 'react-router-config';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Layout,
    routes: [
      {
        path: '/',
        component: Home,
      },
    ],
  },
];

export default routes;
