<template>
  <div class="w-full">
  <!-- Hero Section -->
  <section class="hero min-h-screen relative" 
    :style="{ backgroundImage: `url('${heroBackground}')` }">
    
    <!-- Gradient overlay for better text readability -->
    <div class="absolute inset-0 bg-gradient-to-b from-green-950/70 to-green-900/50"></div>
    
    <!-- Hero content -->
    <div class="hero-content text-center text-neutral-content z-10 py-12">
      <div class="max-w-md md:max-w-2xl">
          
        
        <!-- Main Title with Animation -->
        <h1 class="text-10xl md:text-6xl font-bold mb-4 tracking-tight text-white">
          <span class="inline-block animate-fadeIn">Sawit</span>
        </h1>
        
        <!-- Subtitle with custom styling -->
        <p class="text-xl md:text-2xl mb-8 text-green-50 font-light">
          Sistem Analisis dan Informasi Wisata Tani untuk Pengelolaan Kelapa Sawit
        </p>
        
        
        <!-- Optional Stats Banner -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-16 p-4 bg-white/10 backdrop-blur-sm rounded-box">
          <div class="stat">
            <div class="stat-title text-green-100">Petani</div>
            <div class="stat-value text-2xl text-white">5,200+</div>
          </div>
          <div class="stat">
            <div class="stat-title text-green-100">Lahan</div>
            <div class="stat-value text-2xl text-white">12,500 Ha</div>
          </div>
          <div class="stat hidden md:block">
            <div class="stat-title text-green-100">Produktivitas</div>
            <div class="stat-value text-2xl text-white">+27%</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>

    <!-- Welcome Section -->
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
        <div data-aos="fade-right" class="w-full lg:w-1/2 relative">
          <div class="absolute -left-6 -top-6 w-24 h-24 border-2 border-green-400 opacity-30"></div>
          <div class="absolute -right-6 -bottom-6 w-24 h-24 border-2 border-green-400 opacity-30"></div>
          
          <div class="relative overflow-hidden rounded-xl shadow-2xl group">
            <div class="absolute inset-0 bg-gradient-to-r from-green-500/40 to-green-700/40 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"></div>
            
            <img 
              :src="imageUrl" 
              alt="Palm Oil Plantation" 
              class="w-full object-cover transform transition-transform duration-500 group-hover:scale-105 relative z-0"
            >
            
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-green-900/90 to-transparent z-20">
              <div class="font-bold text-lg mb-2">Kualitas Premium</div>
              <p class="text-sm">Kami hanya bekerja dengan petani terbaik untuk memastikan kualitas produk sawit yang optimal</p>
            </div>
          </div>
          
          <!-- Stats Card -->
          <div class="bg-white/10 backdrop-blur-sm p-4 rounded-lg absolute -bottom-8 -right-8 shadow-lg border border-white/20">
            <div class="flex items-center gap-3">
              <div class="bg-green-500 text-white h-14 w-14 rounded-lg flex items-center justify-center text-xl font-bold">10+</div>
              <div class="text-white">
                <div class="text-xs text-green-300">Tahun Pengalaman</div>
                <div class="font-semibold">Industri Kelapa Sawit</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Content side -->
        <div data-aos="fade-left" class="w-full lg:w-1/2">
          <div class="card bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl overflow-hidden">
            <div class="card-body">
              <h2 class="text-3xl font-bold text-white mb-2 flex items-center">
                <span class="text-green-400 mr-3"><i class="fas fa-leaf"></i></span> 
                Selamat Datang di Sawit
              </h2>
              
              <div class="w-16 h-1 bg-green-400 mb-6"></div>
              
              <p class="text-gray-100 mb-8 leading-relaxed">
                Kami adalah platform manajemen terpadu yang menghubungkan petani sawit, pengepul, dan manajer dalam satu ekosistem terintegrasi. Dengan pengalaman lebih dari 10 tahun, Sawit telah menjadi mitra terpercaya untuk semua pihak yang terlibat dalam rantai penghasilan hasil kelapa sawit.
              </p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="(feature, index) in features" :key="index" 
                    class="bg-white/10 hover:bg-white/15 p-4 rounded-lg flex items-center gap-4 transition-all duration-300 border border-white/5 hover:-translate-y-1 hover:shadow-lg">
                  <div class="bg-gradient-to-br from-green-400 to-green-600 rounded-lg p-3 text-white">
                    <i :class="feature.icon"></i>
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

    <!-- Layanan Kami Section -->
    <section class="py-16 bg-gray-100" id="layanan">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-green-800">Layanan Kami</h2>
          <p class="text-gray-600 mt-4 max-w-2xl mx-auto">
            Solusi terpadu untuk ekosistem industri kelapa sawit yang menghubungkan semua pihak dalam rantai nilai.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Layanan 1 -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
            <div class="p-6">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-center text-green-800 mb-2">Platform Terpadu</h3>
              <p class="text-gray-600 text-center text-sm">
                Platform terpadu untuk mengelola seluruh rantai nilai kelapa sawit dari petani hingga pengguna akhir.
              </p>
            </div>
          </div>

          <!-- Layanan 2 -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
            <div class="p-6">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-center text-green-800 mb-2">Pantau Tren Harga</h3>
              <p class="text-gray-600 text-center text-sm">
                Pantau tren harga dan dapatkan informasi pasar terbaru untuk keputusan bisnis yang lebih baik.
              </p>
            </div>
          </div>

          <!-- Layanan 3 -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
            <div class="p-6">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7l4-4m0 0l4 4m-4-4v18" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-center text-green-800 mb-2">Pengangkutan & Distribusi</h3>
              <p class="text-gray-600 text-center text-sm">
                Layanan pengangkutan dan distribusi untuk mempermudah pengiriman dari petani ke pasar.
              </p>
            </div>
          </div>

          <!-- Layanan 4 -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
            <div class="p-6">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-center text-green-800 mb-2">Pembayaran Cepat</h3>
              <p class="text-gray-600 text-center text-sm">
                Sistem pembayaran cepat dan aman dengan pencatatan yang terintegrasi ke Sawit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-gradient-to-br from-green-700 to-green-900 relative overflow-hidden">
    <!-- Background pattern dengan animasi -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0 pattern-bg"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,128,0,0.3),transparent_60%)]"></div>
    </div>
    
    <!-- Particle effect -->
    <div class="absolute inset-0 overflow-hidden">
      <div v-for="i in 20" :key="i" class="particle"></div>
    </div>
    
    <div class="container mx-auto px-4 relative z-10" id="tentang">
      <!-- Header dengan animasi -->
      <div data-aos="fade-down" class="text-center mb-12">
        <h2 class="text-5xl font-bold text-white mb-2 tracking-tight">Tentang Kami</h2>
        <p class="text-green-200 text-lg max-w-2xl mx-auto">Menghubungkan seluruh rantai nilai industri kelapa sawit Indonesia</p>
        <div class="flex justify-center mt-4">
          <div class="w-24 h-1 bg-green-400 rounded-full"></div>
        </div>
      </div>


      <!-- Main content cards dengan layout yang lebih menarik -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Visi & Misi Card - Lebih lebar -->
        <div data-aos="fade-right" class="lg:col-span-5 card bg-white bg-opacity-95 shadow-2xl overflow-hidden border-t-4 border-green-500 rounded-xl hover:shadow-green-500/20 hover:shadow-2xl transition-all duration-300">
          <div class="card-body text-black p-8">
            <!-- Visi Section dengan ikon yang lebih besar -->
            <div class="mb-8">
              <div class="flex items-center mb-6">
                <div class="w-14 h-14 rounded-lg bg-green-100 flex items-center justify-center mr-4">
                  <i class="fas fa-mountain text-2xl text-green-600"></i>
                </div>
                <h3 class="text-3xl font-bold text-green-700">Visi Kami</h3>
              </div>
              <p class="leading-relaxed text-gray-700 text-lg">
                Menjadi platform terdepan dalam menghubungkan seluruh pemangku kepentingan industri kelapa sawit untuk menciptakan ekosistem yang <span class="text-green-600 font-semibold">berkelanjutan</span>, <span class="text-green-600 font-semibold">transparan</span>, dan <span class="text-green-600 font-semibold">menguntungkan</span> bagi semua pihak.
              </p>
            </div>

            <!-- Divider with custom design -->
            <div class="flex items-center my-6">
              <div class="flex-grow h-0.5 bg-gradient-to-r from-transparent via-green-200 to-transparent"></div>
              <div class="mx-4 p-1 bg-green-100 rounded-full">
                <i class="fas fa-leaf text-green-500"></i>
              </div>
              <div class="flex-grow h-0.5 bg-gradient-to-r from-transparent via-green-200 to-transparent"></div>
            </div>

            <!-- Misi Section dengan styling yang lebih kaya -->
            <div>
              <div class="flex items-center mb-6">
                <div class="w-14 h-14 rounded-lg bg-green-100 flex items-center justify-center mr-4">
                  <i class="fas fa-tasks text-2xl text-green-600"></i>
                </div>
                <h3 class="text-3xl font-bold text-green-700">Misi Kami</h3>
              </div>
              
              <ul class="space-y-4">
                <li v-for="(mission, index) in missionItems" :key="index" 
                    class="flex items-start p-3 rounded-lg hover:bg-green-50 transition-colors duration-200">
                  <div class="mt-1 mr-4 text-green-500">
                    <i class="fas fa-check-circle text-xl"></i>
                  </div>
                  <p class="text-gray-700">{{ mission }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Middle separator for desktop - decorative element -->
        <div class="hidden lg:flex lg:col-span-2 items-center justify-center">
          <div class="h-full w-0.5 bg-gradient-to-b from-transparent via-green-300 to-transparent opacity-50"></div>
        </div>

        <!-- Right Column - Sejarah & Tim -->
        <div class="lg:col-span-5 space-y-8">
          <!-- Sejarah Card -->
          <div data-aos="fade-left" class="card bg-white bg-opacity-95 shadow-2xl overflow-hidden border-t-4 border-green-500 rounded-xl hover:shadow-green-500/20 hover:shadow-2xl transition-all duration-300">
            <div class="card-body text-black p-8">
              <div class="flex items-center mb-6">
                <div class="w-14 h-14 rounded-lg bg-green-100 flex items-center justify-center mr-4">
                  <i class="fas fa-history text-2xl text-green-600"></i>
                </div>
                <h3 class="text-3xl font-bold text-green-700">Sejarah Kami</h3>
              </div>
              
              <div class="space-y-8">
                <div v-for="(item, index) in historyItems" :key="index" 
                     class="flex group">
                  <div class="flex-shrink-0 mr-4">
                    <div class="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 border-2 border-green-500 text-green-700 font-bold text-xl group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                      {{ item.year }}
                    </div>
                  </div>
                  <div class="pt-2">
                    <div class="p-4 bg-green-50 rounded-lg border-l-4 border-green-500 group-hover:shadow-md transition-all duration-300">
                      <p class="leading-relaxed text-gray-700">{{ item.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Tim Card -->
          <div data-aos="fade-up" class="card bg-white bg-opacity-95 shadow-2xl overflow-hidden border-t-4 border-green-500 rounded-xl hover:shadow-green-500/20 hover:shadow-2xl transition-all duration-300">
            <div class="card-body text-black p-8">
              <div class="flex items-center mb-6">
                <div class="w-14 h-14 rounded-lg bg-green-100 flex items-center justify-center mr-4">
                  <i class="fas fa-users text-2xl text-green-600"></i>
                </div>
                <h3 class="text-3xl font-bold text-green-700">Tim Kami</h3>
              </div>
              
              <div class="flex flex-wrap justify-center gap-8">
                <div v-for="member in teamMembers" :key="member.id" 
                    class="text-center group">
                    <div class="avatar mb-4 online relative group">

                    </div>
                  <div class="font-bold text-lg text-gray-800">{{ member.name }}</div>
                  <div class="text-green-600 font-medium">{{ member.position }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Hubungi Kami Card -->
      <div data-aos="fade-up" class="card bg-white bg-opacity-95 shadow-2xl overflow-hidden border-t-4 border-green-500 rounded-xl hover:shadow-green-500/20 hover:shadow-2xl transition-all duration-300 mt-10">
        <div class="card-body text-black p-8">
          <div class="flex items-center mb-6">
            <div class="w-14 h-14 rounded-lg bg-green-100 flex items-center justify-center mr-4">
              <i class="fas fa-envelope text-2xl text-green-600"></i>
            </div>
            <h3 class="text-3xl font-bold text-green-700">Hubungi Kami</h3>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Address -->
            <div class="flex group hover:bg-green-50 p-4 rounded-lg transition-colors duration-300">
              <div class="flex-shrink-0 mr-4">
                <div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                  <i class="fas fa-map-marker-alt text-2xl"></i>
                </div>
              </div>
              <div>
                <h4 class="font-semibold text-green-700 mb-2 text-lg">Alamat</h4>
                <p class="text-gray-700">Jl. Kelapa Sawit No. 123</p>
                <p class="text-gray-700">Jakarta Selatan, 12180</p>
                <p class="text-gray-700">Indonesia</p>
              </div>
            </div>
            
            <!-- Contact Info -->
            <div class="flex group hover:bg-green-50 p-4 rounded-lg transition-colors duration-300" id="kontak"> 
              <div class="flex-shrink-0 mr-4">
                <div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                  <i class="fas fa-phone-alt text-2xl"></i>
                </div>
              </div>
              <div>
                <h4 class="font-semibold text-green-700 mb-2 text-lg">Kontak</h4>
                <p class="text-gray-700">Email: GMSawitII@gmail.com</p>
                <p class="text-gray-700">Telepon: 082364654019</p>
                <div class="flex gap-4 mt-4">
                </div>
              </div>
            </div>
            
            <!-- Consultation Button -->
            <div class="flex items-center justify-center md:justify-end">
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
  name: 'TentangKamiPage',
  data() {
    return {
      heroBackground: '/sawit.jpeg',
      imageUrl: '/brt.png',
      features: [
        {
          icon: 'fas fa-check-circle',
          title: 'Transaksi Transparan',
          description: 'Pantau setiap transaksi dengan jelas'
        },
        {
          icon: 'fas fa-coins',
          title: 'Harga Kompetitif',
          description: 'Dapatkan harga terbaik di pasaran'
        },
        {
          icon: 'fas fa-bolt',
          title: 'Pembayaran Cepat',
          description: 'Proses transaksi dalam 24 jam'
        },
        {
          icon: 'fas fa-clock',
          title: 'Layanan 24/7',
          description: 'Tim dukungan selalu siap membantu'
        }
      ],
      missionItems: [
        'Mendigitalkan proses petani kelapa sawit melalui teknologi digital',
        'Mendukung praktik pertanian berkelanjutan yang ramah lingkungan',
        'Meningkatkan kesejahteraan petani melalui akses pasar yang lebih baik',
        'Meningkatkan transparansi dalam setiap proses bisnis'
      ],
      historyItems: [
        {
          year: '2018',
          description: 'Didirikan dengan visi sederhana untuk menghubungkan petani sawit dengan pasar yang lebih baik.'
        },
        {
          year: '2023',
          description: 'Berkembang menjadi platform terpadu dengan jangkauan meliputi seluruh rantai nilai industri kelapa sawit di Indonesia.'
        }
      ],
      teamMembers: [
        {
          id: 1,
          name: 'Ahmad Susanto',
          position: 'CEO & Founder',
          initials: 'AS'
        },
        {
          id: 2,
          name: 'Dewi Rahayu',
          position: 'COO',
          initials: 'DR'
        }
      ]
    };
  }
}
</script>

<style scoped>
/* Any additional custom styles can go here */
</style>