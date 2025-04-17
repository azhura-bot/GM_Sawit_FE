<script setup>
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="drawer min-h-screen">
    <!-- Checkbox toggle untuk drawer -->
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />

    <!-- Konten utama -->
    <div class="drawer-content flex flex-col bg-white">
      <!-- Navbar -->
      <Navbar />

      <!-- Konten Form -->
      <div class="flex-1 p-10">
        <div class="bg-[#E8FCCF] p-10 rounded-2xl w-full max-w-4xl mx-auto">
          <h1 class="text-3xl font-bold mb-8 text-green-900">Tambahkan Data Pengepul</h1>

          <form class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Nama -->
            <div class="flex flex-col">
              <label for="nama" class="mb-2 text-green-900">Nama Pengepul</label>
              <input
                id="nama"
                type="text"
                class="input input-bordered rounded-full bg-white text-black placeholder-black"
                placeholder="Masukkan nama"
              />
            </div>

            <!-- Tanggal -->
            <div class="flex flex-col">
              <label for="tanggal" class="mb-2 text-green-900">Tanggal Perekrutan</label>
              <input
                id="tanggal"
                type="date"
                class="input input-bordered rounded-full bg-white text-black placeholder-black"
                style="color-scheme: light;"
              />
            </div>

            <!-- Email -->
            <div class="flex flex-col">
              <label for="email" class="mb-2 text-green-900">Email Pengepul</label>
              <input
                id="email"
                type="email"
                class="input input-bordered rounded-full bg-white text-black placeholder-black"
                placeholder="@gmail.com"
              />
            </div>

            <!-- Telepon -->
            <div class="flex flex-col">
              <label for="telepon" class="mb-2 text-green-900">Nomor Telepon</label>
              <input
                id="telepon"
                type="tel"
                class="input input-bordered rounded-full bg-white text-black placeholder-black"
                placeholder="08xxxxxxxxxx"
              />
            </div>

            <!-- Tombol -->
            <div class="col-span-2 mt-4">
              <button
                type="submit"
                class="btn px-10 rounded-full text-white"
                style="background-color: #3E8914;"
              >
                Tambahkan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Drawer sidebar yang akan ditampilkan ketika toggle aktif -->
    <div class="drawer-side z-50">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 w-64 min-h-full bg-white text-green-900">
        <li><a>Halaman Utama</a></li>
        <li><a>Tugas</a></li>
        <li class="bg-[#E8FCCF] rounded font-bold"><a>Data Pengepul</a></li>
        <li><a>Data Artikel</a></li>
        <li><a>Data Harga</a></li>
        <li><a>Permintaan Jadwal</a></li>
        <li><a>Data Transaksi</a></li>
      </ul>
    </div>
  </div>
</template>
