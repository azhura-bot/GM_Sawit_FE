<template>
  <div
    class="w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-start justify-center pt-24 px-4"
    style="background-image: url('/sawit1.png')"
  >


    <div class="relative z-10 bg-white bg-opacity-90 p-8 rounded-3xl w-full max-w-md shadow-lg">
      <h1 class="text-4xl font-bold text-center mb-6 text-[#134611]">Register</h1>

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
          <label class="block text-sm font-semibold mb-1 text-[#134611]">Nomor Telepon</label>
          <input
            type="tel"
            v-model="no_phone"
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
          class="px-12 py-2 bg-[#134611] text-white rounded-[24px] font-semibold hover:bg-[#2f6d0f] transition mx-auto block"
        >
          Next
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

const name = ref('')
const no_phone = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const submitForm = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/register', {
      name: name.value,
      no_phone: no_phone.value,
      email: email.value,
      password: password.value,
      password_confirmation: password.value,
    }, {
      headers: {
        'Content-Type': 'application/json',  // pastikan konten yang dikirim sesuai
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
