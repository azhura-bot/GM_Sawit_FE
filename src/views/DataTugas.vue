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
            <tr v-for="(task, index) in tasks" :key="index" class="hover:bg-lime-50">
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
                    'bg-green-100 text-green-800': task.status === 'accepted',
                    'bg-red-100 text-red-800': task.status === 'rejected',
                    'bg-blue-900 text-white': task.status === 'in_progress' || task.status === 'completed'
                  }"
                >
                  {{
                    task.status === 'pending' ? 'Menungu' :
                    task.status === 'accepted' ? 'Diterima' :
                    task.status === 'rejected' ? 'Ditolak' :
                    task.status === 'in_progress' ? 'Sedang Berjalan' :
                    task.status === 'completed' ? 'Selesai' : task.status
                  }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap"> <!-- Action -->
                <button
                  class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  @click="openEditModal(task)"
                >
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Modal Edit -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 flex justify-center items-center z-50"
      style="background-color: rgba(0,0,0,0.5)"
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
          <button @click="closeEditModal" class="px-4 py-2 bg-gray-200 rounded text-black" :disabled="loading">Batal</button>
          <button @click="submitEdit" class="px-4 py-2 bg-green-500 text-white rounded" :disabled="loading || !selectedPengepul">Terima</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const tasks = ref([])
    const pengepuls = ref([])
    const showEditModal = ref(false)
    const editTask = ref({})
    const selectedPengepul = ref('')  // tambah ini
    const loading = ref(false)

    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://127.0.0.1:8000/api/task', {
          headers: { Authorization: `Bearer ${token}` }
        })
        tasks.value = response.data.data
      } catch (error) {
        console.error('Gagal fetch data task:', error)
      }
    }

    const fetchPengepuls = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://127.0.0.1:8000/api/pengepul', {
          headers: { Authorization: `Bearer ${token}` }
        })
        pengepuls.value = res.data.data
      } catch (err) {
        console.error('Gagal fetch pengepul:', err)
      }
    }

    const openEditModal = (task) => {
      editTask.value = { ...task }
      selectedPengepul.value = task.pengepul?.id || ''  // sinkron pilihan dropdown
      showEditModal.value = true
    }

    const closeEditModal = () => {
      showEditModal.value = false
      editTask.value = {}
      selectedPengepul.value = ''
      loading.value = false
    }

    const submitEdit = async () => {
      if (!selectedPengepul.value) return
      loading.value = true
      try {
        const token = localStorage.getItem('token')
        await axios.put(`http://127.0.0.1:8000/api/task/${editTask.value.id}`, {
          pengepul_id: selectedPengepul.value,
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })
        closeEditModal()
        await fetchTasks()
      } catch (error) {
        console.error('Gagal update task:', error)
      } finally {
        loading.value = false
      }
    }

    // Format tanggal
    const formatDate = (datetime) => {
      if (!datetime) return ''
      try {
        return new Date(datetime).toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      } catch {
        return ''
      }
    }

    // Format jam
    const formatTime = (datetime) => {
      if (!datetime) return ''
      const str = datetime.replace('T', ' ')
      const parts = str.split(' ')
      if (parts.length < 2) return ''
      const timePart = parts[1]
      const [hour, minute] = timePart.split(':')
      return `${hour.padStart(2,'0')}:${minute.padStart(2,'0')}`
    }

    onMounted(() => {
      fetchTasks()
      fetchPengepuls()
    })

    return {
      tasks,
      pengepuls,
      showEditModal,
      editTask,
      selectedPengepul,
      loading,
      openEditModal,
      closeEditModal,
      submitEdit,
      formatDate,
      formatTime,
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
