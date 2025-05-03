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
import ArtikelPengepulView from "../views/Pengepul/ArtikelPengepulView.vue";
import DetailArtikelPengepulView from "../views/pengepul/DetailArtikelPengepulView.vue";
import HomePetaniView from "../views/Petani/HomePetaniView.vue";
import RiwayatPetaniView from "../views/Petani/RiwayatPetaniView.vue";
import HargaPengepulView from "../views/pengepul/HargaPengepulView.vue";
import LaporanPengepulView from "../views/pengepul/LaporanPengepulView.vue";
import ProfilPengepulView from "../views/pengepul/ProfilPengepulView.vue";
import EditProfilePengepulView from "../views/pengepul/EditProfilePengepulView.vue";
import LandingPage from "../views/LandingPage/LandingPage.vue";
import Login from "../views/LandingPage/Login.vue";
import Register from "../views/LandingPage/Register.vue";
import Landingpage2 from "../views/LandingPage/Landingpage2.vue";

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
            component: LandingPage
        },
        {
            path: '/landingpage2',  
            name: 'Landingpage2',  
            component: Landingpage2 
        },
        {
            path: "/login",
            name: 'login',
            component: Login
        },
        {
            path: "/register",
            name: 'register',
            component: Register
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
            path: '/edit-berita/:id',
            name: 'EditBerita',
            component: EditBeritaView,
            props: true,  
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
            path: '/artikel',
            name: 'ArtikelPengepul',
            component: ArtikelPengepulView
        },
        {
            path: '/detail-artikel-pengepul',
            name: 'DetailArtikelPengepul',
            component: DetailArtikelPengepulView
        },
        {
            path: '/harga-pengepul',
            name: 'HargaPengepul',
            component: HargaPengepulView
        },
        {
            path: '/laporan-pengepul',
            name: 'LaporanPengepul',
            component: LaporanPengepulView
        },
        {
            path: '/profile-pengepul',
            name: 'ProfilePengepul',
            component: ProfilPengepulView
        },
        {
            path: '/edit-profile-pengepul',
            name: 'EditProfilePengepul',
            component: EditProfilePengepulView
        },
        {
            path: '/home-petani',
            name: 'HomePetani',
            component: HomePetaniView
        },
        {
            path: '/riwayat-petani',
            name: 'RiwayatPetani',
            component: RiwayatPetaniView
        },
    ]
})

export default router