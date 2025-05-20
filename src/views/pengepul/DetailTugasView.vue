<template>
  <div class="main-container">
    <header class="header">
      <router-link to="/profile-pengepul" class="circle"></router-link>
      <span class="username">{{ pengepulName }}</span>
    </header>

    <main class="content">
      <section class="title-with-icon">
        <img src="@/assets/icon-tugas-trans.png" alt="Icon Tugas" class="icon" />
        <h2> Tugas </h2>
      </section>

      <!-- Loading -->
      <div v-if="loading">Memuat detail tugas...</div>

      <!-- Data tugas -->
      <section v-else class="task-category">
        <div class="category-title">Tugas yang baru saja masuk</div>

        <div class="task-card" v-if="task">
          <div class="task-info">
            <div class="label">Nama Tugas</div>
            <div class="value">{{ task.nama_task }}</div>
          </div>

          <div class="task-info">
            <div class="label">Nama Petani</div>
            <div class="value">{{ task.janji_temu.nama_petani }}</div>
          </div>

          <div class="task-info">
            <div class="label">Lokasi</div>
            <div class="value">{{ task.janji_temu.alamat }}</div>
          </div>

          <div class="task-info">
            <div class="label">Nomor Tlp</div>
            <div class="value">{{ task.janji_temu.no_hp }}</div>
          </div>
        </div>

        <div class="button-group">
          <button class="button-accept" @click="handleAccept">Terima</button>
          <button class="button-back" @click="goBack">Kembali</button>
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
      pengepulName: "",
      trackingInterval: null,
      loading: true,
      locationEnabled: false,
    };
  },
  methods: {
    goBack() {
      this.$router.push("/tugas-utama-pengepul");
    },

    getToken() {
      return localStorage.getItem("token");
    },

    getUser() {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    },

    async fetchTaskDetail() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/task/${this.taskId}`, {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        });
        this.task = response.data.data;
        this.loading = false;
      } catch (error) {
        console.error("Gagal memuat detail tugas:", error);
        alert("Gagal memuat data tugas.");
      }
    },

    async handleAccept() {
      if (!this.locationEnabled) {
        this.requestLocationPermission(true);
        return; // Jangan lanjut dulu sebelum izin diaktifkan
      }

      if (!navigator.geolocation) {
        alert("Geolocation tidak didukung oleh browser ini.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            await axios.post(
              `http://127.0.0.1:8000/api/task/${this.taskId}/accepted`,
              {
                pul_latitude: position.coords.latitude,
                pul_longitude: position.coords.longitude,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.getToken()}`,
                },
              }
            );

            this.startLocationTracking();
            alert("Tugas berhasil diterima. Tracking lokasi dimulai.");
          } catch (error) {
            console.error("Gagal menerima tugas:", error.response?.data || error);
            alert("Gagal menerima tugas.");
          }
        },
        (error) => {
          alert("Mohon aktifkan lokasi untuk melanjutkan. Silakan izinkan akses lokasi di browser Anda.");
          console.error("Error mendapatkan lokasi:", error);
        }
      );
    },

    requestLocationPermission(showAlert = false) {
      if (!navigator.geolocation) {
        alert("Geolocation tidak didukung oleh browser ini.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        () => {
          this.locationEnabled = true;
        },
        () => {
          this.locationEnabled = false;
          if (showAlert) {
            alert("Mohon aktifkan lokasi untuk melanjutkan. Silakan izinkan akses lokasi di browser Anda.");
          }
        }
      );
    },

    startLocationTracking() {
      if (!navigator.geolocation) {
        console.error("Geolocation tidak didukung browser");
        return;
      }

      this.trackingInterval = setInterval(() => {
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
          if (result.state === 'granted') {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                try {
                  await axios.put(
                    `http://127.0.0.1:8000/api/task/${this.taskId}/location`,
                    {
                      pul_latitude: position.coords.latitude,
                      pul_longitude: position.coords.longitude,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${this.getToken()}`,
                      },
                    }
                  );
                } catch (err) {
                  console.error("Gagal mengirim lokasi:", err);
                }
              },
              (error) => {
                console.error("Gagal mengambil lokasi:", error.message);
              }
            );
          } else if (result.state === 'denied') {
            console.warn("Izin lokasi ditolak, hentikan tracking");
            this.stopLocationTracking();
            alert("Izin lokasi ditolak, tracking lokasi dihentikan.");
          }
          // Kalau state 'prompt' bisa juga minta izin, tapi biasanya terjadi di awal saja
        });
      }, 5000);
    },

    stopLocationTracking() {
      if (this.trackingInterval) {
        clearInterval(this.trackingInterval);
        this.trackingInterval = null;
      }
    },
  },
  mounted() {
    this.taskId = this.$route.params.id;
    const user = this.getUser();
    this.pengepulName = user ? user.nama : "Pengepul";

    this.fetchTaskDetail();
    this.requestLocationPermission();
  },
  beforeDestroy() {
    this.stopLocationTracking();
  },
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
