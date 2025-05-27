<template>
  <div class="bg-lime-50 min-h-screen p-4 md:p-6">
    <div class="bg-white rounded-2xl shadow-md overflow-hidden max-w-6xl mx-auto">
      <div class="bg-lime-600 text-white text-lg md:text-xl font-semibold px-6 py-4">
        Pengajuan Jadwal
      </div>
      <!-- Filter & Pagination Controls -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between px-6 py-4">
        <div class="mb-2 md:mb-0">
          <label for="statusFilter" class="font-medium text-lime-800 mr-2">Filter Status:</label>
          <select id="statusFilter" v-model="filterStatus" @change="currentPage=1" class="border border-gray-300 rounded p-2 text-black">
            <option value="all">Semua</option>
            <option value="pending">Request</option>
            <option value="approved">Diterima</option>
            <option value="rejected">Ditolak</option>
          </select>
        </div>
        <div>
          <span class="text-sm text-gray-600">Halaman {{ currentPage }} dari {{ totalPages }}</span>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 text-sm">
          <thead class="bg-lime-100 text-lime-900 uppercase tracking-wide">
            <tr>
              <th class="px-6 py-3 text-left font-semibold">Tanggal</th>
              <th class="px-6 py-3 text-left font-semibold">Jam</th>
              <th class="px-6 py-3 text-left font-semibold">Nama Petani</th>
              <th class="px-6 py-3 text-left font-semibold">Lokasi</th>
              <th class="px-6 py-3 text-left font-semibold">No. Telephone</th>
              <th class="px-6 py-3 text-left font-semibold">Status</th>
              <th class="px-6 py-3 text-left font-semibold">Konfirmasi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 bg-white">
            <tr
              v-for="(jadwal, index) in paginatedJadwals"
              :key="jadwal.id"
              class="hover:bg-lime-50"
            >
              <td class="px-6 py-4 text-black whitespace-nowrap">{{ formatDate(jadwal.tanggal) }}</td>
              <td class="px-6 py-4 text-black whitespace-nowrap">{{ formatTime(jadwal.tanggal) }}</td>
              <td class="px-6 py-4 text-black whitespace-nowrap">{{ jadwal.nama_petani }}</td>
              <td class="px-6 py-4 text-black" style="white-space: normal; word-break: break-word; max-width: 200px;">
                {{ jadwal.alamat }}
              </td>
              <td class="px-6 py-4 text-black whitespace-nowrap">{{ jadwal.no_hp }}</td>
              <td class="px-6 py-4">
                <span
                  class="inline-block px-2 py-1 rounded-full text-xs font-medium"
                  :class="{
                    'bg-yellow-100 text-yellow-800': jadwal.status === 'pending',
                    'bg-green-100 text-green-800': jadwal.status === 'approved',
                    'bg-red-100 text-red-800': jadwal.status === 'rejected'
                  }"
                >
                  {{ statusMap[jadwal.status] || jadwal.status }}
                </span>
              </td>
              <td class="px-6 py-4">
                <template v-if="jadwal.status === 'pending'">
                  <div class="flex gap-2">
                    <button
                      class="px-3 py-1 bg-lime-200 text-lime-800 hover:bg-lime-300 rounded text-xs font-semibold"
                      @click="bukaModalTerima(index)"
                      :disabled="loading"
                    >
                      Terima
                    </button>
                    <button
                      class="px-3 py-1 bg-rose-200 text-rose-700 hover:bg-rose-300 rounded text-xs font-semibold"
                      @click="bukaModalTolak(index)"
                      :disabled="loading"
                    >
                      Tolak
                    </button>
                  </div>
                </template>
                <template v-else>
                  <span class="text-[#134611]">Sudah Ambil Tindakan</span>
                </template>
              </td>
            </tr>
            <tr v-if="!paginatedJadwals.length">
              <td colspan="7" class="text-center text-gray-500 py-4">Tidak ada data jadwal.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Pagination Buttons -->
      <div class="flex justify-center items-center gap-2 p-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 bg-[#134611] border rounded text-white"
        >Prev</button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 bg-[#134611] border rounded text-white"
        >Next</button>
      </div>
    </div>
    <!-- Modal Tolak -->
    <div v-if="showModal" class="fixed inset-0 flex justify-center items-center z-50" style="background-color: rgba(0,0,0,0.5)">
      <div class="bg-white rounded-xl p-6 w-96 shadow-lg">
        <h3 class="text-lg font-semibold mb-2 text-gray-800">Konfirmasi Penolakan</h3>
        <textarea v-model="alasan" placeholder="Alasan penolakan..." class="w-full border border-gray-300 rounded p-2 mb-4 text-black"></textarea>
        <div class="flex justify-end gap-2">
          <button @click="tutupModal" class="px-4 py-2 bg-gray-200 rounded text-black" :disabled="loading">Batal</button>
          <button @click="konfirmasiTolak" class="px-4 py-2 bg-rose-500 text-white rounded" :disabled="loading || !alasan.trim()">Tolak</button>
        </div>
      </div>
    </div>
    <!-- Modal Terima -->
    <div v-if="showModalTerima" class="fixed inset-0 flex justify-center items-center z-50" style="background-color: rgba(0,0,0,0.5)">
      <div class="bg-white rounded-xl p-6 w-96 shadow-lg">
        <h3 class="text-lg font-semibold mb-2 text-gray-800">Pilih Pengepul</h3>
        <select v-model="selectedPengepul" class="w-full border border-gray-300 rounded p-2 mb-4 text-black">
          <option disabled value="">-- Pilih pengepul --</option>
          <option v-for="p in pengepuls" :key="p.id" :value="p.id">{{ p.name }}</option>
        </select>
        <div class="flex justify-end gap-2">
          <button @click="tutupModalTerima" class="px-4 py-2 bg-gray-200 rounded text-black" :disabled="loading">Batal</button>
          <button @click="konfirmasiTerima" class="px-4 py-2 bg-green-500 text-white rounded" :disabled="loading || !selectedPengepul">Terima</button>
        </div>
      </div>
    </div>
    <!-- Loading Overlay -->
    <div v-if="isAccepting" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-xl p-6 flex flex-col items-center shadow-lg">
        <svg class="animate-spin h-8 w-8 text-green-700 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
        <div class="text-green-900 font-semibold">Memproses...</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PengajuanJadwalPage',
  data() {
    return {
      jadwals: [], pengepuls: [], selectedPengepul: null,
      showModal: false, showModalTerima: false, alasan: '', loading: false,
      statusMap: { pending: 'Request', approved: 'Diterima', rejected: 'Ditolak' },
      filterStatus: 'all', currentPage: 1, pageSize: 5, selectedIndex: null,
      isAccepting: false,
    };
  },
  computed: {
    filteredJadwals() {
      let list = this.jadwals;
      if (this.filterStatus !== 'all') list = list.filter(j => j.status === this.filterStatus);
      return list.sort((a, b) => (a.status===b.status?0:(a.status==='pending'? -1:(b.status==='pending'?1:0))));
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.filteredJadwals.length / this.pageSize));
    },
    paginatedJadwals() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredJadwals.slice(start, start + this.pageSize);
    }
  },
  methods: {
    formatDate(datetime) {
      if (!datetime) return '';
      return new Date(datetime).toLocaleDateString('id-ID', { year:'numeric', month:'2-digit', day:'2-digit' });
    },
    formatTime(datetime) {
      if (!datetime) return '';
      const t = datetime.split('T')[1] || '';
      const [h,m] = t.split(':') || [];
      return h && m ? `${h.padStart(2,'0')}:${m.padStart(2,'0')}` : '';
    },
    prevPage() { if (this.currentPage>1) this.currentPage--; },
    nextPage() { if (this.currentPage<this.totalPages) this.currentPage++; },
    async fetchJadwal() {
      this.loading=true;
      try {
        const token=localStorage.getItem('token');
        const res=await fetch('https://api.ecopalm.ydns.eu/api/janji-temu',{ headers:{ 'Authorization':`Bearer ${token}`, 'Accept':'application/json' } });
        if(!res.ok) throw new Error(res.status);
        const { data }=await res.json();
        this.jadwals=data;
      } catch(e) { console.error(e); alert('Gagal memuat data jadwal.'); }
      finally { this.loading=false; }
    },
    bukaModalTolak(idx) { this.selectedIndex=idx; this.alasan=''; this.showModal=true; },
    tutupModal() { this.showModal=false; this.selectedIndex=null; this.alasan=''; },
    async bukaModalTerima(idx) {
      this.selectedIndex=idx; this.showModalTerima=true; this.selectedPengepul=null;
      try { const token=localStorage.getItem('token'); const res=await fetch('https://api.ecopalm.ydns.eu/api/pengepul',{ headers:{ 'Authorization':`Bearer ${token}`, 'Accept':'application/json' } }); if(!res.ok) throw new Error(res.status); this.pengepuls=(await res.json()).data; } catch(e){ console.error(e); alert('Gagal memuat pengepul.'); }
    },
    tutupModalTerima() { this.showModalTerima=false; this.selectedIndex=null; },
    async konfirmasiTolak() {
      if(!this.alasan.trim()) return;
      this.loading=true;
      try {
        const jadwal=this.paginatedJadwals[this.selectedIndex];
        const token=localStorage.getItem('token');
        const res=await fetch(`https://api.ecopalm.ydns.eu/api/janji-temu/${jadwal.id}/reject`,{ method:'POST', headers:{ 'Authorization':`Bearer ${token}`,'Content-Type':'application/json' }, body: JSON.stringify({ alasan_reject:this.alasan }) });
        if(!res.ok) throw new Error(res.status);
        jadwal.status='rejected'; this.tutupModal();
      } catch(e){ console.error(e); alert('Gagal menolak jadwal.'); }
      finally{ this.loading=false; }
    },
    async konfirmasiTerima() {
      if(!this.selectedPengepul) return;
      this.loading=true;
      try {
        const jadwal=this.paginatedJadwals[this.selectedIndex];
        const token=localStorage.getItem('token');
        const res=await fetch('https://api.ecopalm.ydns.eu/api/task',{ method:'POST', headers:{ 'Authorization':`Bearer ${token}`,'Content-Type':'application/json' }, body:JSON.stringify({ janji_temu_id:jadwal.id, pengepul_id:this.selectedPengepul }) });
        if(!res.ok) throw new Error(res.status);
        jadwal.status='approved'; this.tutupModalTerima();
      } catch(e){ console.error(e); alert('Gagal konfirmasi jadwal.'); }
      finally{ this.loading=false; }
    }
  },
  created() { this.fetchJadwal(); }
};
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

@keyframes spin { to { transform: rotate(360deg); } }
.animate-spin { animation: spin 1s linear infinite; }
</style>
