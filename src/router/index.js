import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    routes: [{
        path: '/', name: 'IndexOfQ', component: () => import('@/components/IndexOfQ.vue')
    }], history: createWebHistory()

})
export default router