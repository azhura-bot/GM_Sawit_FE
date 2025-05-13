<template>
    <div class="main-container">
      <!-- Header -->
      <header class="header">
        <div class="circle"></div>
        <span class="username">Nama User</span>
      </header>
  
      <!-- Content -->
      <main class="content">
        <section class="section-header">
          <img src="@/assets/pengajuan-jadwal.png" alt="Icon Pengajuan" class="section-icon" />
          <h1 class="text-[#134611]">Riwayat Pengajuan Jadwal</h1>
        </section>
  
        <section class="accepted-section">
          <div class="section-label accepted">Pengajuan jadwal yang diterima</div>
          
          <div v-for="(item, index) in acceptedSchedules" :key="index" class="schedule-card">
            <div class="schedule-row">
              <span class="label">Nama Petani: </span>
              <span class="value text-[#134611]">{{ item.nama }}</span>
              <span class="label jam text-[#134611]">Jam: </span>
              <span class="value jam text-[#134611]">{{ item.jam }}</span>
            </div>
            <div class="schedule-row">
              <span class="label">Lokasi: </span>
              <span class="value text-[#134611]">{{ item.lokasi }}</span>
            </div>
          </div>
        </section>
  
        <section class="rejected-section">
          <div class="section-label rejected">Pengajuan jadwal yang ditolak</div>
          
          <div v-for="(item, index) in rejectedSchedules" :key="index" class="schedule-card">
            <div class="schedule-row">
              <span class="label">Nama Petani</span>
              <span class="value">{{ item.nama }}</span>
              <span class="label jam">Jam</span>
              <span class="value jam">{{ item.jam }}</span>
            </div>
            <div class="schedule-row">
              <span class="label">Lokasi</span>
              <span class="value">{{ item.lokasi }}</span>
            </div>
            <button class="info-btn">Info</button>
          </div>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        acceptedSchedules: [
          { nama: "Agus Setiawan", lokasi: "Jl. Swad Jaya No 8, RT 01 / RW 05, Kel. Tanjung Gusta, Kec. Medan Helvetia", jam: "10:00 WIB" },
          { nama: "Agus Setiawan", lokasi: "Jl. Swad Jaya No 8, RT 01 / RW 05, Kel. Tanjung Gusta, Kec. Medan Helvetia", jam: "10:00 WIB" },
          { nama: "Agus Setiawan", lokasi: "Jl. Swad Jaya No 8, RT 01 / RW 05, Kel. Tanjung Gusta, Kec. Medan Helvetia", jam: "10:00 WIB" },
        ],
        rejectedSchedules: [
          { nama: "Agus Setiawan", lokasi: "Jl. Swad Jaya No 8, RT 01 / RW 05, Kel. Tanjung Gusta, Kec. Medan Helvetia", jam: "10:00 WIB" },
          { nama: "Agus Setiawan", lokasi: "Jl. Swad Jaya No 8, RT 01 / RW 05, Kel. Tanjung Gusta, Kec. Medan Helvetia", jam: "10:00 WIB" },
          { nama: "Agus Setiawan", lokasi: "Jl. Swad Jaya No 8, RT 01 / RW 05, Kel. Tanjung Gusta, Kec. Medan Helvetia", jam: "10:00 WIB" },
        ],
      };
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
    border-radius: 16px 16px 0 0;
    padding: 16px;
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .section-icon {
    width: 50px;
    height: 50px;
  }
  
  .section-header h1 {
    font-size: 24px;
    font-weight: bold;
    margin-top: 0.5rem;
  }
  
  .section-label {
    font-weight: bold;
    padding: 0.5rem;
    border-radius: 10px;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .accepted {
    background-color: #d9fdd3;
    color: #134611;
  }
  
  .rejected {
    background-color: #ffe2e2;
    color: #cc0000;
  }
  
  .schedule-card {
  background: white;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 1rem;
  padding-right: 4rem; /* tambahin padding kanan khusus */
  margin-bottom: 1rem;
  position: relative;
}

  
  .schedule-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  
  .label {
    font-weight: bold;
    color: #134611;
  }
  
  .value {
    flex: 1;
    margin-left: 10px;
  }
  
  .jam {
    flex: 0 0 auto;
    margin-left: 20px;
  }
  
  .info-btn {
  position: absolute;
  top: 16px; /* agak ke bawah biar sejajar */
  right: 16px;
  background: #ff4d4d;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 5px 10px;
  font-weight: bold;
  font-size: 12px;
}

  </style>
  