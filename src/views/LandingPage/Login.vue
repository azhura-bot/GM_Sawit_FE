<!-- Login.vue -->
<template>
  <div class="w-full h-screen bg-cover bg-center relative flex items-center justify-center" style="background-image: url('/sawit1.png')">
    <div class="relative z-10 bg-white py-12 px-8 rounded-3xl w-full max-w-md shadow-lg">
      <h1 class="text-4xl font-bold text-center mb-6 text-[#134611]">Login</h1>
      <form @submit.prevent="submitLogin" class="space-y-4">
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
          <div class="text-center mt-1">
            <a href="#" class="text-blue-600 text-sm hover:underline">Forgot Password?</a>
          </div>
        </div>
        <button type="submit" class="px-12 py-2 bg-[#134611] text-white rounded-[24px] font-semibold hover:bg-[#2f6d0f] transition mx-auto block">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const submitLogin = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', {
      email: email.value,
      password: password.value,
    })

    const { token, user } = response.data

    localStorage.setItem('token', token)
    localStorage.setItem('role', user.role)
    localStorage.setItem('user', JSON.stringify(user))

    alert('Login berhasil!')

    if (user.role === 'manager') {
      router.push('/dashboard')
    } else if (user.role === 'pengepul') {
      router.push('/home-pengepul')
    } else if (user.role === 'petani') {
      router.push('/home-petani')
    } else {
      alert('Role tidak dikenali.')
    }

  } catch (error) {
  }
}
</script>


<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
nav {
  position: relative;
  z-index: 20;
}
</style>
