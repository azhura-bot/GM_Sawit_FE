import { createRouter, createWebHistory } from 'vue-router'

// Public
import Login from '@/views/LandingPage/Login.vue'
import Register from '@/views/LandingPage/Register.vue'

// Manager
import TugasView from '@/views/TugasView.vue'
import DataPengepul from '@/views/DataPengepulView.vue'
import TambahPengepul from '@/views/TambahDataPengepulView.vue'
import DataBeritaView from '@/views/DataBeritaView.vue'
import TambahBeritaView from '@/views/TambahBeritaView.vue'
import EditBeritaView from '@/views/EditBeritaView.vue'
import DataStatistikView from '@/views/DataStatistikView.vue'
import DataJadwalView from '@/views/DataJadwalView.vue'
import DataTransaksiView from '@/views/DataTransaksiView.vue'
import DataTugas from '@/views/DataTugas.vue'
import ProfileView from '@/views/ProfileView.vue'

// Pengepul
import HomePengepulView from '@/views/pengepul/HomePengepulView.vue'
import TugasUatamaView from '@/views/pengepul/TugasUtamaView.vue'
import DetailTugasView from '@/views/pengepul/DetailTugasView.vue'
import ArtikelPengepulView from '@/views/pengepul/ArtikelPengepulView.vue'
import DetailArtikelPengepulView from '@/views/pengepul/DetailArtikelPengepulView.vue'
import HargaPengepulView from '@/views/pengepul/HargaPengepulView.vue'
import LaporanPengepulView from '@/views/pengepul/LaporanPengepulView.vue'
import ProfilPengepulView from '@/views/pengepul/ProfilPengepulView.vue'
import EditProfilePengepulView from '@/views/pengepul/EditProfilePengepulView.vue'
import LandingPage2 from '@/views/LandingPage/LandingPage2.vue'
import DaftarHarga from '@/views/pengepul/HargaPengepulView.vue'

// Petani
import HomePetaniView from '@/views/petani/HomePetaniView.vue'
import RiwayatPetaniView from '@/views/petani/RiwayatPetaniView.vue'
import PengajuanJadwal from '@/views/petani/PengajuanJadwalView.vue'


const routes = [
  { path: '/', name: 'landingpage2', component: LandingPage2 },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },

  // Manager
  { path: '/dashboard', name: 'dashboard', component: TugasView, meta: { requiresAuth: true, role: 'manager' }},
  { path: '/data-pengepul', name: 'DataPengepul', component: DataPengepul, meta: { requiresAuth: true, role: 'manager' }},
  { path: '/tambah-pengepul', name: 'TambahPengepul', component: TambahPengepul, meta: { requiresAuth: true, role: 'manager' }},
  { path: '/data-berita', name: 'DataBerita', component: DataBeritaView, meta: { requiresAuth: true, role: 'manager' }},
  { path: '/tambah-berita', name: 'TambahBerita', component: TambahBeritaView, meta: { requiresAuth: true, role: 'manager' }},
  { path: '/edit-berita/:id', name: 'EditBerita', component: EditBeritaView, props: true, meta: { requiresAuth: true, role: 'manager' }},
  { path: '/data-statistik', name: 'DataStatistik', component: DataStatistikView, meta: { requiresAuth: true, role: 'manager' }},
  { path: '/data-jadwal', name: 'DataJadwal', component: DataJadwalView, meta: { requiresAuth: true, role: 'manager' }},
  { path: '/data-transaksi', name: 'DataTransaksi', component: DataTransaksiView, meta: { requiresAuth: true, role: 'manager' }},
  { path: '/data-tugas', name: 'DataTugas', component: DataTugas, meta: { requiresAuth: true, role: 'manager' }},
  { path: '/data-profile', name: 'ProfileView', component: ProfileView, meta: { requiresAuth: true, role: 'manager' }},

  // Pengepul
  { path: '/home-pengepul', name: 'HomePengepul', component: HomePengepulView, meta: { requiresAuth: true, role: 'pengepul' }},
  { path: '/tugas-utama-pengepul', name: 'TugasUtamaPengepul', component: TugasUatamaView, meta: { requiresAuth: true, role: 'pengepul' }},
  { path: '/detail-tugas-pengepul/:id', name: 'DetailTugasPengepul', component: DetailTugasView, meta: { requiresAuth: true, role: 'pengepul' }},
  { path: '/artikel', name: 'ArtikelPengepul', component: ArtikelPengepulView, meta: { requiresAuth: true, role: ['pengepul', 'petani'] }},
  { path: '/detail-artikel/:id', name: 'DetailArtikel', component: DetailArtikelPengepulView, props: true, meta: { requiresAuth: true, role: ['pengepul', 'petani'] }},
  { path: '/harga-pengepul', name: 'HargaPengepul', component: HargaPengepulView, meta: { requiresAuth: true, role: 'pengepul' }},
  { path: '/laporan-pengepul', name: 'LaporanPengepul', component: LaporanPengepulView, meta: { requiresAuth: true, role: 'pengepul' }},
  { path: '/profile', name: 'ProfilePengepul', component: ProfilPengepulView, meta: { requiresAuth: true, role: ['pengepul', 'petani'] }},
  { path: '/edit-profile', name: 'EditProfilePengepul', component: EditProfilePengepulView, meta: { requiresAuth: true, role: ['pengepul', 'petani'] }},
  { path: '/harga', name: 'DaftarHarga', component: DaftarHarga, meta: { requiresAuth: true, role: ['pengepul', 'petani'] }},

  // Petani
  { path: '/home-petani', name: 'HomePetani', component: HomePetaniView, meta: { requiresAuth: true, role: 'petani' }},
  { path: '/riwayat-petani', name: 'RiwayatPetani', component: RiwayatPetaniView, meta: { requiresAuth: true, role: 'petani' }},
  { path: '/pengajuan-jadwal', name: 'PengajuanJadwal', component: PengajuanJadwal, meta: { requiresAuth: true, role: 'petani' }},

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 🔐 Guard pakai localStorage
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  if (to.meta.requiresAuth && to.meta.role) {
    const allowedRoles = Array.isArray(to.meta.role)
      ? to.meta.role
      : [to.meta.role]

    if (!allowedRoles.includes(role)) {
      return next('/login')
    }
  }

  next()
})

export default router
