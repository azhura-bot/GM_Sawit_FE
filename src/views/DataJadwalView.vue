<template>
  <div class="bg-lime-50 min-h-screen p-4 md:p-6">
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden max-w-full mx-auto">
      <div class="bg-lime-200 text-lime-900 text-lg md:text-xl font-semibold px-4 md:px-6 py-3 md:py-4">
        Pengajuan Jadwal
      </div>
      <div class="overflow-x-auto w-full">
        <table class="min-w-full table-auto border-collapse">
          <thead class="bg-lime-700 text-white text-xs md:text-sm">
            <tr>
              <th class="px-2 md:px-4 py-2 text-left">Tanggal</th>
              <th class="px-2 md:px-4 py-2 text-left">Jam</th>
              <th class="px-2 md:px-4 py-2 text-left">Nama Petani</th>
              <th class="px-2 md:px-4 py-2 text-left">Lokasi</th>
              <th class="px-2 md:px-4 py-2 text-left">No. Telephone</th>
              <th class="px-2 md:px-4 py-2 text-left">Status</th>
              <th class="px-2 md:px-4 py-2 text-left">Konfirmasi</th>
            </tr>
          </thead>
          <tbody class="text-xs md:text-sm">
            <tr class="hover:bg-lime-100 text-lime-900 border-b border-lime-100">
              <td class="px-2 md:px-4 py-2">20/02/2025</td>
              <td class="px-2 md:px-4 py-2">10:00 WIB</td>
              <td class="px-2 md:px-4 py-2">Rizky Pratama</td>
              <td class="px-2 md:px-4 py-2">Jl. Gatot Subroto, Medan</td>
              <td class="px-2 md:px-4 py-2">0822-2222-2222</td>
              <td class="px-2 md:px-4 py-2"><span class="inline-block px-2 py-1 rounded-full text-xs bg-gray-200 text-gray-800">Request</span></td>
              <td class="px-2 md:px-4 py-2">
                <button class="inline-block px-2 py-1 bg-lime-200 text-lime-800 hover:bg-lime-300 rounded text-xs mr-1">Terima?</button>
                <button class="inline-block px-2 py-1 bg-pink-200 text-pink-700 hover:bg-pink-300 rounded text-xs">Tidak</button>
              </td>
            </tr>
            <tr class="hover:bg-lime-100 text-lime-900 border-b border-lime-100">
              <td class="px-2 md:px-4 py-2">20/02/2025</td>
              <td class="px-2 md:px-4 py-2">10:00 WIB</td>
              <td class="px-2 md:px-4 py-2">Andi Saputra</td>
              <td class="px-2 md:px-4 py-2">Jl. Setia Budi, Medan Selayang</td>
              <td class="px-2 md:px-4 py-2">0822-2222-2222</td>
              <td class="px-2 md:px-4 py-2"><span class="inline-block px-2 py-1 rounded-full text-xs bg-gray-200 text-gray-800">Request</span></td>
              <td class="px-2 md:px-4 py-2">
                <button class="inline-block px-2 py-1 bg-lime-200 text-lime-800 hover:bg-lime-300 rounded text-xs mr-1">Terima?</button>
                <button class="inline-block px-2 py-1 bg-pink-200 text-pink-700 hover:bg-pink-300 rounded text-xs">Tidak</button>
              </td>
            </tr>
            <tr class="hover:bg-lime-100 text-lime-900 border-b border-lime-100">
              <td class="px-2 md:px-4 py-2">20/02/2025</td>
              <td class="px-2 md:px-4 py-2">10:00 WIB</td>
              <td class="px-2 md:px-4 py-2">Fajar Hidayat</td>
              <td class="px-2 md:px-4 py-2">Jl. Iskandar Muda, Medan Petisah</td>
              <td class="px-2 md:px-4 py-2">0822-2222-2222</td>
              <td class="px-2 md:px-4 py-2"><span class="inline-block px-2 py-1 rounded-full text-xs bg-gray-200 text-gray-800">Request</span></td>
              <td class="px-2 md:px-4 py-2">
                <button class="inline-block px-2 py-1 bg-lime-200 text-lime-800 hover:bg-lime-300 rounded text-xs mr-1">Terima?</button>
                <button class="inline-block px-2 py-1 bg-pink-200 text-pink-700 hover:bg-pink-300 rounded text-xs">Tidak</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PengajuanJadwalPage",
};
</script>

<style scoped>
/* Media query for smaller screens */
@media (max-width: 640px) {
  table {
    font-size: 0.75rem;
  }
  
  th, td {
    padding: 0.5rem 0.25rem;
  }
  
  button {
    padding: 0.25rem 0.5rem;
  }
}
</style>