import settingsRoutes from "./settings/settings.routes.ts";

export default [
    {
        path: '/admin-panel',
        component: () => import('../layouts/dashboard/index.vue'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('./home/Index.vue')
            },
        ...settingsRoutes,
        ]
    },
    {
        path: '', // Default route
        redirect: { name: 'home' }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../NotFound.vue'),
        meta: {
            layout: 'auth'
        }
    }
];
