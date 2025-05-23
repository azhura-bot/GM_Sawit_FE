<template>
  <div class="main-container">
    <!-- Header -->
    <header class="header flex items-center p-4 bg-white shadow">
      <router-link to="/profile" class="inline-block mr-3">
        <img
          :src="profileSrc"
          alt="Foto Profil"
          class="circle"
          @error="onPhotoError"
        />
      </router-link>
      <span class="username font-semibold text-white-800">
        {{ user.name || 'Nama User' }}
      </span>
    </header>

    <!-- Content -->
    <main class="content p-4">
      <section class="title-with-icon mb-4">
        <img src="@/assets/icon-tugas-trans.png" alt="Icon Tugas" class="icon inline-block mr-2" />
        <h2 class="inline-block text-xl font-bold">Tugas</h2>
      </section>

      <!-- Loading -->
      <div v-if="loading">Memuat detail tugas...</div>

      <!-- Data tugas -->
      <section v-else class="task-category">
        <div class="category-title font-semibold mb-2">Tugas yang baru saja masuk</div>

        <div class="task-card bg-white p-4 rounded shadow" v-if="task">
          <div class="task-info mb-2">
            <div class="label font-medium">Nama Tugas</div>
            <div class="value">{{ task.nama_task }}</div>
          </div>

          <div class="task-info mb-2">
            <div class="label font-medium">Nama Petani</div>
            <div class="value">{{ task.janji_temu.nama_petani }}</div>
          </div>

          <div class="task-info mb-2">
            <div class="label font-medium">Lokasi</div>
            <div class="value">{{ task.janji_temu.alamat }}</div>
          </div>

          <div class="task-info mb-4">
            <div class="label font-medium">Nomor Tlp</div>
            <div class="value">{{ task.janji_temu.no_hp }}</div>
          </div>

          <div class="button-group flex gap-2">
            <!-- Tombol Terima hanya kalau status 'pending' -->
            <button
              v-if="task.status === 'pending'"
              class="button-accept bg-green-500 text-white px-4 py-2 rounded"
              @click="handleAccept"
            >
              Terima
            </button>
            <button
              class="button-back bg-gray-300 text-gray-700 px-4 py-2 rounded"
              @click="goBack"
            >
              Kembali
            </button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DetailTugasView",
  data() {
    return {
      taskId: null,
      task: null,
      loading: true,
      locationEnabled: false,
      user: { name: "", photo_url: null },
    };
  },
    computed: {
    // gunakan photo_url langsung dari API, fallback ke defaultPhoto
    profileSrc() {
      return this.photoError || !this.user.photo_url
        ? defaultPhoto
        : this.user.photo_url
    }
  },
  methods: {
    getToken() {
      return localStorage.getItem("token");
    },

    async fetchUserProfile() {
      const token = localStorage.getItem("token")
      if (!token) return
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        const u = res.data.data
        this.user.name      = u.name
        this.user.photo_url = u.photo_url  // diisi oleh BE
      } catch (err) {
        console.error("Gagal mengambil profil:", err)
      }
    },
    onPhotoError() {
      this.photoError = true
    },

    async fetchTaskDetail() {
      this.loading = true;
      try {
        const res = await axios.get(
          `https://api.ecopalm.ydns.eu/api/task/${this.taskId}`,
          { headers: { Authorization: `Bearer ${this.getToken()}` } }
        );
        this.task = res.data.data;
      } catch (e) {
        console.error("Gagal memuat detail tugas:", e);
        alert("Gagal memuat data tugas.");
      } finally {
        this.loading = false;
      }
    },

    async handleAccept() {
      if (!this.locationEnabled) {
        this.requestLocationPermission(true);
        return;
      }
      if (!navigator.geolocation) {
        alert("Geolocation tidak didukung browser ini.");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            await axios.post(
              `https://api.ecopalm.ydns.eu/api/task/${this.taskId}/accepted`,
              {
                pul_latitude: pos.coords.latitude,
                pul_longitude: pos.coords.longitude
              },
              { headers: { Authorization: `Bearer ${this.getToken()}` } }
            );
            this.task.status = "accepted";
            alert("Tugas berhasil diterima.");
          } catch (e) {
            console.error("Gagal menerima tugas:", e);
            alert("Gagal menerima tugas.");
          }
        },
        () => {
          alert("Mohon izinkan akses lokasi.");
        }
      );
    },

    requestLocationPermission(showAlert = false) {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(
        () => (this.locationEnabled = true),
        () => {
          this.locationEnabled = false;
          if (showAlert) alert("Mohon aktifkan lokasi.");
        }
      );
    },

    goBack() {
      this.$router.push("/tugas-utama-pengepul");
    }
  },

  async mounted() {
    // 1) set ID
    this.taskId = this.$route.params.id;
    // 2) fetch profil user (nama + foto)
    await this.fetchUserProfile();
    // 3) fetch detail tugas
    this.fetchTaskDetail();
    // 4) request izin lokasi
    this.requestLocationPermission();
  },

  beforeDestroy() {
    // kosongkan jika ada interval tracking
  }
};
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
    border-radius: 16px 16px 16px 16px;
    padding: 16px;
  }
  
  .title-with-icon {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .title-with-icon .icon {
    width: 40px;
    height: 32px;
  }
  
  .title-with-icon h2 {
    font-weight: bold;
    font-size: 24px;
    color: #134611;
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
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .task-info {
    display: flex;
    flex-direction: column;
  }
  
  .label {
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }
  
  .value {
    font-size: 14px;
    color: #555;
  }
  
  .button-group {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 16px;
  }
  
  .button-decline {
    background-color: #ff6b6b;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    font-weight: bold;
  }
  
  .button-accept {
    background-color: #134611;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    font-weight: bold;
  }
  
  .button-back {
    background-color: #cccccc;
    color: black;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    font-weight: bold;
  }
  
  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
  }
  
  .modal-content {
    background: white;
    padding: 24px;
    border-radius: 16px;
    text-align: center;
    width: 300px;
  }
  
  .warning-img-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
  }
  
  .warning-img {
    width: 60px;
    height: 60px;
  }
  
  .modal-text {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 24px;
    color: #134611;
  }
  
  .modal-buttons {
    display: flex;
    justify-content: center;
    gap: 12px;
  }
  
  .modal-cancel {
    background-color: #007bff;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    font-weight: bold;
  }
  
  .modal-confirm {
    background-color: #134611;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    font-weight: bold;
  }

  .alasan-input {
  width: 100%;
  height: 80px;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 8px;
  font-size: 14px;
  resize: none;
  margin-bottom: 16px;
}
</style>
