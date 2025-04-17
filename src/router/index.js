import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import DashboardView from "../views/DashboardView.vue";
import TugasView from "../views/TugasView.vue";
import DataPengepul from "../views/DataPengepulView.vue";
import TambahPengepul from "../views/TambahDataPengepulView.vue";

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
        {
            path: '/tambah-pengepul',
            name: 'TambahPengepul',
            component: TambahPengepul
        },
    ]
})

export default router