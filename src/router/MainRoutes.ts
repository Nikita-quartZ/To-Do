const MainRoutes = {
  path: '',
  meta: {
    requiresAuth: true,
  },
  redirect: '',
  component: () => import('@/views/FullLayout.vue'),
  children: [],
};

export default MainRoutes;
