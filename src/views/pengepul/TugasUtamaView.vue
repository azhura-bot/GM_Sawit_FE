<template>
  <div class="main-container">

    <header class="header">
      <router-link to="/profile-pengepul" class="circle"></router-link>
      <span class="username">Lorem Ipsum</span>
    </header>
    
    <!-- Content -->
    <main class="content">
      <section class="task-section">
        <div class="title-with-icon">
          <img src="@/assets/icon-tugas-trans.png" alt="Tugas Icon" class="icon" />
          <h2>Tugas</h2>
        </div>

        <!-- Tugas Baru -->
        <div class="task-category">
          <h3 class="category-title">Tugas yang baru saja masuk</h3>
          <router-link
            v-for="task in newTasks"
            :key="task.id"
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

        <!-- Tugas Selesai -->
        <div class="task-category">
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

export default {
  setup() {
    const newTasks = ref([])
    const completedTasks = ref([])

    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('Token tidak ditemukan, silakan login terlebih dahulu.')

        const response = await axios.get('http://127.0.0.1:8000/api/task/by-pengepul', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const tasks = response.data.data || response.data

        // console.log('Tasks:', tasks)  // bisa diaktifkan jika perlu cek data

        newTasks.value = tasks.filter(task => task.status !== 'completed')
        completedTasks.value = tasks.filter(task => task.status === 'completed')
      } catch (error) {
        console.error('Gagal mengambil data tugas:', error)
        alert('Gagal mengambil data tugas, silakan cek console dan pastikan sudah login.')
      }
    }

    // Fungsi format jam dari string tanggal ISO
    const formatTime = (datetime) => {
      if (!datetime) return ''
      try {
        // Tangani baik yang pakai "T" maupun spasi
        const t = datetime.includes('T') ? datetime.split('T')[1] : datetime.split(' ')[1]
        const [h, m] = t.split(':')
        return h && m ? `${h.padStart(2, '0')}:${m.padStart(2, '0')}` : ''
      } catch (e) {
        console.error('FormatTime error:', e)
        return ''
      }
    }

    onMounted(() => {
      fetchTasks()
    })

    return {
      newTasks,
      completedTasks,
      formatTime,
    }
  },
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
