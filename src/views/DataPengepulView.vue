<template>
  <div class="m-4 mt-6 bg-white rounded-3xl p-6 shadow-md">
    <!-- Header dengan tombol pencarian dan tambah -->
    <div class="flex flex-col md:flex-row justify-between items-center mb-6">
      <!-- Search bar -->
      <div class="w-full md:w-1/2 bg-[#DDF7B1] rounded-full flex items-center px-4 py-2 text-green-900">
        <input
          type="text"
          placeholder="Search..."
          class="bg-transparent outline-none w-full"
        />
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-900" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
        </svg>
      </div>

      <!-- Tombol filter & tambah -->
      <div class="flex gap-3 mt-4 md:mt-0">
        <button class="bg-gray-200 text-green-900 px-4 py-2 rounded-full text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2H3V4zM3 8h18v10a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" />
          </svg>
          Filter
        </button>
        <router-link
          to="/tambah-pengepul"
          class="bg-[#DDF7B1] text-green-900 px-4 py-2 rounded-full text-sm"
        >
          + Tambah Pengepul
        </router-link>
      </div>
    </div>

    <!-- Judul -->
    <h2 class="font-bold text-green-800 text-xl mb-4 text-center">Data Pengepul</h2>

    <!-- Grid card pengepul -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="i in 8"
        :key="i"
        class="bg-white shadow-md p-4 rounded-2xl relative flex flex-col gap-2 text-center text-green-900"
      >
        <!-- Foto -->
        <div class="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2"></div>

        <!-- Info -->
        <p class="font-bold">Nama Pengepul</p>
        <p class="text-sm">Tanggal Perekrutan<br />10/02/2025</p>
        <p class="mt-2 text-sm">
          <strong>Email Pengepul</strong><br />
          Nomor Handphone
        </p>

        <!-- Tombol aksi -->
        <div class="absolute top-2 right-2 flex gap-2">
          <button class="text-orange-500 hover:text-orange-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 16H9v-2.828z" />
            </svg>
          </button>
          <button class="text-red-500 hover:text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0H7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
