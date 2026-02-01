// auth.routes.ts
export default [
  {
    path: '/auth',
    component: () => import('@/layouts/auth/Index.vue'),
    children: [
      {
        path: 'login',
        name: 'auth-login',
        component: () => import('./login/Index.vue'),
        meta: {
          title: 'Login',
          requiresUnAuth: true,
        }
      },
      {
        path: 'register',
        name: 'auth-register',
        component: () => import('./register/Index.vue'),
        meta: {
          title: 'Register',
          requiresUnAuth: true,
        }
      },
      {
        path: '', // Default route
        redirect: { name: 'auth-login' }
      }
    ]
  }
];