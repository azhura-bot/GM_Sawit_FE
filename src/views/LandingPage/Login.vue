<template>
    <div
      class="w-full h-screen bg-cover bg-center relative flex items-center justify-center"
      style="background-image: url('/sawit1.png')"
    >
      <!-- Form Card -->
      <div class="relative z-10 bg-white py-12 px-8 rounded-3xl w-full max-w-md shadow-lg">
        <h1 class="text-4xl font-bold text-center mb-6 text-[#134611]">Login</h1>
  
        <form @submit.prevent="submitLogin" class="space-y-4">
          <!-- Email -->
          <div>
            <label class="block text-sm font-semibold mb-1 text-[#134611]">Email</label>
            <input
              type="email"
              v-model="email"
              class="w-full p-3 bg-[#D9D9D9] rounded-3xl outline-none"
              required
            />
          </div>
  
          <!-- Password -->
          <div>
            <label class="block text-sm font-semibold mb-1 text-[#134611]">Password</label>
            <input
              type="password"
              v-model="password"
              class="w-full p-3 bg-[#D9D9D9] rounded-3xl outline-none"
              required
            />
            <!-- Forgot Password -->
            <div class="text-center mt-1">
              <a href="#" class="text-blue-600 text-sm hover:underline">Forgot Password?</a>
            </div>
          </div>
  
          <!-- Login Button -->
          <button
            type="submit"
            class="px-12 py-2 bg-[#134611] text-white rounded-[24px] font-semibold hover:bg-[#2f6d0f] transition mx-auto block"
          >
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
  
  const router = useRouter()

  const email = ref('')
  const password = ref('')
  
  const submitLogin = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', {
      email: email.value,
      password: password.value,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })

    console.log('Register sukses:', response.data)
    alert('login berhasil!')
    router.push('/landingpage2')
  } catch (error) {
    console.error('login gagal:', error.response?.data || error.message)
    alert('Terjadi kesalahan saat login.')
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
  