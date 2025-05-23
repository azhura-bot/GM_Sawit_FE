<template>
  <div class="main-container">
    <header class="header flex items-center p-4 bg-white shadow">
      <router-link to="/profile" class="inline-block mr-3">
        <img
          v-if="user.photo"
          :src="user.photo"
          alt="Foto Profil"
          class="circle"
          @error="onPhotoError"
        />
        <div v-else class="circle placeholder"></div>
      </router-link>
      <span class="username font-semibold text-white-800">
        {{ user.name || 'nama User' }}
      </span>
    </header>

    <main class="content">
      <section class="task-section">
        <div class="title-with-icon">
          <img src="@/assets/icon-tugas-trans.png" alt="Tugas Icon" class="icon" />
          <h2>Tugas</h2>
        </div>

        <!-- Tugas Baru (pending) -->
        <div v-if="pendingTasks.length" class="task-category">
          <h3 class="category-title">Tugas yang baru saja masuk</h3>
          <router-link
            v-for="task in pendingTasks"
            :key="`pending-${task.id}`"
            :to="`/detail-tugas-pengepul/${task.id}`"
            class="task-card-link"
          >
            <div class="task-card">
              <div class="task-info">
                <div>
                  <p class="label">ID Tugas</p>
                  <p class="value">{{ task.nama_task }}</p>
                </div>
                <div class="jam">
                  <p class="label">Jam</p>
                  <p class="value">{{ formatTime(task.janji_temu.tanggal) }}</p>
                </div>
              </div>
              <div class="lokasi">
                <p class="label">Lokasi</p>
                <p class="value">{{ task.janji_temu.alamat }}</p>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Tugas Sedang Berjalan (in_progress) -->
        <div v-if="inProgressTasks.length" class="task-category">
          <h3 class="category-title">Tugas yang sedang berjalan</h3>
          <router-link
            v-for="task in inProgressTasks"
            :key="`progress-${task.id}`"
            :to="`/detail-tugas-pengepul/${task.id}`"
            class="task-card-link"
          >
            <div class="task-card">
              <div class="task-info">
                <div>
                  <p class="label">ID Tugas</p>
                  <p class="value">{{ task.nama_task }}</p>
                </div>
                <div class="jam">
                  <p class="label">Jam</p>
                  <p class="value">{{ formatTime(task.janji_temu.tanggal) }}</p>
                </div>
              </div>
              <div class="lokasi">
                <p class="label">Lokasi</p>
                <p class="value">{{ task.janji_temu.alamat }}</p>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Tugas Selesai (completed) -->
        <div v-if="completedTasks.length" class="task-category">
          <h3 class="category-title">Tugas yang sudah diselesaikan</h3>
          <router-link
            v-for="task in completedTasks"
            :key="`completed-${task.id}`"
            :to="`/detail-tugas-pengepul/${task.id}`"
            class="task-card-link"
          >
            <div class="task-card">
              <div class="task-info">
                <div>
                  <p class="label">ID Tugas</p>
                  <p class="value">{{ task.nama_task }}</p>
                </div>
                <div class="jam">
                  <p class="label">Jam</p>
                  <p class="value">{{ formatTime(task.janji_temu.tanggal) }}</p>
                </div>
              </div>
              <div class="lokasi">
                <p class="label">Lokasi</p>
                <p class="value">{{ task.janji_temu.alamat }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import defaultPhoto from '@/assets/profile.png'

const API_URL = import.meta.env.VITE_API_URL || 'https://api.ecopalm.ydns.eu'

export default {
  setup() {
    const user = ref({ name: '', photo: '' })
    const pendingTasks = ref([])
    const inProgressTasks = ref([])
    const completedTasks = ref([])

    const fetchUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) return
      try {
        const res = await axios.get(`${API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const fetched = res.data.data
        user.value.name = fetched.name
        user.value.photo = fetched.photo_url
          ? fetched.photo_url
          : ''
      } catch (err) {
        console.error('Gagal mengambil user:', err)
      }
    }

    const fetchTasks = async () => {
      const token = localStorage.getItem('token')
      if (!token) return alert('Silakan login terlebih dahulu.')

      try {
        const res = await axios.get('https://api.ecopalm.ydns.eu/api/task/by-pengepul', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const tasks = res.data.data || res.data

        pendingTasks.value = tasks.filter(t => t.status === 'pending')
        inProgressTasks.value = tasks.filter(t => t.status === 'in_progress')
        completedTasks.value = tasks.filter(t => t.status === 'completed')
      } catch (err) {
        console.error('Gagal mengambil data tugas:', err)
        alert('Terjadi kesalahan saat mengambil tugas.')
      }
    }

    const formatTime = (datetime) => {
      if (!datetime) return ''
      try {
        const time = datetime.includes('T') ? datetime.split('T')[1] : datetime.split(' ')[1]
        const [h, m] = time.split(':')
        return `${h.padStart(2, '0')}:${m.padStart(2, '0')}`
      } catch (e) {
        return ''
      }
    }

    const onPhotoError = () => {
      user.value.photo = defaultPhoto
    }

    onMounted(() => {
      fetchUser()
      fetchTasks()
    })

    return {
      user,
      pendingTasks,
      inProgressTasks,
      completedTasks,
      formatTime
    }
  }
}
</script>

<style scoped>
  .main-container {
    background-color: #e6f7cf;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .header {
    background-color: #164b1b;
    width: 100%;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    position: sticky;
    top: 0;
    z-index: 10;
  }
  
  .circle {
    width: 24px;
    height: 24px;
    background-color: white;
    border-radius: 50%;
    margin-right: 8px;
  }
  
  .username {
    font-weight: bold;
  }
  
  .content {
    background: white;
    margin-top: 12px;
    width: 100%;
    max-width: 430px;
    border-radius: 16px 16px 0 0;
    padding: 16px;
  }
  
  .task-section {
    display: flex;
    flex-direction: column;
  }
  
  .title-with-icon {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: bold;
    font-size: 24px; /* Ukuran lebih besar */
    color: #134611;
  }
  
  .title-with-icon .icon {
    width: 40px;
    height: 32px;
  }
  
  .task-category {
    margin-top: 24px;
  }
  
  .category-title {
    background-color: #d3f5a7;
    padding: 8px 12px;
    border-radius: 12px;
    font-weight: bold;
    color: #134611;
    font-size: 16px;
    margin-bottom: 12px;
  }
  
  .task-card {
    background: #ffffff;
    border: 1px solid #ccc;
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .task-info {
    display: flex;
    justify-content: space-between;
  }
  
  .label {
    font-size: 12px;
    font-weight: bold;
    color: #134611;
  }
  
  .value {
    font-size: 14px;
    color: #555;
  }
  
  .jam {
    text-align: right;
  }
  
  .lokasi {
    border-top: 1px solid #eee;
    padding-top: 8px;
  }
</style>
