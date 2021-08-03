import Layout from '@/components/layout';
import Article from '@/views/article';
import Blog from '@/views/blog';
// import RouteLayout from '@/components/route-layout';
import Home from '@/views/note';
import { RouteConfig } from 'react-router-config';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Layout,
    routes: [
      {
        path: '/blog/:uuid',
        component: Article,
      },
      {
        path: '/blog',
        component: Blog,
      },
      {
        path: '/tags/:tag',
        component: Blog,
      },
      {
        path: '/',
        component: Home,
      },
    ],
  },
];

export default routes;
