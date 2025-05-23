<template>
  <div
    class="w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-start justify-center pt-24 px-4 relative"
    style="background-image: linear-gradient(to bottom, rgba(1, 35, 14, 0.7), rgba(20, 83, 45, 0.5)), url('/login.jpeg')"
  >
    <div class="relative z-10 bg-white bg-opacity-90 p-8 rounded-3xl w-full max-w-md shadow-lg mb-25">
      <h1 class="text-4xl font-bold text-center mb-6 text-[#134611]">SIGN UP</h1>

      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label class="block text-sm font-semibold mb-1 text-[#134611]">Nama</label>
          <input
            type="text"
            v-model="name"
            class="w-full p-3 bg-[#D9D9D9] rounded-3xl outline-none text-black"
            required
          />
        </div>

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
        </div>

        <div>
          <label class="block text-sm font-semibold mb-1 text-[#134611]">Email</label>
          <input
            type="email"
            v-model="email"
            class="w-full p-3 bg-[#D9D9D9] rounded-3xl outline-none text-black"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-1 text-[#134611]">Password</label>
          <input
            type="password"
            v-model="password"
            class="w-full p-3 bg-[#D9D9D9] rounded-3xl outline-none text-black"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full px-12 py-2 bg-[#134611] text-white rounded-[24px] font-semibold hover:bg-[#2f6d0f] transition mx-auto block"
        >
          Register
        </button>
      </form>
      <div class="mt-6 space-y-4">
        <!-- Register Button -->
        <router-link to="/login">
          <button class="w-full px-12 py-2 bg-green-600 text-white rounded-[24px] font-semibold hover:bg-green-700 transition">
            Sign In
          </button>
        </router-link>
        <!-- Google Login Button -->
        <!-- <button @click="loginWithGoogle" class="w-full flex items-center justify-center px-12 py-2 my-5 bg-red-600 text-white rounded-[24px] font-semibold hover:bg-red-700 transition">
          <svg class="h-5 w-5 mr-2" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.4-34.1-4.2-50.4H272v95.4h147.5c-6.4 34.5-26.1 63.7-55.7 83.3l90 69.8c52.6-48.5 83-120 83-197.9z"/>
            <path fill="#34A853" d="M272 544.3c75.5 0 139-24.8 185.4-67.3l-90-69.8c-25 16.8-57 26.7-95.4 26.7-73.4 0-135.6-49.5-157.8-116.1l-92.2 71.1c45.9 90.7 140.7 155.4 250 155.4z"/>
            <path fill="#FBBC05" d="M114.2 325.8c-10.4-30.9-10.4-64.6 0-95.5L22 159.2c-41.6 81.6-41.6 179.2 0 260.8l92.2-71.1z"/>
            <path fill="#EA4335" d="M272 107.7c39.8 0 75.6 13.7 103.8 40.6l78-78C410.7 24.2 345.6 0 272 0 162.7 0 67.9 64.7 22 159.2l92.2 71.1C136.4 157.2 198.6 107.7 272 107.7z"/>
          </svg>
          Login with Google
        </button> -->
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
const role = ref('') 

const submitForm = async () => {
  try {
    const response = await axios.post('https://api.ecopalm.ydns.eu/api/register', {
      name: name.value,
      no_phone: no_phone.value,
      email: email.value,
      password: password.value,
      password_confirmation: password.value,
      role: role.value,
    }, {
      headers: {
        'Content-Type': 'application/json', 
      }
    })

    console.log('Register sukses:', response.data)
    alert('Registrasi berhasil!')
    router.push('/login')
  } catch (error) {
    console.error('Register gagal:', error.response?.data || error.message)
    alert('Terjadi kesalahan saat mendaftar.')
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
