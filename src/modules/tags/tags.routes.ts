
export default [
  {
    path: 'tags',
    name: 'tags',
    component: () => import('./Index.vue'),
    meta: {
      requireAuth: true
    },
  }
]
