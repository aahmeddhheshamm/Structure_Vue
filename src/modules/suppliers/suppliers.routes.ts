
export default [
  {
    path: 'suppliers',
    name: 'suppliers',
    component: () => import('./Index.vue'),
    meta: {
      requireAuth: true
    },
  }
]
