<template>
    <div class="m-6 relative">
      <!-- Modal Edit -->
      <div
        v-if="showModal"
        class="absolute inset-0 flex items-center justify-center z-50 transition-all duration-300"
      >
        <div
          class="bg-white rounded-2xl shadow-xl w-[700px] p-8 flex flex-col gap-6 border border-gray-100 animate-fade-in-scale"
        >
          <!-- Header Modal -->
          <div class="flex items-start gap-4">
            <img src="/warning-image.png" alt="Warning" class="w-10 h-10 mt-1" />
            <p class="font-bold text-green-900 text-lg">
              Apakah anda yakin melakukan perubahan pada data transaksi ini?
            </p>
          </div>
  
          <!-- Form Input -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm text-gray-600">Tanggal dan Jam</label>
              <input
                type="text"
                v-model="form.tanggal"
                class="w-full border rounded-xl px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div>
              <label class="text-sm text-gray-600">Nama Petani</label>
              <input
                type="text"
                v-model="form.petani"
                class="w-full border rounded-xl px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div>
              <label class="text-sm text-gray-600">Nama Pengepul</label>
              <input
                type="text"
                v-model="form.pengepul"
                class="w-full border rounded-xl px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div>
              <label class="text-sm text-gray-600">Total Harga</label>
              <input
                type="text"
                v-model="form.harga"
                class="w-full border rounded-xl px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
          </div>
  
          <!-- Tombol -->
          <div class="flex justify-center gap-4 mt-4">
            <button
              @click="showModal = false"
              class="bg-[#00A5E0] text-white font-semibold px-6 py-2 rounded-full text-sm"
            >
              Batalkan
            </button>
            <button
              @click="simpanPerubahan"
              class="bg-[#3E8914] text-white font-semibold px-6 py-2 rounded-full text-sm"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
  
      <!-- Modal Delete -->
      <div
        v-if="showDeleteModal"
        class="absolute inset-0 flex items-center justify-center z-50 transition-all duration-300"
      >
        <div
          class="bg-white rounded-2xl shadow-xl w-[700px] p-8 flex flex-col items-center gap-6 border border-gray-100 animate-fade-in-scale"
        >
          <img src="/warning-image.png" alt="Warning" class="w-16 h-16" />
          <h3 class="text-green-900 font-bold text-2xl">Apakah anda yakin?</h3>
          <p class="text-gray-800 text-center text-lg">Untuk menghapus data transaksi ini?</p>
          <div class="flex gap-4">
            <button
              @click="showDeleteModal = false"
              class="bg-[#00A5E0] text-white font-semibold px-6 py-2 rounded-full text-sm"
            >
              Tidak
            </button>
            <button
              @click="hapusTransaksi"
              class="bg-[#3E8914] text-white font-semibold px-6 py-2 rounded-full text-sm"
            >
              Ya
            </button>
          </div>
        </div>
      </div>
  
      <!-- Wrapper -->
      <div class="bg-[#E8FCCF] p-6 rounded-3xl shadow-md">
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
                    <button
                      class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-xs"
                      @click="bukaModal(item)"
                    >
                      Edit
                    </button>
                    <button
                      class="bg-pink-100 text-pink-700 px-3 py-1 rounded text-xs"
                      @click="konfirmasiDelete(item)"
                    >
                      Delete
                    </button>
                    <button class="bg-green-100 text-green-700 px-3 py-1 rounded text-xs">
                      Konfirmasi
                    </button>
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
  import { ref } from 'vue';
  
  const showModal = ref(false);
  const showDeleteModal = ref(false);
  const selectedItem = ref(null);
  
  const form = ref({
    tanggal: '20/02/2025 10:00 WIB',
    petani: '',
    pengepul: '',
    harga: 'Rp 200.000',
  });
  
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
  
  const bukaModal = (item) => {
    form.value.petani = item.petani;
    form.value.pengepul = item.pengepul;
    showModal.value = true;
  };
  
  const simpanPerubahan = () => {
    showModal.value = false;
  };
  
  const konfirmasiDelete = (item) => {
    selectedItem.value = item;
    showDeleteModal.value = true;
  };
  
  const hapusTransaksi = () => {
    transaksi.splice(transaksi.indexOf(selectedItem.value), 1);
    showDeleteModal.value = false;
  };
  </script>
  
  <style scoped>
  /* Transisi modal */
  @keyframes fade-in-scale {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  .animate-fade-in-scale {
    animation: fade-in-scale 0.3s ease-out;
  }
  
  body {
    overflow: auto;
  }
  </style>
  