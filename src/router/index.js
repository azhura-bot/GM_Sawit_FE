import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import DashboardView from "../views/DashboardView.vue";
import TugasView from "../views/TugasView.vue";
import DataPengepul from "../views/DataPengepulView.vue";
import TambahPengepul from "../views/TambahDataPengepulView.vue";
import DataBeritaView from "../views/DataBeritaView.vue";
import TambahBeritaView from "../views/TambahBeritaView.vue";
import EditBeritaView from "../views/EditBeritaView.vue";
import DataStatistikView from "../views/DataStatistikView.vue";
import DataJadwalView from "../views/DataJadwalView.vue";
import ProfileView from "../views/ProfileView.vue";
import DataTransaksiView from "../views/DataTransaksiView.vue";
import PengajuanJadwalView from "../views/Petani/PengajuanJadwalView.vue";
import HomePengepulView from "../views/pengepul/HomePengepulView.vue";
import TugasUatamaView from "../views/pengepul/TugasUatamaView.vue";
import DetailTugasView from "../views/pengepul/DetailTugasView.vue";
import ArtikelPengepulView from "../views/pengepul/ArtikelPengepulView.vue";
import DetailArtikelPengepulView from "../views/pengepul/DetailArtikelPengepulView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // {
        //     path: "/",
        //     name: 'main',
        //     component: MainView
        // },
        {
            path: "/",
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
        {
            path: '/data-berita',
            name: 'DataBerita',
            component: DataBeritaView
        },
        {
            path: '/tambah-berita',
            name: 'TambahBerita',
            component: TambahBeritaView
        },
        {
            path: '/edit-berita',
            name: 'EditBerita',
            component: EditBeritaView
        },
        {
            path: '/data-statistik',
            name: 'DataStatistik',
            component: DataStatistikView
        },
        {
            path: '/data-jadwal',
            name: 'DataJadwal',
            component: DataJadwalView
        },
        {
            path: '/profile',
            name: 'Profile',
            component: ProfileView
        },
        {
            path: '/data-transaksi',
            name: 'DataTransaksi',
            component: DataTransaksiView
        },
        {
            path: '/pengajuan-jadwal',
            name: 'PengajuanJadwal',
            component: PengajuanJadwalView
        },
        {
            path: '/home-pengepul',
            name: 'HomePengepul',
            component: HomePengepulView
        },
        {
            path: '/tugas-utama-pengepul',
            name: 'TugasUtamaPengepul',
            component: TugasUatamaView
        },
        {
            path: '/detail-tugas-pengepul',
            name: 'DetailTugasPengepul',
            component: DetailTugasView
        },
        {
            path: '/artikel-pengepul',
            name: 'ArtikelPengepul',
            component: ArtikelPengepulView
        },
        {
            path: '/detail-artikel-pengepul',
            name: 'DetailArtikelPengepul',
            component: DetailArtikelPengepulView
        },
    ]
})

export default router