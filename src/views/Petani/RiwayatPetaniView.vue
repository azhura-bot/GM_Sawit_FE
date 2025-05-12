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
        <h1>Riwayat Pengajuan Jadwal</h1>
      </section>

      <!-- Diterima -->
      <section class="table-section">
        <h2 class="section-title accepted">Pengajuan Diterima</h2>
        <div class="table-container">
          <table class="jadwal-table">
            <thead>
              <tr>
                <th>Nama Petani</th>
                <th>Jam</th>
                <th>Lokasi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in acceptedSchedules" :key="'acc-' + index">
                <td>{{ item.nama }}</td>
                <td>{{ item.jam }}</td>
                <td>{{ item.lokasi }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Ditolak -->
      <section class="table-section">
        <h2 class="section-title rejected">Pengajuan Ditolak</h2>
        <div class="table-container">
          <table class="jadwal-table">
            <thead>
              <tr>
                <th>Nama Petani</th>
                <th>Jam</th>
                <th>Lokasi</th>
                <th>Alasan</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in rejectedSchedules" :key="'rej-' + index">
                <td>{{ item.nama }}</td>
                <td>{{ item.jam }}</td>
                <td>{{ item.lokasi }}</td>
                <td>
                  <button class="info-btn">Info</button>
                </td>
              </tr>
            </tbody>
          </table>
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
        { nama: "Agus Setiawan", lokasi: "Tanjung Gusta, Medan Helvetia", jam: "10:00 WIB" },
        { nama: "Agus Setiawan", lokasi: "Tanjung Gusta, Medan Helvetia", jam: "11:00 WIB" },
      ],
      rejectedSchedules: [
        { nama: "Agus Setiawan", lokasi: "Tanjung Gusta, Medan Helvetia", jam: "12:00 WIB" },
        { nama: "Agus Setiawan", lokasi: "Tanjung Gusta, Medan Helvetia", jam: "13:00 WIB" },
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
    margin-bottom: 2rem;
  }

  .section-icon {
    width: 50px;
    height: 50px;
  }

  .section-header h1 {
    font-size: 24px;
    font-weight: bold;
    margin-top: 0.5rem;
    color: #134611;
  }

  .section-title {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 8px;
  }

  .accepted {
    background-color: #d9fdd3;
    color: #134611;
  }

  .rejected {
    background-color: #ffe2e2;
    color: #cc0000;
  }

  .table-container {
    overflow-x: auto;
    margin-bottom: 2rem;
  }

  .jadwal-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .jadwal-table th,
  .jadwal-table td {
    padding: 12px 16px;
    border-bottom: 1px solid #ddd;
    text-align: left;
    color: #000;
  }

  .jadwal-table th {
    background-color: #f3f4f6;
    color: #333;
    font-weight: 600;
  }

  .jadwal-table tbody tr:hover {
    background-color: #f9f9f9;
  }

  .info-btn {
    background: #ff4d4d;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 6px 12px;
    font-weight: bold;
    font-size: 12px;
    cursor: pointer;
  }

  .info-btn:hover {
    background: #e60000;
  }


  </style>
  