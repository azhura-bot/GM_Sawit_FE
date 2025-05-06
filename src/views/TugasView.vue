<template>
    <div class="flex flex-col md:flex-row h-full min-h-screen bg-gray-50">
      
      <!-- Kiri: Konten (Statistik, Badge, List Tugas) -->
      <div class="flex-1 p-6 space-y-6">
        
        <!-- Statistik -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <!-- Task Total -->
          <div class="bg-lime-100 p-6 rounded-2xl shadow-md text-center">
            <h2 class="text-green-900 font-bold mb-4">Task Total</h2>
            <div class="text-5xl font-extrabold text-green-900">12</div>
          </div>
          <!-- Ongoing -->
          <div class="bg-green-300 p-6 rounded-2xl shadow-md text-center">
            <h2 class="text-green-900 font-bold mb-4">Ongoing Total</h2>
            <div class="text-5xl font-extrabold text-green-900">05</div>
          </div>
          <!-- Completed -->
          <div class="bg-green-700 p-6 rounded-2xl shadow-md text-center">
            <h2 class="text-white font-bold mb-4">Task Completed</h2>
            <div class="text-5xl font-extrabold text-white">03</div>
          </div>
        </div>
  
        <!-- Filter Badge -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="bg-pink-200 text-pink-900 px-4 py-2 rounded-full font-semibold text-center w-full">
            Task yang belum dikerjakan <span class="ml-2 bg-white px-2 py-1 rounded-full">3</span>
          </div>
          <div class="bg-lime-100 text-green-900 px-4 py-2 rounded-full font-semibold text-center w-full">
            Task yang sudah dikerjakan <span class="ml-2 bg-white px-2 py-1 rounded-full">3</span>
          </div>
          <div class="bg-blue-100 text-blue-900 px-4 py-2 rounded-full font-semibold text-center w-full">
            Task yang sedang dikerjakan <span class="ml-2 bg-white px-2 py-1 rounded-full">3</span>
          </div>
        </div>
  
        <!-- List Tugas -->
        <div class="space-y-4">
          <!-- Selesai -->
          <div class="bg-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h3 class="font-bold text-green-900">Nama Pengepul</h3>
              <div class="flex">
                <span class="font-semibold text-green-900 w-32">Nama Petani</span>
                <span class="text-gray-600">Deskripsi</span>
              </div>
            </div>
            <span class="mt-2 sm:mt-0 bg-lime-100 text-green-900 px-3 py-1 rounded-full font-medium">Sudah dikerjakan</span>
          </div>
  
          <!-- Belum dikerjakan -->
          <div class="bg-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h3 class="font-bold text-green-900">Nama Pengepul</h3>
              <div class="flex">
                <span class="font-semibold text-green-900 w-32">Nama Petani</span>
                <span class="text-gray-600">Deskripsi</span>
              </div>
            </div>
            <span class="mt-2 sm:mt-0 bg-pink-200 text-pink-900 px-3 py-1 rounded-full font-medium">belum dikerjakan</span>
          </div>
  
          <!-- Sedang dikerjakan -->
          <div class="bg-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h3 class="font-bold text-green-900">Nama Pengepul</h3>
              <div class="flex">
                <span class="font-semibold text-green-900 w-32">Nama Petani</span>
                <span class="text-gray-600">Deskripsi</span>
              </div>
            </div>
            <span class="mt-2 sm:mt-0 bg-blue-100 text-blue-900 px-3 py-1 rounded-full font-medium">Sedang dikerjakan</span>
          </div>
        </div>
      </div>
  
      <!-- Kanan: Google Map -->
      <div class="w-full md:w-1/3 p-4 sticky top-0 h-[100vh]">
        <div class="w-full h-full rounded-2xl overflow-hidden shadow-md">
          <iframe
            class="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31693.119965891137!2d106.79309672895196!3d-6.598568091240697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5bc2e1e1fbf%3A0x301576d14feb9b0!2sBogor%2C%20Kota%20Bogor%2C%20Jawa%20Barat!5e0!3m2!1sen!2sid!4v1682003457000!5m2!1sen!2sid"
            style="border:0;"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </template>
  