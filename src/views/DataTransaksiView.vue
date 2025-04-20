<template>
    <div class="m-6">
      <!-- Wrapper latar belakang hijau muda -->
      <div class="bg-[#E8FCCF] p-6 rounded-3xl shadow-md">
        <!-- Judul tetap rata kiri -->
        <h2 class="font-bold text-green-800 text-xl mb-4 text-left">Data Transaksi</h2>
  
        <!-- Tabel -->
        <div class="overflow-x-auto rounded-[20px] overflow-hidden">
          <table class="w-full border-separate border-spacing-0 text-center">
            <thead class="bg-[#3E8914] text-white">
              <tr>
                <th class="py-3 px-4 border border-[#96E072]">Tanggal & Jam</th>
                <th class="py-3 px-4 border border-[#96E072]">Nama Petani</th>
                <th class="py-3 px-4 border border-[#96E072]">Nama Pengepul</th>
                <th class="py-3 px-4 border border-[#96E072]">Total Harga</th>
                <th class="py-3 px-4 border border-[#96E072]">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in transaksi"
                :key="i"
                class="text-black bg-white hover:bg-lime-50"
              >
                <td class="py-2 px-4 border border-[#96E072]">20/02/2025 10:00 WIB</td>
                <td class="py-2 px-4 border border-[#96E072]">{{ item.petani }}</td>
                <td class="py-2 px-4 border border-[#96E072]">{{ item.pengepul }}</td>
                <td class="py-2 px-4 border border-[#96E072]">Rp 200.000</td>
                <td class="py-2 px-4 border border-[#96E072]">
                  <div class="flex flex-wrap justify-center gap-2">
                    <button class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-xs">Edit</button>
                    <button class="bg-pink-100 text-pink-700 px-3 py-1 rounded text-xs">Delete</button>
                    <button class="bg-green-100 text-green-700 px-3 py-1 rounded text-xs">Konfirmasi</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const transaksi = [
    { petani: 'Rizky Pratama', pengepul: 'Andi Pratama' },
    { petani: 'Andi Saputra', pengepul: 'Budi Santoso' },
    { petani: 'Fajar Hidayat', pengepul: 'Dedi Kurniawan' },
    { petani: 'Bayu Ramadhan', pengepul: 'Rizal Hidayat' },
    { petani: 'Dimas Nugroho', pengepul: 'Tono Saputra' },
    { petani: 'Agus Setiawan', pengepul: 'Joko Susilo' },
    { petani: 'Dimas Nugroho', pengepul: 'Fajar Nugroho' },
    { petani: 'Agus Setiawan', pengepul: 'Rian Firmansyah' },
    { petani: 'Dimas Nugroho', pengepul: 'Adi Wijaya' },
    { petani: 'Agus Setiawan', pengepul: 'Yoga Prasetyo' },
  ];
  </script>
  