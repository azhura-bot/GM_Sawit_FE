<template>
  <div class="drawer min-h-screen">
    <!-- Checkbox toggle untuk drawer -->
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />

    <!-- Konten utama -->
    <div class="drawer-content flex flex-col bg-white">
      <!-- Navbar -->
      <Navbar />

      <!-- Konten Form -->
      <div class="flex-1 p-10">
        <div class="bg-[#E8FCCF] p-10 rounded-2xl w-full max-w-4xl mx-auto">
          <h1 class="text-3xl font-bold mb-8 text-green-900">Tambahkan Data Pengepul</h1>

          <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Nama -->
            <div class="flex flex-col">
              <label for="nama" class="mb-2 text-green-900">Nama Pengepul</label>
              <input
                id="nama"
                v-model="form.nama"
                type="text"
                class="input input-bordered rounded-full bg-white text-black placeholder-black"
                placeholder="Masukkan nama"
                required
              />
            </div>

            <!-- Email -->
            <div class="flex flex-col">
              <label for="email" class="mb-2 text-green-900">Email Pengepul</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="input input-bordered rounded-full bg-white text-black placeholder-black"
                placeholder="@gmail.com"
                required
              />
            </div>

            <!-- Telepon -->
            <div class="flex flex-col">
              <label for="telepon" class="mb-2 text-green-900">Nomor Telepon</label>
              <input
                id="telepon"
                v-model="form.telepon"
                type="tel"
                class="input input-bordered rounded-full bg-white text-black placeholder-black"
                placeholder="+628xxxxxxxxxx"
                required
              />
            </div>

            <!-- Password -->
            <div class="flex flex-col">
              <label for="password" class="mb-2 text-green-900">Password</label>
              <input
                id="password"
                v-model="form.password"
                type="password"
                class="input input-bordered rounded-full bg-white text-black placeholder-black"
                placeholder="Password"
                required
              />
            </div>

            <!-- Password Confirmation -->
            <div class="flex flex-col">
              <label for="password_confirmation" class="mb-2 text-green-900">Konfirmasi Password</label>
              <input
                id="password_confirmation"
                v-model="form.password_confirmation"
                type="password"
                class="input input-bordered rounded-full bg-white text-black placeholder-black"
                placeholder="Konfirmasi Password"
                required
              />
            </div>

            <!-- Tombol -->
            <div class="col-span-2 mt-4 flex gap-4">
              <button
                type="submit"
                class="btn px-10 rounded-full text-white"
                style="background-color: #3E8914;"
              >
                Tambahkan
              </button>

              <router-link
                to="/data-pengepul"
                class="btn px-10 rounded-full text-green-900"
                style="background-color: #FFFFFF;"
              >
                Kembali
              </router-link>
            </div>

          </form>
        </div>
      </div>
    </div>

    <!-- Drawer sidebar -->
    <div class="drawer-side z-50">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 w-64 min-h-full bg-white text-green-900">
        <li><a>Halaman Utama</a></li>
        <li><a>Tugas</a></li>
        <li class="bg-[#E8FCCF] rounded font-bold"><a>Data Pengepul</a></li>
        <li><a>Data Artikel</a></li>
        <li><a>Data Harga</a></li>
        <li><a>Permintaan Jadwal</a></li>
        <li><a>Data Transaksi</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const form = ref({
  nama: '',
  // tanggal: '',
  email: '',
  telepon: '',
  password: '',
  password_confirmation: '',
})

const submitForm = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/pengepul', {
      name: form.value.nama,
      // created_at: form.value.tanggal, // Kalau tidak dipakai di backend, abaikan saja
      email: form.value.email,
      no_phone: form.value.telepon,
      password: form.value.password,
      password_confirmation: form.value.password_confirmation,
    })
    console.log('Data berhasil ditambahkan:', response.data)

    // Redirect ke halaman data-pengepul
    router.push('/data-pengepul')
  } catch (error) {
    console.error('Gagal menambahkan data:', error.response?.data || error.message)
    alert('Gagal menambahkan data! Periksa kembali inputannya.')
  }
}
</script>
