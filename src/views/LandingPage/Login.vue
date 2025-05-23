<template>
  <div class="w-full h-screen bg-cover bg-center relative flex items-center justify-center" style="background-image: url('/login.jpeg')">
    <!-- Gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-green-950/70 to-green-900/50"></div>

    <div class="relative z-10 bg-white py-12 px-8 rounded-3xl w-full max-w-md shadow-lg">
      <h1 class="text-4xl font-bold text-center mb-6 text-[#134611]">Login</h1>

      <form @submit.prevent="submitLogin" class="space-y-4">
        <!-- Email -->
        <div>
          <label class="block text-sm font-semibold mb-1 text-[#134611]">Email</label>
          <input
            type="email"
            v-model="email"
            class="w-full p-3 bg-[#D9D9D9] rounded-3xl outline-none text-black"
            required
          />
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
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="text-sm text-red-600 bg-red-100 p-3 rounded-xl text-center">
          {{ errorMessage }}
        </div>

        <!-- Login Button -->
        <button type="submit" class="w-full px-12 py-2 bg-[#134611] text-white rounded-[24px] font-semibold hover:bg-[#2f6d0f] transition mx-auto block">
          Login
        </button>
      </form>

      <!-- Additional Buttons -->
      <div class="mt-6 space-y-4">
        <router-link to="/register">
          <button class="w-full px-12 py-2 bg-green-600 text-white rounded-[24px] font-semibold hover:bg-green-700 transition">
            Register
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

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const submitLogin = async () => {
  errorMessage.value = ''

  try {
    const response = await axios.post('https://api.ecopalm.ydns.eu/api/login', {
      email: email.value,
      password: password.value,
    })

    const { token, user } = response.data

    localStorage.setItem('token', token)
    localStorage.setItem('role', user.role)
    localStorage.setItem('user', JSON.stringify(user))

    // Redirect berdasarkan role
    if (user.role === 'manager') router.push('/dashboard')
    else if (user.role === 'pengepul') router.push('/home-pengepul')
    else if (user.role === 'petani') router.push('/home-petani')
    else errorMessage.value = 'Role tidak dikenali.'
  } catch (error) {
    if (error.response && error.response.status === 401) {
      errorMessage.value = 'Email atau password salah.'
    } else {
      errorMessage.value = 'Terjadi kesalahan saat login. Silakan coba lagi.'
    }
  }
}

const loginWithGoogle = () => {
  window.location.href = 'http://localhost:8000/api/google/redirect'
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Keep nav unaffected */
</style>
