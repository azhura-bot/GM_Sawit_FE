<template>
  <div class="main-container">
    <!-- Header -->
    <header class="header">
      <div class="circle"></div>
      <span class="username">{{ userName }}</span>
    </header>

    <!-- Content -->
    <main class="content">
      <section class="section-header">
        <img src="@/assets/pengajuan-jadwal.png" alt="Icon Pengajuan" class="section-icon" />
        <h1>Riwayat Pengajuan Jadwal</h1>
      </section>

      <!-- Pending -->
      <section class="table-section">
        <h2 class="section-title pending">Menunggu</h2>
        <div class="table-container">
          <!-- Card Header -->
          <div class="jadwal-card header-card">
            <span class="jadwal-tanggal label text-[#333]">Tanggal</span>
            <span class="jadwal-jam label text-[#333]">Jam</span>
            <span class="jadwal-lokasi label">Lokasi</span>
          </div>
          <!-- Card Items -->
          <div v-for="(item, idx) in filteredMyJadwals.filter(j => j.status === 'pending')" :key="item.id" class="jadwal-card">
            <span class="jadwal-tanggal text-[#333]">{{ formatDate(item.tanggal) }}</span>
            <span class="jadwal-jam text-[#333]">{{ formatTime(item.tanggal) }}</span>
            <span class="jadwal-lokasi">{{ item.alamat }}</span>
          </div>
          <div v-if="!filteredMyJadwals.some(j => j.status === 'pending')" class="empty-message">
            Tidak ada pengajuan menunggu.
          </div>
        </div>
      </section>

      <!-- Accepted -->
      <section class="table-section">
        <h2 class="section-title accepted">Disetujui</h2>
        <div class="table-container">
          <div class="jadwal-card header-card">
            <span class="jadwal-tanggal label text-[#333]">Tanggal</span>
            <span class="jadwal-jam label text-[#333]">Jam</span>
            <span class="jadwal-lokasi label">Lokasi</span>
          </div>
          <div v-for="(item, idx) in filteredMyJadwals.filter(j => j.status === 'approved')" :key="item.id" class="jadwal-card">
            <span class="jadwal-tanggal text-[#333]">{{ formatDate(item.tanggal) }}</span>
            <span class="jadwal-jam text-[#333]">{{ formatTime(item.tanggal) }}</span>
            <span class="jadwal-lokasi">{{ item.alamat }}</span>
          </div>
          <div v-if="!filteredMyJadwals.some(j => j.status === 'approved')" class="empty-message">
            Tidak ada pengajuan disetujui.
          </div>
        </div>
      </section>

      <!-- Rejected -->
      <section class="table-section">
        <h2 class="section-title rejected">Ditolak</h2>
        <div class="table-container">
          <div class="jadwal-card header-card">
            <span class="jadwal-tanggal label text-[#333]">Tanggal</span>
            <span class="jadwal-jam labelv text-[#333]">Jam</span>
            <span class="jadwal-lokasi label">Lokasi</span>
            <span class="info-btn label">Alasan</span>
          </div>
          <div v-for="(item, idx) in filteredMyJadwals.filter(j => j.status === 'rejected')" :key="item.id" class="jadwal-card rejected-card">
            <span class="jadwal-tanggal text-[#333]">{{ formatDate(item.tanggal) }}</span>
            <span class="jadwal-jam text-[#333]">{{ formatTime(item.tanggal) }}</span>
            <span class="jadwal-lokasi">{{ item.alamat }}</span>
            <button class="info-btn" @click="openRejectInfo(item.alasan_reject)">Info</button>
          </div>
          <div v-if="!filteredMyJadwals.some(j => j.status === 'rejected')" class="empty-message">
            Tidak ada pengajuan ditolak.
          </div>
        </div>
      </section>

      <!-- Modal Alasan Reject -->
      <div
        v-if="showRejectModal"
        class="fixed inset-0 flex justify-center items-center z-50" style="background-color: rgba(0,0,0,0.5)"
      >
        <div class="bg-white rounded-xl p-6 w-80">
          <h3 class="text-lg font-semibold mb-4 text-[#134611]">Alasan Penolakan</h3>
          <p class="text-gray-800 mb-6 whitespace-pre-line">{{ rejectReason }}</p>
          <div class="text-right">
            <button
              @click="showRejectModal = false"
              class="close-btn px-4 py-2 bg-[#ff4d4d] text-white rounded"
            >Tutup</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'RiwayatJanjiTemu',
  data() {
    return {
      jadwals: [],
      showRejectModal: false,
      rejectReason: ''
    };
  },
  computed: {
    user() {
      return JSON.parse(localStorage.getItem('user') || '{}');
    },
    userName() {
      return this.user.name || 'User';
    },
    filteredMyJadwals() {
      return this.jadwals
        .filter(j => j.email === this.user.email)
        .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
    }
  },
  methods: {
    async fetchJadwals() {
      const token = localStorage.getItem('token');
      const res = await fetch('https://api.ecopalm.ydns.eu/api/janji-temu', {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' }
      });
      const { data } = await res.json();
      this.jadwals = data;
    },
    formatDate(dt) {
      return new Date(dt).toLocaleDateString('id-ID', { year:'numeric', month:'2-digit', day:'2-digit' });
    },
    formatTime(dt) {
      const t = dt.split('T')[1] || '';
      const [h, m] = t.split(':');
      return h && m ? `${h}:${m}` : '';
    },
    openRejectInfo(reason) {
      this.rejectReason = reason;
      this.showRejectModal = true;
    }
  },
  created() {
    this.fetchJadwals();
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
.pending { background-color: #A9A9A9; color: white; }
.accepted { background-color: #d9fdd3; color: #134611; }
.rejected { background-color: #ffe2e2; color: #cc0000; }
.table-section { margin-bottom: 2rem; }
.table-container { display: flex; flex-direction: column; }

/* Use CSS Grid for alignment */
.jadwal-card {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr auto;
  gap: 1rem;
  background: #f9f9f9;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  align-items: center;
}

/* Header version without background and shadow */
.header-card {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr auto;
  gap: 1rem;
  padding: 0 12px;
  font-weight: bold;
  color: #666;
  background: transparent;
  box-shadow: none;
}

/* Adjust rejected card for Info button label */
.header-card .info-btn.label {
  justify-self: start;
}
.rejected-card .info-btn {
  justify-self: end;
  margin-left: 0;
}

.jadwal-lokasi { font-size: 14px; color: #333; }
.info-btn {
  background: #ff4d4d;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
  justify-self: end;
}
.info-btn:hover { background: #e60000; }
.empty-message { text-align: center; color: #666; padding: 12px; }

.close-btn {
  transition: background-color 0.2s;
}
.close-btn:hover {
  background-color: #e60000;
}
</style>
