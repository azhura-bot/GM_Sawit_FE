<template>
  <div class="bg-lime-50 min-h-screen p-4 md:p-6">
    <div class="bg-white rounded-2xl shadow-md overflow-hidden max-w-6xl mx-auto">
      <div class="bg-lime-600 text-white text-lg md:text-xl font-semibold px-6 py-4">
        Data Tugas
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 text-sm">
          <thead class="bg-lime-100 text-lime-900 uppercase tracking-wide">
            <tr>
              <th class="px-6 py-3 text-left font-semibold whitespace-nowrap">ID</th>
              <th class="px-6 py-3 text-left font-semibold whitespace-nowrap">Tanggal</th>
              <th class="px-6 py-3 text-left font-semibold whitespace-nowrap">Jam</th>
              <th class="px-6 py-3 text-left font-semibold whitespace-normal">Lokasi</th>
              <th class="px-6 py-3 text-left font-semibold whitespace-nowrap">Nama Petani</th>
              <th class="px-6 py-3 text-left font-semibold whitespace-nowrap">Nama Pengepul</th>
              <th class="px-6 py-3 text-left font-semibold whitespace-nowrap">Status</th>
              <th class="px-6 py-3 text-left font-semibold whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 bg-white text-black">
            <tr
              v-for="(task, index) in paginatedTasks"
              :key="task.id"
              class="hover:bg-lime-50"
            >
              <td class="px-6 py-4 whitespace-nowrap break-words">{{ task.nama_task }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(task.janji_temu.tanggal) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ formatTime(task.janji_temu.tanggal) }}</td>
              <td class="px-6 py-4 whitespace-normal break-words">{{ task.janji_temu.alamat }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ task.janji_temu.nama_petani }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ task.pengepul.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-block px-2 py-1 rounded-full text-xs font-medium"
                  :class="{
                    'bg-blue-100 text-blue-800': task.status === 'pending',
                    'bg-yellow-100 text-yellow-800': task.status === 'in_progress',
                    'bg-green-100 text-green-800': task.status === 'accepted' || task.status === 'completed',
                    'bg-red-100 text-red-800': task.status === 'rejected'
                  }"
                >
                  {{
                    task.status === 'pending' ? 'Menunggu' :
                    task.status === 'in_progress' ? 'Sedang Berjalan' :
                    task.status === 'accepted' ? 'Diterima' :
                    task.status === 'completed' ? 'Selesai' :
                    task.status === 'rejected' ? 'Ditolak' :
                    task.status
                  }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button
                  v-if="['pending','in_progress'].includes(task.status)"
                  class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  @click="openEditModal(task)"
                >
                  Edit
                </button>
              </td>
            </tr>
            <tr v-if="!paginatedTasks.length">
              <td colspan="8" class="text-center text-gray-500 py-4">
                Tidak ada data tugas.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Controls -->
      <div class="flex justify-center items-center gap-2 p-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 bg-[#134611] border rounded text-white disabled:opacity-50"
        >
          Prev
        </button>
        <span class="text-gray-700">Halaman {{ currentPage }} / {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 bg-[#134611] border rounded text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Modal Edit -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-xl p-6 w-96 shadow-lg">
        <h3 class="text-lg font-semibold mb-2 text-gray-800">Pilih Pengepul</h3>
        <select
          v-model="selectedPengepul"
          class="w-full border border-gray-300 rounded p-2 mb-4 text-black"
        >
          <option disabled value="">-- Pilih pengepul --</option>
          <option v-for="pengepul in pengepuls" :key="pengepul.id" :value="pengepul.id">
            {{ pengepul.name }}
          </option>
        </select>
        <div class="flex justify-end gap-2">
          <button
            @click="closeEditModal"
            class="px-4 py-2 bg-gray-200 rounded text-black disabled:opacity-50"
            :disabled="loading"
          >
            Batal
          </button>
          <button
            @click="submitEdit"
            class="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
            :disabled="loading || !selectedPengepul"
          >
            Terima
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const tasks = ref([])
    const pengepuls = ref([])
    const showEditModal = ref(false)
    const editTask = ref(null)
    const selectedPengepul = ref('')
    const loading = ref(false)

    // Pagination state
    const currentPage = ref(1)
    const pageSize = ref(5)

    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('https://api.ecopalm.ydns.eu/api/task', {
          headers: { Authorization: `Bearer ${token}` }
        })
        tasks.value = res.data.data
      } catch (e) {
        console.error('Gagal fetch data task:', e)
      }
    }

    const fetchPengepuls = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('https://api.ecopalm.ydns.eu/api/pengepul', {
          headers: { Authorization: `Bearer ${token}` }
        })
        pengepuls.value = res.data.data
      } catch (e) {
        console.error('Gagal fetch pengepul:', e)
      }
    }

    // Computed untuk pagination
    const totalPages = computed(() => {
      return Math.max(1, Math.ceil(tasks.value.length / pageSize.value))
    })
    const paginatedTasks = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value
      return tasks.value.slice(start, start + pageSize.value)
    })

    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--
    }
    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++
    }

    const openEditModal = (task) => {
      editTask.value = task
      selectedPengepul.value = task.pengepul.id
      showEditModal.value = true
    }
    const closeEditModal = () => {
      showEditModal.value = false
      editTask.value = null
      selectedPengepul.value = ''
      loading.value = false
    }
    const submitEdit = async () => {
      if (!selectedPengepul.value) return
      loading.value = true
      try {
        const token = localStorage.getItem('token')
        await axios.put(
          `https://api.ecopalm.ydns.eu/api/task/${editTask.value.id}`,
          { pengepul_id: selectedPengepul.value },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        await fetchTasks()
        closeEditModal()
      } catch (e) {
        console.error('Gagal update task:', e)
      } finally {
        loading.value = false
      }
    }

    // Format tanggal & waktu
    const formatDate = (dt) => {
      if (!dt) return ''
      return new Date(dt).toLocaleDateString('id-ID', {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    }
    const formatTime = (dt) => {
      if (!dt) return ''
      const [_, time] = dt.split('T')
      return time ? time.slice(0,5) : ''
    }

    onMounted(() => {
      fetchTasks()
      fetchPengepuls()
    })

    return {
      tasks,
      pengepuls,
      showEditModal,
      selectedPengepul,
      loading,
      currentPage,
      totalPages,
      paginatedTasks,
      prevPage,
      nextPage,
      openEditModal,
      closeEditModal,
      submitEdit,
      formatDate,
      formatTime
    }
  }
}
</script>


<style scoped>
@media (max-width: 640px) {
  table {
    font-size: 0.875rem;
  }

  th,
  td {
    padding: 0.75rem 0.5rem;
    color: black;
  }

  button {
    padding: 0.25rem 0.75rem;
  }
}
</style>
