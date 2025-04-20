<template>
    <div class="m-4 mt-6 bg-white rounded-3xl p-6 shadow-md">
      <h2 class="font-bold text-green-800 text-xl mb-4">Data Transaksi</h2>
      <div class="overflow-x-auto">
        <table class="table-auto w-full text-left border border-green-100 rounded-xl overflow-hidden">
          <thead class="bg-lime-200 text-green-900">
            <tr>
              <th class="py-3 px-4">Tanggal & Jam</th>
              <th class="py-3 px-4">Nama Petani</th>
              <th class="py-3 px-4">Nama Pengepul</th>
              <th class="py-3 px-4">Total Harga</th>
              <th class="py-3 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in transaksi" :key="i" class="border-t hover:bg-lime-50 text-black">
              <td class="py-2 px-4">20/02/2025 10:00 WIB</td>
              <td class="py-2 px-4">{{ item.petani }}</td>
              <td class="py-2 px-4">{{ item.pengepul }}</td>
              <td class="py-2 px-4">Rp 200.000</td>
              <td class="py-2 px-4 flex gap-2 flex-wrap">
                <button class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-xs">Edit</button>
                <button class="bg-pink-100 text-pink-700 px-3 py-1 rounded text-xs">Delete</button>
                <button class="bg-green-100 text-green-700 px-3 py-1 rounded text-xs">Konfirmasi</button>
              </td>
            </tr>
          </tbody>
        </table>
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
  