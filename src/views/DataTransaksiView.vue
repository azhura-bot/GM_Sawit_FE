<template>
  <div class="m-6 relative">
    <!-- Modal Edit -->
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50"
    >
      <div
        class="bg-white rounded-2xl shadow-xl w-[700px] p-8 flex flex-col gap-6 border border-gray-100 animate-fade-in-scale"
      >
        <!-- Header Modal -->
        <div class="flex items-start gap-4">
          <img src="/warning-image.png" alt="Warning" class="w-10 h-10 mt-1" />
          <p class="font-bold text-green-900 text-lg">
            Edit Transaksi
          </p>
        </div>

        <!-- Form Input -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm text-gray-600">Nama Petani</label>
            <input
              type="text"
              v-model="form.petani"
              disabled
              class="w-full border rounded-xl px-4 py-2 mt-1 bg-gray-100 text-black"
            />
          </div>
          <div>
            <label class="text-sm text-gray-600">Nama Pengepul</label>
            <input
              type="text"
              v-model="form.pengepul"
              disabled
              class="w-full border rounded-xl px-4 py-2 mt-1 bg-gray-100  text-black"
            />
          </div>
          <div>
            <label class="text-sm text-gray-600">Total Harga</label>
            <input
              type="number"
              v-model.number="form.harga"
              class="w-full border rounded-xl px-4 py-2 mt-1  text-black"
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
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50"
    >
      <div
        class="bg-white rounded-2xl shadow-xl w-[400px] p-8 flex flex-col items-center gap-6 animate-fade-in-scale"
      >
        <img src="/warning-image.png" alt="Warning" class="w-16 h-16" />
        <h3 class="text-green-900 font-bold text-2xl">Hapus Transaksi?</h3>
        <p class="text-gray-800 text-center text-lg">
          Apakah Anda yakin ingin menghapus transaksi ini?
        </p>
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
              <th class="py-3 px-4 border border-[#96E072]">Tanggal &amp; Jam</th>
              <th class="py-3 px-4 border border-[#96E072]">Nama Petani</th>
              <th class="py-3 px-4 border border-[#96E072]">Nama Pengepul</th>
              <th class="py-3 px-4 border border-[#96E072]">Total Harga</th>
              <th class="py-3 px-4 border border-[#96E072]">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item,i) in transaksi"
              :key="i"
              class="text-black bg-white hover:bg-lime-50"
            >
              <td class="py-2 px-4 border border-[#96E072]">{{ item.updated_at }}</td>
              <td class="py-2 px-4 border border-[#96E072]">{{ item.petani_name }}</td>
              <td class="py-2 px-4 border border-[#96E072]">{{ item.pengepul_name }}</td>
              <td class="py-2 px-4 border border-[#96E072]">Rp {{ item.total_harga }}</td>
              <td class="py-2 px-4 border border-[#96E072]">
                <div class="flex flex-wrap justify-center gap-2">
                  <button
                    class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-xs"
                    @click="bukaModal(item)"
                  >Edit</button>
                  <button
                    class="bg-pink-100 text-pink-700 px-3 py-1 rounded text-xs"
                    @click="konfirmasiDelete(item)"
                  >Delete</button>
                </div>
              </td>
            </tr>
            <tr v-if="transaksi.length===0">
              <td colspan="5" class="py-4">Belum ada transaksi.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const showModal = ref(false)
const showDeleteModal = ref(false)
const selectedItem = ref(null)

const form = ref({
  id: null,
  created_at: '',
  updated_at: '',
  petani_id: null,
  pengepul_id: null,
  petani_name: '',
  pengepul_name: '',
  total_harga: 0,
  tanggal: ''
})

const transaksi = ref([])

function formatDate(dateStr) {
  const d = new Date(dateStr)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth()+1).padStart(2, '0')
  const yyyy = d.getFullYear()
  const hh = String(d.getHours()).padStart(2,'0')
  const mi = String(d.getMinutes()).padStart(2,'0')
  return `${dd}/${mm}/${yyyy} ${hh}:${mi} WIB`
}

async function getTransaksi() {
  try {
    const res = await axios.get('http://127.0.0.1:8000/api/transaksi')
    // API returns { success, data: [ ... ], message }
    if (res.data.success && Array.isArray(res.data.data)) {
      transaksi.value = res.data.data.map(tx => ({
        ...tx,
        created_at: formatDate(tx.created_at),
        updated_at: formatDate(tx.updated_at),
        petani_name: tx.petani.name,
        pengepul_name: tx.pengepul.name
      }))
    }
  } catch (e) {
    console.error('Error fetching transaksi:', e)
  }
}

onMounted(getTransaksi)

function bukaModal(item) {
  form.value = {
    ...item,
    tanggal: item.updated_at,
    petani: item.petani_name,
    pengepul: item.pengepul_name,
    harga: item.total_harga
  }
  selectedItem.value = item
  showModal.value = true
}

async function simpanPerubahan() {
  try {
    const res = await axios.put(
      `http://127.0.0.1:8000/api/transaksi/${form.value.id}`,
      {
        petani_id: form.value.petani_id,
        pengepul_id: form.value.pengepul_id,
        total_harga: form.value.harga
      }
    )
    // Ambil timestamp terbaru dari response dan format ulang
    form.value.updated_at = formatDate(res.data.data.updated_at)
    showModal.value = false
    await getTransaksi() 
  } catch (e) {
    console.error('Error updating transaksi:', e)
  }
}

function konfirmasiDelete(item) {
  selectedItem.value = item
  showDeleteModal.value = true
}

async function hapusTransaksi() {
  try {
    await axios.delete(
      `http://127.0.0.1:8000/api/transaksi/${selectedItem.value.id}`
    )
    showDeleteModal.value = false
    await getTransaksi()
  } catch (e) {
    console.error('Error deleting transaksi:', e)
  }
}
</script>

<style scoped>
@keyframes fade-in-scale {
  from { opacity: 0; transform: scale(0.95) }
  to   { opacity: 1; transform: scale(1) }
}
.animate-fade-in-scale { animation: fade-in-scale 0.3s ease-out }
</style>
