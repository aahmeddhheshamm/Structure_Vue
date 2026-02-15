import adminRoutes from "../modules/index.routes.ts"
import authRoutes from "../modules/auth/auth.routes.ts"
import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
    history: createWebHistory(),
    routes: [...adminRoutes, ...authRoutes],
    // scrollBehavior(to, from, savedPosition) {
    //     if (savedPosition) {
    //         return savedPosition;
    //     } else {
    //         return { left: 0, top: 0 };
    //     }
    // }
});


export default router;
