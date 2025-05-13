<template>
  <div class="bg-lime-50 min-h-screen p-4 md:p-6">
    <div class="bg-white rounded-2xl shadow-md overflow-hidden max-w-6xl mx-auto">
      <div class="bg-lime-600 text-white text-lg md:text-xl font-semibold px-6 py-4">
        Pengajuan Jadwal
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
              v-for="(jadwal, index) in jadwals"
              :key="index"
              class="hover:bg-lime-50"
            >
              <td class="px-6 py-4 whitespace-nowrap text-black">{{ jadwal.tanggal }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-black">{{ jadwal.jam }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-black">{{ jadwal.nama }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-black">{{ jadwal.lokasi }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-black">{{ jadwal.telepon }}</td>
              <td class="px-6 py-4">
                <span
                  class="inline-block px-2 py-1 rounded-full text-xs font-medium"
                  :class="{
                    'bg-yellow-100 text-yellow-800': jadwal.status === 'Request',
                    'bg-green-100 text-green-800': jadwal.status === 'Diterima',
                    'bg-red-100 text-red-800': jadwal.status === 'Ditolak'
                  }"
                >
                  {{ jadwal.status }}
                </span>
              </td>
              <td class="px-6 py-4 flex gap-2">
                <button
                  class="px-3 py-1 bg-lime-200 text-lime-800 hover:bg-lime-300 rounded text-xs font-semibold"
                  @click="konfirmasiTerima(index)"
                  :disabled="jadwal.status !== 'Request'"
                >
                  Terima
                </button>
                <button
                  class="px-3 py-1 bg-rose-200 text-rose-700 hover:bg-rose-300 rounded text-xs font-semibold"
                  @click="bukaModalTolak(index)"
                  :disabled="jadwal.status !== 'Request'"
                >
                  Tolak
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Tolak -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div class="bg-white rounded-xl p-6 w-96 shadow-lg relative">
        <h3 class="text-lg font-semibold mb-2 text-gray-800">Konfirmasi Penolakan</h3>
        <p class="text-sm text-gray-600 mb-3">Apakah Anda yakin ingin menolak pengajuan ini?</p>
        <textarea
          v-model="alasan"
          placeholder="Tuliskan alasan penolakan..."
          class="w-full border border-gray-300 rounded p-2 mb-3 text-sm"
        ></textarea>
        <div class="flex justify-end gap-2">
          <button @click="tutupModal" class="px-4 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm">Batalkan</button>
          <button @click="konfirmasiTolak" class="px-4 py-1 bg-rose-500 text-white rounded hover:bg-rose-600 text-sm">Ya, Tolak</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PengajuanJadwalPage",
  data() {
    return {
      jadwals: [
        {
          tanggal: '20/02/2025',
          jam: '10:00 WIB',
          nama: 'Rizky Pratama',
          lokasi: 'Jl. Gatot Subroto, Medan',
          telepon: '0822-2222-2222',
          status: 'Request'
        },
        {
          tanggal: '20/02/2025',
          jam: '10:00 WIB',
          nama: 'Andi Saputra',
          lokasi: 'Jl. Setia Budi, Medan Selayang',
          telepon: '0822-2222-2222',
          status: 'Request'
        },
        {
          tanggal: '20/02/2025',
          jam: '10:00 WIB',
          nama: 'Fajar Hidayat',
          lokasi: 'Jl. Iskandar Muda, Medan Petisah',
          telepon: '0822-2222-2222',
          status: 'Request'
        }
      ],
      showModal: false,
      alasan: '',
      selectedIndex: null
    };
  },
  methods: {
    konfirmasiTerima(index) {
      const konfirmasi = window.confirm("Apakah Anda yakin ingin menerima pengajuan ini?");
      if (konfirmasi) {
        this.jadwals[index].status = "Diterima";
        alert("Pengajuan telah diterima.");
      }
    },
    bukaModalTolak(index) {
      this.selectedIndex = index;
      this.showModal = true;
    },
    tutupModal() {
      this.showModal = false;
      this.alasan = '';
      this.selectedIndex = null;
    },
    konfirmasiTolak() {
      if (!this.alasan.trim()) {
        alert("Mohon isi alasan terlebih dahulu sebelum menolak.");
        return;
      }
      this.jadwals[this.selectedIndex].status = "Ditolak";
      alert("Pengajuan ditolak dengan alasan: " + this.alasan);
      this.tutupModal();
    }
  }
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
</style>
