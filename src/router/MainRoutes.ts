const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: true,
  },
  redirect: '/main',
  component: () => import('@/views/FullLayout.vue'),
  children: [],
};

export default MainRoutes;
