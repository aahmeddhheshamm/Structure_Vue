
export default [
  {
    path: 'settings',
    name: 'settings',
    component: () => import('./Index.vue'),
    meta: {
      requireAuth: true
    },
  }
]
