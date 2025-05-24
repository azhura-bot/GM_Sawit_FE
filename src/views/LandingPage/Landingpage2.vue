<template>
  <div class="w-full">
    <!-- Hero Section -->
    <section class="hero min-h-screen relative flex items-center justify-center" 
           :style="{ backgroundImage: `url('${heroBackground}')`, backgroundSize: 'cover', backgroundPosition: 'center' }">
    
    <!-- Gradient overlay for better text readability -->
    <div class="absolute inset-0 bg-gradient-to-b from-green-950/70 to-green-900/50"></div>
    
    <!-- Hero content -->
    <div class="hero-content text-center z-10 py-12 w-full max-w-6xl mx-auto px-4">
      <div class="flex flex-col items-center justify-center">
        
        <!-- Main Title with Animation -->
        <h1 class="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-white">
          <span class="inline-block animate-fadeIn">Sawit</span>
        </h1>
        
        <!-- Subtitle with custom styling -->
        <p class="text-xl md:text-2xl mb-8 text-green-50 font-light text-center">
          Sistem Manajemen Transaksi Kelapa Sawit Terpadu
        </p>
        
        <p class="text-lg md:text-xl mb-12 text-green-100 max-w-3xl mx-auto text-center leading-relaxed">
          Platform digital yang menghubungkan petani, pengepul, dan manager dalam ekosistem transaksi kelapa sawit yang efisien dan transparan
        </p>
        
        <!-- Optional Stats Banner -->
        <div class="w-full max-w-4xl">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-16 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div class="stat text-center">
              <div class="stat-title text-green-100 text-sm mb-2">Petani Terdaftar</div>
              <div class="stat-value text-2xl md:text-3xl text-white font-bold">1,200+</div>
            </div>
            <div class="stat text-center">
              <div class="stat-title text-green-100 text-sm mb-2">Pengepul Aktif</div>
              <div class="stat-value text-2xl md:text-3xl text-white font-bold">85</div>
            </div>
            <div class="stat text-center col-span-2 md:col-span-1">
              <div class="stat-title text-green-100 text-sm mb-2">Transaksi/Bulan</div>
              <div class="stat-value text-2xl md:text-3xl text-white font-bold">500+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white opacity-70 hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>

    <!-- Fitur Utama Section -->
    <section class="py-20 bg-gradient-to-br from-green-800 to-green-900 relative overflow-hidden">
      <!-- Background pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E'); background-size: 100px 100px;"></div>
      </div>
      
      <!-- Animated shapes -->
      <div class="absolute top-20 left-10 w-20 h-20 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
      <div class="absolute top-40 right-10 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-10 left-1/2 w-28 h-28 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      
      <div class="container mx-auto px-4 relative z-10">
        <div class="flex flex-col lg:flex-row items-center gap-12">
        
          <!-- Image side with decorative elements -->
          <div class="w-full lg:w-1/2 relative">
            <div class="absolute -left-6 -top-6 w-24 h-24 border-2 border-green-400 opacity-30"></div>
            <div class="absolute -right-6 -bottom-6 w-24 h-24 border-2 border-green-400 opacity-30"></div>
            
            <div class="relative overflow-hidden rounded-xl shadow-2xl group">
              <div class="absolute inset-0 bg-gradient-to-r from-green-500/40 to-green-700/40 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"></div>
              
              <img 
                :src="imageUrl" 
                alt="Palm Oil Management System" 
                class="w-full h-80 object-cover transform transition-transform duration-500 group-hover:scale-105 relative z-0"
              >
              
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-green-900/90 to-transparent z-20">
                <div class="font-bold text-lg mb-2">Sistem Terintegrasi</div>
                <p class="text-sm">Platform yang menghubungkan semua pihak dalam rantai transaksi kelapa sawit</p>
              </div>
            </div>
            
            <!-- Stats Card -->
            <div class="bg-white/10 backdrop-blur-sm p-4 rounded-lg absolute -bottom-8 -right-8 shadow-lg border border-white/20">
              <div class="flex items-center gap-3">
                <div class="bg-green-500 text-white h-14 w-14 rounded-lg flex items-center justify-center text-xl font-bold">24/7</div>
                <div class="text-white">
                  <div class="text-xs text-green-300">Layanan Online</div>
                  <div class="font-semibold">Sistem Aktif</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Content side -->
          <div class="w-full lg:w-1/2">
            <div class="card bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl overflow-hidden">
              <div class="card-body">
                <h2 class="text-3xl font-bold text-white mb-2 flex items-center">
                  <span class="text-green-400 mr-3 text-3xl">🤝</span> 
                  Sistem Manajemen Transaksi
                </h2>
                
                <div class="w-16 h-1 bg-green-400 mb-6"></div>
                
                <p class="text-gray-100 mb-8 leading-relaxed">
                  Sawit adalah platform digital yang memfasilitasi transaksi antara petani dan pengepul kelapa sawit. Sistem kami menyediakan manajemen terpadu dengan fitur penjadwalan, tracking, pelaporan, dan monitoring real-time untuk semua pihak yang terlibat.
                </p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div v-for="(feature, index) in mainFeatures" :key="index" 
                      class="bg-white/10 hover:bg-white/15 p-4 rounded-lg flex items-center gap-4 transition-all duration-300 border border-white/5 hover:-translate-y-1 hover:shadow-lg">
                    <div class="bg-gradient-to-br from-green-400 to-green-600 rounded-lg p-3 text-white text-2xl">
                      {{ feature.icon }}
                    </div>
                    <div>
                      <h3 class="text-white font-medium">{{ feature.title }}</h3>
                      <p class="text-green-200 text-xs mt-1">{{ feature.description }}</p>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Role-based Features Section -->
    <section class="py-16 bg-gray-100" id="fitur">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-green-800">Fitur Berdasarkan Peran</h2>
          <p class="text-gray-600 mt-4 max-w-2xl mx-auto">
            Setiap pengguna memiliki akses fitur yang disesuaikan dengan perannya dalam ekosistem transaksi kelapa sawit.
          </p>
        </div>

        <!-- Role Tabs -->
        <div class="flex justify-center mb-8">
          <div class="bg-white rounded-lg p-1 shadow-lg">
            <button 
              v-for="(role, index) in roles" 
              :key="index"
              @click="activeRole = index"
              :class="[
                'px-6 py-3 rounded-md font-medium transition-all duration-300',
                activeRole === index 
                  ? 'bg-green-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-green-600'
              ]"
            >
              <span class="mr-2 text-xl">{{ role.icon }}</span>
              {{ role.name }}
            </button>
          </div>
        </div>

        <!-- Role Features -->
        <div class="max-w-6xl mx-auto">
          <div v-for="(role, roleIndex) in roles" :key="roleIndex" v-show="activeRole === roleIndex">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                v-for="(feature, featureIndex) in role.features" 
                :key="featureIndex"
                class="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105 card-hover"
              >
                <div class="p-6">
                  <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-2xl">{{ feature.icon }}</span>
                  </div>
                  <h3 class="text-xl font-semibold text-center text-green-800 mb-2">{{ feature.title }}</h3>
                  <p class="text-gray-600 text-center text-sm">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-16 relative bg-cover bg-center bg-fixed" style="background-image: url('gambarbg.JPEG');">
    <!-- Green Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-green-900/70 via-green-800/60 to-green-700/70"></div>
    
    <!-- Content -->
    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-white mb-4">Cara Kerja Sistem</h2>
        <p class="text-green-100 mt-4 max-w-2xl mx-auto text-lg">
          Proses transaksi yang sederhana dan efisien dari pengajuan hingga pembayaran.
        </p>
      </div>

      <div class="max-w-4xl mx-auto">
        <div class="relative">
          <!-- Connecting Line -->
          <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-white/30 hidden md:block"></div>
          
          <div v-for="(step, index) in workflowSteps" :key="index" class="relative mb-8 md:mb-12 workflow-step">
            <div :class="[
              'flex items-center gap-8',
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            ]">
              <!-- Step Icon & Number -->
              <div class="flex-shrink-0 relative z-10">
                <div class="w-20 h-20 bg-white text-green-700 rounded-full flex flex-col items-center justify-center font-bold shadow-xl border-4 border-green-200 hover:scale-110 transition-all duration-300">
                  <span class="emoji-small text-2xl mb-1">{{ step.icon }}</span>
                  <span class="text-sm">{{ index + 1 }}</span>
                </div>
              </div>
              
              <!-- Step Content -->
              <div class="flex-1">
                <div class="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-white/20 hover:bg-white hover:shadow-2xl transition-all duration-300">
                  <h3 class="text-xl font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <span class="emoji-small">{{ step.icon }}</span>
                    {{ step.title }}
                  </h3>
                  <p class="text-gray-700 leading-relaxed">{{ step.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

    <!-- About Section -->
    <section class="py-16 bg-gradient-to-br from-green-700 to-green-900 relative overflow-hidden" id="tentang">
      <!-- Background pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 pattern-bg"></div>
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,128,0,0.3),transparent_60%)]"></div>
      </div>
      
      <div class="container mx-auto px-4 relative z-10">
        <!-- Header -->
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-white mb-2 tracking-tight">Tentang Sawit</h2>
          <p class="text-green-200 text-lg max-w-2xl mx-auto">Digitalisasi transaksi kelapa sawit untuk masa depan yang lebih baik</p>
          <div class="flex justify-center mt-4">
            <div class="w-24 h-1 bg-green-400 rounded-full"></div>
          </div>
        </div>

        <!-- Main content cards -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <!-- Visi & Misi Card -->
        <div class="card bg-white bg-opacity-95 shadow-2xl overflow-hidden border-t-4 border-green-500 rounded-xl">
          <div class="card-body text-black p-8">
            <!-- Visi Section -->
            <div class="mb-8">
              <div class="flex items-center mb-6">
                <div class="w-14 h-14 rounded-lg bg-green-100 flex items-center justify-center mr-4">
                  <span class="text-3xl">👁️</span>
                </div>
                <h3 class="text-3xl font-bold text-green-700">Visi Kami</h3>
              </div>
              <p class="leading-relaxed text-gray-700 text-lg">
                Menjadi platform digital terdepan yang <span class="text-green-600 font-semibold">memfasilitasi transaksi</span> kelapa sawit dengan sistem yang <span class="text-green-600 font-semibold">transparan</span>, <span class="text-green-600 font-semibold">efisien</span>, dan <span class="text-green-600 font-semibold">menguntungkan</span> semua pihak.
              </p>
            </div>

            <!-- Divider -->
            <div class="flex items-center my-6">
              <div class="flex-grow h-0.5 bg-gradient-to-r from-transparent via-green-200 to-transparent"></div>
              <div class="mx-4 p-1 bg-green-100 rounded-full">
                <span class="text-green-500 text-xl">🌿</span>
              </div>
              <div class="flex-grow h-0.5 bg-gradient-to-r from-transparent via-green-200 to-transparent"></div>
            </div>

            <!-- Misi Section -->
            <div>
              <div class="flex items-center mb-6">
                <div class="w-14 h-14 rounded-lg bg-green-100 flex items-center justify-center mr-4">
                  <span class="text-3xl">📋</span>
                </div>
                <h3 class="text-3xl font-bold text-green-700">Misi Kami</h3>
              </div>
              
              <ul class="space-y-4">
                <li v-for="(mission, index) in missionItems" :key="index" 
                    class="flex items-start p-3 rounded-lg hover:bg-green-50 transition-colors duration-200">
                  <div class="mt-1 mr-4 text-green-500">
                    <span class="text-xl">✅</span>
                  </div>
                  <div class="flex items-start">
                    <span class="text-xl mr-3">{{ mission.icon }}</span>
                    <p class="text-gray-700">{{ mission.text }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Benefits Card -->
        <div class="card bg-white bg-opacity-95 shadow-2xl overflow-hidden border-t-4 border-green-500 rounded-xl">
          <div class="card-body text-black p-8">
            <div class="flex items-center mb-6">
              <div class="w-14 h-14 rounded-lg bg-green-100 flex items-center justify-center mr-4">
                <span class="text-3xl">⭐</span>
              </div>
              <h3 class="text-3xl font-bold text-green-700">Keunggulan Sistem</h3>
            </div>
            
            <div class="space-y-6">
              <div v-for="(benefit, index) in systemBenefits" :key="index" 
                  class="flex items-start group">
                <div class="flex-shrink-0 mr-4">
                  <div class="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 border-2 border-green-500 text-green-700 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                    <span class="text-xl">{{ benefit.icon }}</span>
                  </div>
                </div>
                <div class="pt-1">
                  <h4 class="font-semibold text-green-700 mb-1">{{ benefit.title }}</h4>
                  <p class="text-gray-600 text-sm leading-relaxed">{{ benefit.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        
        <!-- Contact Card -->
        <div class="card bg-white bg-opacity-95 shadow-2xl overflow-hidden border-t-4 border-green-500 rounded-xl">
          <div class="card-body text-black p-8">
            <div class="flex items-center mb-6">
              <div class="w-14 h-14 rounded-lg bg-green-100 flex items-center justify-center mr-4">
                <span class="text-3xl">✉️</span>
              </div>
              <h3 class="text-3xl font-bold text-green-700">Hubungi Kami</h3>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8" id="kontak">
              <!-- Address -->
              <div class="flex group hover:bg-green-50 p-4 rounded-lg transition-colors duration-300">
                <div class="flex-shrink-0 mr-4">
                  <div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                    <span class="text-2xl">📍</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-semibold text-green-700 mb-2 text-lg">Alamat</h4>
                  <p class="text-gray-700">Jl. Industri Sawit No. 456</p>
                  <p class="text-gray-700">Jakarta Timur, 13220</p>
                  <p class="text-gray-700">Indonesia</p>
                </div>
              </div>
              
              <!-- Contact Info -->
              <div class="flex group hover:bg-green-50 p-4 rounded-lg transition-colors duration-300">
                <div class="flex-shrink-0 mr-4">
                  <div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                    <span class="text-2xl">📞</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-semibold text-green-700 mb-2 text-lg">Kontak</h4>
                  <p class="text-gray-700">Email: GMSawitII@gamil.com</p>
                  <p class="text-gray-700">Telepon: 0823 6465 4019</p>
                  <p class="text-gray-700">WhatsApp: 0823 6465 4019</p>
                </div>
              </div>
              
              <!-- Support Hours -->
              <div class="flex group hover:bg-green-50 p-4 rounded-lg transition-colors duration-300">
                <div class="flex-shrink-0 mr-4">
                  <div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                    <span class="text-2xl">⏰</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-semibold text-green-700 mb-2 text-lg">Jam Layanan</h4>
                  <p class="text-gray-700">Senin - Jumat: 08:00 - 17:00</p>
                  <p class="text-gray-700">Sabtu: 08:00 - 12:00</p>
                  <p class="text-gray-700">Sistem Online: 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'SawitLandingPage',
  data() {
    return {
      heroBackground: '/sawit.jpeg',
      imageUrl: '/brt.png',
      activeRole: 0,
      mainFeatures: [
        {
          icon: '📅',
          iconFallback: 'fas fa-calendar-check',
          title: 'Penjadwalan Otomatis',
          description: 'Atur jadwal penjemputan dengan mudah'
        },
        {
          icon: '📍',
          iconFallback: 'fas fa-map-marked-alt',
          title: 'Tracking Real-time',
          description: 'Pantau posisi pengepul secara langsung'
        },
        {
          icon: '📊',
          iconFallback: 'fas fa-file-invoice-dollar',
          title: 'Laporan Transaksi',
          description: 'Dokumentasi lengkap setiap transaksi'
        },
        {
          icon: '📈',
          iconFallback: 'fas fa-chart-line',
          title: 'Data Harga Terkini',
          description: 'Update harga sawit secara real-time'
        }
      ],
      roles: [
        {
          name: 'Petani',
          icon: '🌱',
          iconFallback: 'fas fa-seedling',
          features: [
            {
              icon: '👤',
              iconFallback: 'fas fa-user-plus',
              title: 'Registrasi & Login',
              description: 'Daftar dan masuk ke sistem dengan mudah untuk mengakses semua fitur petani'
            },
            {
              icon: '📝',
              iconFallback: 'fas fa-calendar-plus',
              title: 'Pengajuan Jadwal',
              description: 'Ajukan jadwal penjemputan kelapa sawit dengan menentukan tanggal dan lokasi'
            },
            {
              icon: '💰',
              iconFallback: 'fas fa-chart-bar',
              title: 'Monitor Harga Sawit',
              description: 'Lihat data harga sawit terbaru untuk membantu pengambilan keputusan'
            },
            {
              icon: '📰',
              iconFallback: 'fas fa-newspaper',
              title: 'Artikel & Tips',
              description: 'Akses artikel dan tips terkait budidaya kelapa sawit dari para ahli'
            },
            {
              icon: '📜',
              iconFallback: 'fas fa-history',
              title: 'Riwayat Transaksi',
              description: 'Lihat riwayat transaksi dan status pengajuan jadwal yang telah dibuat'
            }
          ]
        },
        {
          name: 'Pengepul',
          icon: '🚛',
          iconFallback: 'fas fa-truck',
          features: [
            {
              icon: '📋',
              iconFallback: 'fas fa-tasks',
              title: 'Daftar Tugas',
              description: 'Lihat daftar tugas penjemputan yang telah diassign oleh manager'
            },
            {
              icon: '📄',
              iconFallback: 'fas fa-edit',
              title: 'Laporan Transaksi',
              description: 'Buat laporan detail untuk setiap transaksi yang telah dilakukan'
            },
            {
              icon: '🗺️',
              iconFallback: 'fas fa-map-pin',
              title: 'Update Lokasi',
              description: 'Update posisi real-time saat dalam perjalanan ke lokasi petani'
            },
            {
              icon: '💹',
              iconFallback: 'fas fa-chart-line',
              title: 'Info Harga Sawit',
              description: 'Akses informasi harga sawit terbaru untuk referensi transaksi'
            },
            {
              icon: '📖',
              iconFallback: 'fas fa-book-open',
              title: 'Artikel & Panduan',
              description: 'Baca panduan dan artikel untuk meningkatkan kualitas pelayanan'
            }
          ]
        },
        {
          name: 'Manager',
          icon: '👔',
          iconFallback: 'fas fa-user-tie',
          features: [
            {
              icon: '📊',
              iconFallback: 'fas fa-clipboard-list',
              title: 'Manajemen Jadwal',
              description: 'Kelola dan assign jadwal penjemputan ke pengepul yang tersedia'
            },
            {
              icon: '👥',
              iconFallback: 'fas fa-users-cog',
              title: 'Kelola Pengepul',
              description: 'Manajemen data pengepul, monitoring kinerja, dan assignment tugas'
            },
            {
              icon: '📊',
              iconFallback: 'fas fa-chart-pie',
              title: 'Dashboard Analytics',
              description: 'Lihat statistik lengkap operasional, transaksi, dan performa sistem'
            },
            {
              icon: '📈',
              iconFallback: 'fas fa-file-alt',
              title: 'Laporan Komprehensif',
              description: 'Generate laporan detail untuk analisis bisnis dan pengambilan keputusan'
            },
            {
              icon: '⚙️',
              iconFallback: 'fas fa-cog',
              title: 'Pengaturan Sistem',
              description: 'Konfigurasi sistem, harga, wilayah operasi, dan parameter lainnya'
            }
          ]
        }
      ],
      workflowSteps: [
        {
          icon: '📝',
          title: 'Pengajuan Jadwal',
          description: 'Petani mengajukan jadwal penjemputan kelapa sawit melalui aplikasi dengan menentukan tanggal, waktu, dan lokasi kebun.'
        },
        {
          icon: '✅',
          title: 'Verifikasi Manager',
          description: 'Manager memverifikasi pengajuan dan menentukan pengepul yang akan bertugas berdasarkan lokasi dan kapasitas.'
        },
        {
          icon: '📲',
          title: 'Assignment ke Pengepul',
          description: 'Sistem secara otomatis memberikan notifikasi tugas kepada pengepul yang telah ditentukan oleh manager.'
        },
        {
          icon: '🚛',
          title: 'Penjemputan Sawit',
          description: 'Pengepul melakukan penjemputan sesuai jadwal dengan tracking lokasi real-time untuk transparansi.'
        },
        {
          icon: '📊',
          title: 'Pelaporan Transaksi',
          description: 'Pengepul membuat laporan transaksi lengkap termasuk berat, kualitas, dan dokumentasi foto hasil penjemputan.'
        },
        {
          icon: '🎉',
          title: 'Konfirmasi Laporan Transaksi',
          description: 'Manager mengkonfirmasi laporan transaksi dengan petani sesuai dengan harga yang berlaku.'
        }
      ],
      missionItems: [
        {
          icon: '🎯',
          text: 'Menyediakan platform digital yang mudah digunakan untuk semua kalangan petani kelapa sawit'
        },
        {
          icon: '🔍',
          text: 'Meningkatkan transparansi dalam setiap tahap transaksi mulai dari pengajuan hingga pembayaran'  
        },
        {
          icon: '⚡',
          text: 'Mengoptimalkan efisiensi operasional dengan sistem penjadwalan dan tracking yang terintegrasi'
        },
        {
          icon: '💡',
          text: 'Memberikan akses informasi harga sawit terkini untuk membantu petani membuat keputusan terbaik'
        },
        {
          icon: '🌿',
          text: 'Menciptakan ekosistem digital yang berkelanjutan dan menguntungkan semua pihak yang terlibat'
        }
      ],
      systemBenefits: [
        {
          icon: '📱',
          iconFallback: 'fas fa-mobile-alt',
          title: 'Mudah Digunakan',
          description: 'Interface yang intuitif dan responsif dapat diakses melalui smartphone maupun komputer'
        },
        {
          icon: '🛡️',
          iconFallback: 'fas fa-shield-alt',
          title: 'Keamanan Data',
          description: 'Sistem keamanan berlapis untuk melindungi data pribadi dan transaksi pengguna'
        },
        {
          icon: '🔄',
          iconFallback: 'fas fa-sync-alt',
          title: 'Update Real-time',
          description: 'Informasi harga, status transaksi, dan lokasi pengepul ter-update secara real-time'
        },
        {
          icon: '🌐',
          iconFallback: 'fas fa-globe',
          title: 'Akses Global',
          description: 'Platform dapat diakses dari mana saja dengan koneksi internet yang stabil'
        },
        {
          icon: '📊',
          iconFallback: 'fas fa-chart-growth',
          title: 'Analisa Bisnis',
          description: 'Dashboard analytics untuk membantu pengambilan keputusan bisnis yang tepat'
        }
      ]
    }
  },
  mounted() {
    // Initialize all animations
    this.initAnimations();
    this.initSmoothScroll();
    this.initScrollAnimations();
    this.addCustomStyles();
  },
  beforeUnmount() {
    // Clean up event listeners
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    // Hero section animations and parallax
    initAnimations() {
      // Add staggered animation for stats
      const stats = document.querySelectorAll('.stat');
      stats.forEach((stat, index) => {
        stat.style.animationDelay = `${index * 0.2}s`;
        stat.classList.add('animate-fadeInUp');
      });

      // Add parallax effect on scroll
      window.addEventListener('scroll', this.handleScroll);
    },

    handleScroll() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      const heroSection = document.querySelector('.hero');
      if (heroSection) {
        heroSection.style.transform = `translateY(${rate}px)`;
      }
    },

    // Smooth scrolling for navigation
    initSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    },
    
    // Intersection Observer for fade-in animations
    initScrollAnimations() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
          }
        });
      }, observerOptions);
      
      // Observe all cards and sections
      document.querySelectorAll('.card, .stat, section').forEach(el => {
        observer.observe(el);
      });
    },
    
    // Add comprehensive custom styles
    addCustomStyles() {
      const style = document.createElement('style');
      style.textContent = `
        /* Hero Section Styles */
        .hero {
          background-attachment: fixed;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          transition: transform 0.1s ease-out;
        }

        .hero-content {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }

        .stat {
          opacity: 0;
          transform: translateY(20px);
        }

        /* Enhanced backdrop blur for better readability */
        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        /* Smooth hover effects */
        .stat:hover {
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }

        /* Animation Keyframes */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse3d {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes bounce3d {
          0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
          40%, 43% { transform: translate3d(0,-5px,0); }
          70% { transform: translate3d(0,-3px,0); }
          90% { transform: translate3d(0,-1px,0); }
        }
        
        /* Animation Classes */
        .animate-fadeIn {
          animation: fadeIn 1.5s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse3d {
          animation: pulse3d 2s ease-in-out infinite;
        }
        
        .animate-bounce3d {
          animation: bounce3d 2s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        /* Card Hover Effects */
        .card-hover {
          transition: all 0.3s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        .pattern-bg {
          background-image: radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2px, transparent 2px);
          background-size: 50px 50px;
        }
        
        /* 3D Icon Styles */
        .icon-3d {
          font-size: 2.5rem;
          text-shadow: 
            0 1px 0 #ccc,
            0 2px 0 #c9c9c9,
            0 3px 0 #bbb,
            0 4px 0 #b9b9b9,
            0 5px 0 #aaa,
            0 6px 1px rgba(0,0,0,.1),
            0 0 5px rgba(0,0,0,.1),
            0 1px 3px rgba(0,0,0,.3),
            0 3px 5px rgba(0,0,0,.2),
            0 5px 10px rgba(0,0,0,.25);
          transition: all 0.3s ease;
        }
        
        .icon-3d:hover {
          transform: translateY(-2px) scale(1.1);
          text-shadow: 
            0 2px 0 #ccc,
            0 4px 0 #c9c9c9,
            0 6px 0 #bbb,
            0 8px 0 #b9b9b9,
            0 10px 0 #aaa,
            0 12px 2px rgba(0,0,0,.1),
            0 0 10px rgba(0,0,0,.1),
            0 2px 6px rgba(0,0,0,.3),
            0 6px 10px rgba(0,0,0,.2),
            0 10px 20px rgba(0,0,0,.25);
        }
        
        .emoji-icon {
          font-size: 2.5rem;
          display: inline-block;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
          transition: all 0.3s ease;
        }
        
        .emoji-icon:hover {
          transform: translateY(-2px) scale(1.1);
          filter: drop-shadow(0 8px 16px rgba(0,0,0,0.3));
        }
        
        .emoji-small {
          font-size: 1.5rem;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
          transition: all 0.3s ease;
        }
        
        .emoji-small:hover {
          transform: scale(1.2);
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
        }
        
        /* Smooth transitions for role switching */
        .role-transition {
          transition: all 0.3s ease;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #22c55e;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #16a34a;
        }
        
        /* Interactive hover effects for 3D icons */
        .feature-card:hover .emoji-icon {
          animation: bounce3d 0.6s ease-in-out;
        }
        
        .role-card:hover .emoji-icon {
          animation: pulse3d 1s ease-in-out;
        }
        
        .workflow-step:hover .emoji-small {
          animation: float 2s ease-in-out infinite;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .hero-content {
            padding: 2rem 1rem;
          }
          
          .stat-value {
            font-size: 1.5rem;
          }
          
          .emoji-icon {
            font-size: 2rem;
          }
          
          .icon-3d {
            font-size: 2rem;
          }
        }
      `;
      document.head.appendChild(style);
    },
    
    // Method to handle role switching with smooth transition
    switchRole(index) {
      this.activeRole = index;
      
      // Add smooth transition effect
      const roleContent = document.querySelector('.role-content');
      if (roleContent) {
        roleContent.classList.add('role-transition');
      }
    },
    
    // Method to scroll to specific section
    scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }
}
</script>