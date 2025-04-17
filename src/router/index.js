import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import DashboardView from "../views/DashboardView.vue";
import TugasView from "../views/TugasView.vue";
import DataPengepul from '../views/DataPengepulView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: 'main',
            component: MainView
        },
        {
            path: "/dashboard",
            name: 'dashboard',
            component: DashboardView
        },
        {
            path: "/tugas",
            name: 'tugas',
            component: TugasView
        },
        {
            path: '/data-pengepul',
            name: 'DataPengepul',
            component: DataPengepul
        },
    ]
})

export default router