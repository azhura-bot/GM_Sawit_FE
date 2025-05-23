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
        <div class="flex items-start gap-4">
          <img src="/warning-image.png" alt="Warning" class="w-10 h-10 mt-1" />
          <p class="font-bold text-green-900 text-lg">Edit Transaksi</p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm text-gray-600">Nama Petani</label>
            <input type="text" v-model="form.petani" disabled class="w-full border rounded-xl px-4 py-2 mt-1 bg-gray-100 text-black" />
          </div>
          <div>
            <label class="text-sm text-gray-600">Nama Pengepul</label>
            <input type="text" v-model="form.pengepul" disabled class="w-full border rounded-xl px-4 py-2 mt-1 bg-gray-100 text-black" />
          </div>
          <div>
            <label class="text-sm text-gray-600">Total Harga</label>
            <input type="number" v-model.number="form.harga" class="w-full border rounded-xl px-4 py-2 mt-1 text-black" />
            <p class="text-sm text-gray-500 mt-1">{{ formatRupiah(form.harga) }}</p>
          </div>
        </div>
        <div class="flex justify-center gap-4 mt-4">
          <button @click="showModal = false" class="bg-[#00A5E0] text-white font-semibold px-6 py-2 rounded-full text-sm">Batalkan</button>
          <button @click="simpanPerubahan" class="bg-[#3E8914] text-white font-semibold px-6 py-2 rounded-full text-sm">Simpan Perubahan</button>
        </div>
      </div>
    </div>

    <!-- Modal Delete -->
    <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div class="bg-white rounded-2xl shadow-xl w-[400px] p-8 flex flex-col items-center gap-6 animate-fade-in-scale">
        <img src="/warning-image.png" alt="Warning" class="w-16 h-16" />
        <h3 class="text-green-900 font-bold text-2xl">Hapus Transaksi?</h3>
        <p class="text-gray-800 text-center text-lg">Apakah Anda yakin ingin menghapus transaksi ini?</p>
        <div class="flex gap-4">
          <button @click="showDeleteModal = false" class="bg-[#00A5E0] text-white font-semibold px-6 py-2 rounded-full text-sm">Tidak</button>
          <button @click="hapusTransaksi" class="bg-[#3E8914] text-white font-semibold px-6 py-2 rounded-full text-sm">Ya</button>
        </div>
      </div>
    </div>

    <!-- Wrapper -->
    <div class="bg-[#E8FCCF] p-6 rounded-3xl shadow-md">
      <h2 class="font-bold text-green-800 text-xl mb-4 text-left">Data Transaksi</h2>
      <div class="overflow-x-auto rounded-[20px] overflow-hidden">
        <table class="w-full border-separate border-spacing-0 text-center">
          <thead class="bg-[#3E8914] text-white">
            <tr>
              <th class="py-3 px-4 border border-[#96E072]">Tanggal</th>
              <th class="py-3 px-4 border border-[#96E072]">Jam</th>
              <th class="py-3 px-4 border border-[#96E072]">Nama Tugas</th>
              <th class="py-3 px-4 border border-[#96E072]">Nama Petani</th>
              <th class="py-3 px-4 border border-[#96E072]">Nama Pengepul</th>
              <th class="py-3 px-4 border border-[#96E072]">Total Harga</th>
              <th class="py-3 px-4 border border-[#96E072]">Aksi</th>
            </tr>
          </thead>
          <tbody class="text-black">
            <tr v-for="(item, i) in transaksi" :key="item.id || i" class="bg-white hover:bg-lime-50">
              <td class="py-2 px-4 border border-[#96E072]">{{ item.tanggal }}</td>
              <td class="py-2 px-4 border border-[#96E072]">{{ item.jam }}</td>
              <td class="py-2 px-4 border border-[#96E072]">{{ item.nama_task }}</td>
              <td class="py-2 px-4 border border-[#96E072]">{{ item.petani_name }}</td>
              <td class="py-2 px-4 border border-[#96E072]">{{ item.pengepul_name }}</td>
              <td class="py-2 px-4 border border-[#96E072]">Rp {{ Number(item.total_harga).toLocaleString('id-ID', { maximumFractionDigits: 0 }) }}</td>
              <td class="py-2 px-4 border border-[#96E072]">
                <div class="flex flex-wrap justify-center gap-2">
                  <button class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-xs" @click="bukaModal(item)">Edit</button>
                  <button class="bg-pink-100 text-pink-700 px-3 py-1 rounded text-xs" @click="konfirmasiDelete(item)">Delete</button>
                </div>
              </td>
            </tr>
            <tr v-if="transaksi.length === 0">
              <td colspan="7" class="py-4">Belum ada transaksi.</td>
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
const token = localStorage.getItem('token')

const form = ref({
  id: null,
  harga: 0,
  petani: '',
  pengepul: ''
})

const transaksi = ref([])

function formatTanggal(dateStr) {
  if (!dateStr) return ''
  // Support format ISO atau "2025-05-21 11:11:00"
  // Ganti 'T' dengan spasi, hapus bagian setelah titik desimal jika ada
  let cleanStr = dateStr.replace('T', ' ').split('.')[0]
  const [tanggal] = cleanStr.split(' ') // ambil bagian tanggal
  const [year, month, day] = tanggal.split('-')
  return `${day}/${month}/${year}`
}

function formatJam(dateStr) {
  if (!dateStr) return ''
  let cleanStr = dateStr.replace('T', ' ').split('.')[0]
  const waktu = cleanStr.split(' ')[1]
  if (!waktu) return ''
  const [hh, mm] = waktu.split(':')
  return `${hh}:${mm} WIB`
}


function formatRupiah(angka) {
  if (!angka) return 'Rp 0';
  return 'Rp ' + Number(angka).toLocaleString('id-ID', { maximumFractionDigits: 0 });
}

async function getTransaksi() {
  try {
    const res = await axios.get('https://api.ecopalm.ydns.eu/api/transaksi', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (res.data.success && Array.isArray(res.data.data)) {
      transaksi.value = res.data.data.map(tx => ({
        id: tx.id,
        jumlah: tx.jumlah,
        total_harga: tx.total_harga,
        tanggal: formatTanggal(tx.task?.janji_temu?.tanggal),
        jam: formatJam(tx.task?.janji_temu?.tanggal),
        nama_task: tx.task?.nama_task || '-',
        petani_name: tx.task?.janji_temu?.nama_petani || '-',
        pengepul_name: tx.task?.pengepul?.name || '-',
        updated_at: tx.updated_at,
        task_id: tx.task_id
      }))
    } else {
      transaksi.value = []
    }
  } catch (e) {
    console.error('Error fetching transaksi:', e)
    transaksi.value = []
  }
}

onMounted(() => {
  getTransaksi()
})

function bukaModal(item) {
  form.value = {
    id: item.id,
    harga: item.total_harga,
    petani: item.petani_name,
    pengepul: item.pengepul_name,
    task_id: item.task_id
  }
  selectedItem.value = item
  showModal.value = true
}

async function simpanPerubahan() {
  try {
    await axios.put(
      `https://api.ecopalm.ydns.eu/api/transaksi/${form.value.id}`,
      { total_harga: form.value.harga },
      { headers: { Authorization: `Bearer ${token}` } }
    )
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
      `https://api.ecopalm.ydns.eu/api/transaksi/${selectedItem.value.id}`,
      { headers: { Authorization: `Bearer ${token}` } }
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
