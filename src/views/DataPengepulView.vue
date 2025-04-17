<template>
    <div class="drawer min-h-screen">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
  
      <!-- Konten utama -->
      <div class="drawer-content flex flex-col bg-[#F7FFF0]">
        <!-- Konten -->
        <div class="flex flex-col p-10">
          <!-- Header dengan tombol pencarian dan tambah -->
          <div class="flex flex-col md:flex-row justify-between items-center mb-6">
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
  
            <div class="flex gap-3 mt-4 md:mt-0">
              <button class="btn bg-gray-200 text-green-900 rounded-full normal-case">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2H3V4zM3 8h18v10a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" />
                </svg>
                Filter
              </button>
              <router-link to="/tambah-pengepul" class="btn bg-[#DDF7B1] text-green-900 rounded-full normal-case">
                + Tambah Pengepul
              </router-link>
            </div>
          </div>
  
          <!-- Judul -->
          <h1 class="text-4xl font-bold text-green-900 mb-6">Pengepul</h1>
  
          <!-- Grid card pengepul -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div
              v-for="i in 8"
              :key="i"
              class="bg-white shadow-md p-4 rounded-2xl relative flex flex-col gap-2"
            >
              <!-- Foto -->
              <div class="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
  
              <!-- Info -->
              <div class="text-center text-green-900">
                <p class="font-bold">Nama Pengepul</p>
                <p class="text-sm">Tanggal Perekrutan<br />10/02/2025</p>
                <p class="mt-2 text-sm">
                  <strong>Email Pengepul</strong><br />
                  Nomor Handphone
                </p>
              </div>
  
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
      </div>
  
      <!-- Sidebar drawer -->
      <div class="drawer-side z-50">
        <label for="my-drawer" class="drawer-overlay"></label>
        <ul class="menu p-4 w-64 min-h-full bg-white text-green-900">
          <li><router-link to="/dashboard">Halaman Utama</router-link></li>
          <li><router-link to="/tugas">Tugas</router-link></li>
          <li class="bg-[#E8FCCF] rounded font-bold">
            <router-link to="/data-pengepul">Data Pengepul</router-link>
          </li>
          <li><a>Data Artikel</a></li>
          <li><a>Data Harga</a></li>
          <li><a>Permintaan Jadwal</a></li>
          <li><a>Data Transaksi</a></li>
        </ul>
      </div>
    </div>
  </template>
  