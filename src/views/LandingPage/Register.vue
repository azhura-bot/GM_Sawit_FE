<template>
  <div
    class="w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-start justify-center pt-24 px-4 relative"
    style="background-image: linear-gradient(to bottom, rgba(1, 35, 14, 0.7), rgba(20, 83, 45, 0.5)), url('/login.jpeg')"
  >
    <div class="relative z-10 bg-white bg-opacity-90 p-8 rounded-3xl w-full max-w-md shadow-lg mb-25">
      <h1 class="text-4xl font-bold text-center mb-6 text-[#134611]">SIGN UP</h1>

      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- Nama -->
        <div>
          <label class="block text-sm font-semibold mb-1 text-[#134611]">Nama</label>
          <input
            type="text"
            v-model="name"
            class="w-full p-3 bg-[#D9D9D9] rounded-3xl outline-none text-black"
            required
          />
          <p v-if="errors.name" class="text-sm text-red-600 mt-1">{{ errors.name[0] }}</p>
        </div>

        <!-- No. Telepon -->
        <div>
          <label class="block text-sm font-semibold mb-1 text-[#134b11]">Nomor Telepon</label>
          <input
            type="tel"
            v-model="no_phone"
            pattern="^08[0-9]{8,12}$"
            title="Masukkan nomor Handphone"
            class="w-full p-3 bg-[#D9D9D9] rounded-3xl outline-none text-black"
            required
          />
          <p v-if="errors.no_phone" class="text-sm text-red-600 mt-1">{{ errors.no_phone[0] }}</p>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-semibold mb-1 text-[#134611]">Email</label>
          <input
            type="email"
            v-model="email"
            class="w-full p-3 bg-[#D9D9D9] rounded-3xl outline-none text-black"
            required
          />
          <p v-if="errors.email" class="text-sm text-red-600 mt-1">{{ errors.email[0] }}</p>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-semibold mb-1 text-[#134611]">Password</label>
          <input
            type="password"
            v-model="password"
            class="w-full p-3 bg-[#D9D9D9] rounded-3xl outline-none text-black"
            required
          />
          <p v-if="errors.password" class="text-sm text-red-600 mt-1">{{ errors.password[0] }}</p>
        </div>

        <!-- Konfirmasi Password -->
        <div>
          <label class="block text-sm font-semibold mb-1 text-[#134611]">Konfirmasi Password</label>
          <input
            type="password"
            v-model="confirmPassword"
            class="w-full p-3 bg-[#D9D9D9] rounded-3xl outline-none text-black"
            required
          />
          <p v-if="password !== confirmPassword" class="text-sm text-red-600 mt-1">
            Konfirmasi password tidak cocok.
          </p>
        </div>

        <button
          type="submit"
          class="w-full px-12 py-2 bg-[#134611] text-white rounded-[24px] font-semibold hover:bg-[#2f6d0f] transition mx-auto block"
        >
          Register
        </button>
      </form>

      <div class="mt-6 space-y-4">
        <router-link to="/login">
          <button class="w-full px-12 py-2 bg-green-600 text-white rounded-[24px] font-semibold hover:bg-green-700 transition">
            Sign In
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const no_phone = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const role = ref('petani') // default role
const errors = ref({})

const submitForm = async () => {
  errors.value = {}

  // Validasi frontend untuk konfirmasi password
  if (password.value !== confirmPassword.value) {
    return
  }

  try {
    const response = await axios.post('https://api.ecopalm.ydns.eu/api/register', {
      name: name.value,
      no_phone: no_phone.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value,
      role: role.value,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })

    alert('Registrasi berhasil!')
    router.push('/login')
  } catch (error) {
    if (error.response && error.response.status === 422) {
      errors.value = error.response.data.errors || {}
    } else {
      alert('Terjadi kesalahan saat mendaftar.')
    }
  }
}
</script>


<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
