<template>
  <div class="w-full bg-white">
    <!-- Hero Section -->
    <div
    class="w-full h-96 sm:h-[40rem] bg-cover bg-center relative flex items-center"
    style="background-image: url('/sawit1.png')">

      <div class="relative z-10 pl-8 sm:pl-16 text-white space-y-2">
        <h1 class="text-2xl sm:text-4xl font-bold">Solusi Cerdas untuk</h1>
        <h1 class="text-2xl sm:text-4xl font-bold">Manajemen Transaksi</h1>
        <h1 class="text-2xl sm:text-4xl font-bold">Kelapa Sawit!</h1>
      </div>
    </div>

    <!-- tes 123 -->
    <!-- Main Content -->
    <div class="p-4 pt-20 space-y-10 w-full">
      
      <!-- Judul Kanan -->
      <div class="flex justify-end pr-6">
        <h1 class="text-2xl sm:text-4xl font-bold text-right" style="color: #134611;">
          Mudah, Cepat, dan <br /> Transparan
        </h1>
      </div>

      <!-- Summary Cards -->
      <div class="flex flex-col sm:flex-row justify-center items-center gap-8">
        <!-- Card 1 -->
        <div class="relative bg-[#3E8914] p-8 w-72 h-72 rounded-3xl shadow-md text-center">
          <div class="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-white rounded-full shadow-md overflow-hidden">
            <img src="@/assets/petani1.png" alt="Petani 1" class="object-cover w-full h-full" />
          </div>
          <h2 class="text-white font-bold mt-16 mb-6 text-xl">Jual hasil panen dengan harga terbaik dan tanpa perantara yang rumit.</h2>
        </div>

        <!-- Card 2 -->
        <div class="relative bg-[#3E8914] p-8 w-72 h-72 rounded-3xl shadow-md text-center">
          <div class="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-white rounded-full shadow-md overflow-hidden">
            <img src="@/assets/petani2.png" alt="Petani 2" class="object-cover w-full h-full" />
          </div>
          <h2 class="text-white font-bold mt-16 mb-6 text-xl">Kelola pembelian dari petani dengan sistem pencatatan yang sangat memudahkan.</h2>
        </div>

        <!-- Card 3 -->
        <div class="relative bg-[#3E8914] p-8 w-72 h-72 rounded-3xl shadow-md text-center">
          <div class="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-white rounded-full shadow-md overflow-hidden">
            <img src="@/assets/petani3.png" alt="Petani 3" class="object-cover w-full h-full" />
          </div>
          <h2 class="text-white font-bold mt-16 mb-6 text-xl">Pantau harga transaksi dan harga pasar dalam satu dashboard praktis.</h2>
        </div>
      </div>



      <!-- Kenapa Harus Pakai Sistem Kami -->
      <div class="flex justify-center pt-20">
        <h1 class="text-2xl sm:text-4xl font-bold text-center" style="color: #134611;">
          Kenapa harus Pakai <br /> Sistem Kami?
        </h1>
      </div>
    </div>

<!-- Section Background Sawit2 -->
<div
  class="w-full bg-cover bg-center flex items-center justify-center py-20"
  style="background-image: url('/sawit2.png')">

  <div class="flex justify-between w-full max-w-7xl mx-auto px-4 gap-4">

    <!-- Kolom kiri -->
    <div class="flex flex-col gap-12 w-full max-w-lg items-start">
      <!-- Kotak kiri atas + teks kanan -->
      <div class="flex items-center">
        <div class="flex-shrink-0 bg-[#E8FCCF] w-[240px] h-[200px] rounded-tr-2xl rounded-br-2xl shadow-lg -ml-8 flex items-center justify-start pl-4">
          <img src="@/assets/dollar.png" alt="Dollar" class="w-40 h-40 object-contain ml-6" />
        </div>
        <div class="ml-6 w-[240px] h-[200px] flex items-center justify-center px-4 rounded-2xl">
          <h2 class="text-white font-bold mt-16 mb-6 text-xl text-left">Pantau pergerakan harga kelapa sawit secara real-time.</h2>
        </div>
      </div>

      <!-- Kotak kiri bawah + teks kanan -->
      <div class="flex items-center">
        <div class="flex-shrink-0 bg-[#E8FCCF] w-[240px] h-[200px] rounded-tr-2xl rounded-br-2xl shadow-lg -ml-8 flex items-center justify-start pl-4">
          <img src="@/assets/dollar.png" alt="Dollar" class="w-40 h-40 object-contain ml-6" />
        </div>
        <div class="ml-6 w-[240px] h-[200px] flex items-center justify-center px-4 rounded-2xl">
          <h2 class="text-white font-bold mt-16 mb-6 text-xl text-left">Jual hasil panen dengan harga terbaik dan tanpa.</h2>
        </div>
      </div>
    </div>

    <!-- Spacer -->
    <div class="flex-grow"></div>

    <!-- Kolom kanan -->
    <div class="flex flex-col gap-12 w-full max-w-lg items-end">
      <!-- Kotak kanan atas + teks kiri -->
      <div class="flex items-center">
        <div class="w-[240px] h-[200px] flex items-center justify-center px-4 rounded-2xl mr-6">
          <h2 class="text-white font-bold mt-16 mb-6 text-xl text-right">Rekap data harian, mingguan, dan bulanan dalam satu klik.</h2>
        </div>
        <div class="flex-shrink-0 bg-[#E8FCCF] w-[240px] h-[200px] rounded-tl-2xl rounded-bl-2xl shadow-lg -mr-4 flex items-center justify-end pr-4">
          <img src="@/assets/catatan.png" alt="Catatan" class="w-36 h-36 object-contain mr-4" />
        </div>
      </div>

      <!-- Kotak kanan bawah + teks kiri -->
      <div class="flex items-center">
        <div class="w-[240px] h-[200px] flex items-center justify-center px-4 rounded-2xl mr-6">
          <h2 class="text-white font-bold mt-16 mb-6 text-xl text-right">Bisa digunakan kapan saja dan di mana saja.</h2>
        </div>
        <div class="flex-shrink-0 bg-[#E8FCCF] w-[240px] h-[200px] rounded-tl-2xl rounded-bl-2xl shadow-lg -mr-4 flex items-center justify-end pr-4">
          <img src="@/assets/jempol.png" alt="Jempol" class="w-36 h-36 object-contain mr-4" />
        </div>
      </div>
    </div>
  </div>
</div>










      </div>
</template>

<script setup>
// Tidak ada script interaktif untuk saat ini
</script>
