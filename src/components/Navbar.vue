 <template>
  <div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Dashboard Header Card -->
      <div class="m-4 mt-6 bg-[#E9FBD0] rounded-3xl p-6 shadow-md">
        <div class="flex items-center justify-between">
          <!-- Kiri: Icon & Title -->
          <div class="flex items-center gap-4">
            <label for="my-drawer" class="cursor-pointer w-14 h-14 bg-white rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>

            <div>
              <h1 class="text-green-900 font-bold text-lg">Manajer</h1>
              <p class="text-green-900 text-sm">Dashboard</p>
            </div>
          </div>

          <!-- Kanan: User Info -->
          <div class="flex items-center gap-4">
            <div class="text-right">
              <h1 class="text-green-900 font-bold">Jackson Miguel Wong</h1>
              <p class="text-green-900 text-sm">Manajer</p>
            </div>
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" class="w-14 h-14 rounded-full" />
          </div>
        </div>

        <!-- Tanggal -->
        <div class="mt-10">
          <p class="text-green-900 text-md">Tanggal</p>
          <h2 class="text-green-900 font-bold text-4xl">23 Maret 2025</h2>
        </div>
      </div>

      <!-- Cards
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        Total Tugas
        <div class="rounded-[30px] shadow-md bg-white">
          <div class="p-4">
            <div class="flex items-center gap-3">
              <svg class="w-6 h-6 text-green-900" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3h12a1 1 0 011 1v2H3V4a1 1 0 011-1zM3 8h14v1H3V8zm0 3h14v1H3v-1zm0 3h14v1H3v-1z" />
              </svg>
              <h2 class="text-green-900 font-semibold text-lg">Total Tugas</h2>
            </div>
            <div class="bg-lime-100 text-green-900 mt-4 text-5xl font-bold text-center rounded-2xl p-6">
              12
            </div>
          </div>
        </div> -->

        <!-- Tugas Berlangsung -->
        <!-- <div class="rounded-[30px] shadow-md bg-white">
          <div class="p-4">
            <div class="flex items-center gap-3">
              <svg class="w-6 h-6 text-green-900" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4h10v2H5V4zm0 4h10v2H5V8zm0 4h10v2H5v-2z" />
              </svg>
              <h2 class="text-green-900 font-semibold text-lg">Tugas yang Sedang Berlangsung</h2>
            </div>
            <div class="bg-lime-400 text-green-900 mt-4 text-5xl font-bold text-center rounded-2xl p-6">
              05
            </div>
          </div>
        </div> -->

        <!-- Tugas Selesai -->
        <!-- <div class="rounded-[30px] shadow-md bg-white">
          <div class="p-4">
            <div class="flex items-center gap-3">
              <svg class="w-6 h-6 text-green-900" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-4l-3-3 1.41-1.41L9 11.17l4.59-4.59L15 8l-6 6z" />
              </svg>
              <h2 class="text-green-900 font-semibold text-lg">Tugas yang Telah Selesai</h2>
            </div>
            <div class="bg-green-700 text-white mt-4 text-5xl font-bold text-center rounded-2xl p-6">
              03
            </div>
          </div>
        </div> -->
      <!-- </div> -->
    </div>

    <!-- Sidebar Drawer -->
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>
      <div class="menu p-4 w-64 min-h-full bg-white text-base-content text-green-900">
        <div class="flex flex-col items-center justify-center mb-4">
          <img src="../assets/logo.png" alt="Logo" class="w-24 mb-2" />
          <span class="text-lg font-bold">Sawit Sawit</span>
        </div>
        <ul class="w-full">
          <li><a href="/dashboard">Halaman Utama</a></li>
          <li><a href="/tugas">Tugas</a></li>
          <li><a href="/data-pengepul">Data Pengepul</a></li>
          <li><a href="#">Daftar Artikel</a></li>
          <li><a href="/data-statistik">Daftar Harga</a></li>
          <li><a href="/data-jadwal">Permintaan Jadwal</a></li>
          <li><a href="#">Daftar Transaksi</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
// no JS needed here
</script>
