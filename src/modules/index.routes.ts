import productsRoutes from "./products/products.routes.ts";
import suppliersRoutes from "./suppliers/suppliers.routes.ts";

export default [
    {
        path: '/admin-panel',
        component: () => import('../layouts/dashboard/index.vue'),
        children: [
            {
                path: '',
                name: 'admin-panel',
                component: () => import('./home/Index.vue')
            },
        ...productsRoutes,
        ...suppliersRoutes,
        ]
    },
    {
        path: '', // Default route
        redirect: { name: 'admin-panel' }
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
