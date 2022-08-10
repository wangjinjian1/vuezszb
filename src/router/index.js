import {createRouter, createWebHashHistory} from "vue-router";

const router = createRouter({
    routes: [{
        path: '/', name: 'IndexOfQ', component: () => import('@/components/IndexOfQ.vue')
    }], history: createWebHashHistory()

})
export default router