
export default [
  {
    path: 'products',
    name: 'products',
    component: () => import('./Index.vue'),
    meta: {
      requireAuth: true
    },
  }
]
