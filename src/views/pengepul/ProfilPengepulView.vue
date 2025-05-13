<template>
  <div class="main-container">
    <header class="header">
      <router-link to="/profile-pengepul" class="circle"></router-link>
      <span class="username">{{ profile.name || 'Lorem Ipsum' }}</span>
    </header>

    <main class="content">
      <div class="profile-section">
        <img :src="imagePreview || profile.photo || defaultPhoto" alt="Profile" class="profile-picture" />
      </div>

      <section class="info-section">
        <p class="info-instruction">Informasi Profil</p>

        <div class="info-group">
          <label>Nama</label>
          <input v-if="isEditing" v-model="profile.name" class="info-value" />
          <div v-else class="info-value">{{ profile.name }}</div>
        </div>

        <div class="info-group">
          <label>Nomor Telepon</label>
          <input v-if="isEditing" v-model="profile.no_phone" class="info-value" type="number"/>
          <div v-else class="info-value">{{ profile.no_phone || 'Tidak ada Nomor Telepon'}}</div>
        </div>

        <div class="info-group">
          <label>Email</label>
          <input v-if="isEditing" v-model="profile.email" class="info-value" />
          <div v-else class="info-value">{{ profile.email }}</div>
        </div>

        <div v-if="isEditing" class="info-group">
          <label>Photo</label>
          <input type="file" @change="handleFileUpload" class="info-value" />
        </div>


        <div class="button-group">
          <button class="edit-button" @click="isEditing ? saveProfile() : toggleEdit()">
            {{ isEditing ? 'Simpan' : 'Edit Profil' }}
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import defaultPhoto from '@/assets/jay.jpg'

export default {
  name: 'ProfilePengepulView',
  data() {
    return {
      isEditing: false,
      profile: {
        name: '',
        no_phone: '',
        email: '',
        photo: '',
        photoFile: null
      },
      imagePreview: null,
      defaultPhoto,
      apiUrl: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'
    }
  },
  mounted() {
    this.fetchProfile()
  },
  methods: {
    async fetchProfile() {
      const token = localStorage.getItem('token')
      if (!token) {
        console.warn('Token tidak tersedia.')
        return
      }

      try {
        const response = await axios.get(`${this.apiUrl}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const data = response.data.data || response.data

        this.profile = {
          ...this.profile,
          name: data.name || '',
          no_phone: data.no_phone || '',
          email: data.email || '',
          photo: data.photo ? `${this.apiUrl}/storage/${data.photo}` : defaultPhoto
        }

        // Simpan juga ke localStorage agar konsisten dengan komponen lain
        localStorage.setItem('user', JSON.stringify(data))
      } catch (error) {
        console.error('Gagal mengambil data profil:', error)
        if (error.response?.status === 401) {
          alert('Sesi login berakhir. Silakan login kembali.')
          localStorage.removeItem('token')
          this.$router.push('/login')
        }
      }
    },

    toggleEdit() {
      this.isEditing = true
    },

    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.profile.photoFile = file
        this.imagePreview = URL.createObjectURL(file)
      }
    },

    async saveProfile() {
      const token = localStorage.getItem('token')
      const formData = new FormData()
      formData.append('_method', 'PUT')
      formData.append('name', this.profile.name)
      formData.append('no_phone', this.profile.no_phone)
      formData.append('email', this.profile.email)

      if (this.profile.photoFile) {
        formData.append('photo', this.profile.photoFile)
      }

      try {
        const response = await axios.post(`${this.apiUrl}/api/profile`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        })

        const updatedData = response.data.data
        this.isEditing = false
        this.imagePreview = null

        // Perbarui tampilan dan simpan ke localStorage
        this.fetchProfile()
        localStorage.setItem('user', JSON.stringify(updatedData))
      } catch (error) {
        const msg = error.response?.data?.message || 'Terjadi kesalahan saat menyimpan.'
        console.error(msg)
        alert('Gagal menyimpan profil: ' + msg)
      }
    }
  }
}
</script>




<style scoped>
  .main-container {
    background-color: #e6f7cf;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .header {
    background-color: #164b1b;
    width: 100%;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    position: sticky;
    top: 0;
    z-index: 10;
  }
  
  .circle {
    width: 24px;
    height: 24px;
    background-color: white;
    border-radius: 50%;
    margin-right: 8px;
    cursor: pointer;
  }
  
  .username {
    font-weight: bold;
  }
  
  .content {
    background: white;
    margin-top: 12px;
    width: 100%;
    max-width: 430px;
    border-radius: 16px 16px  16px 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .profile-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 16px;
  }
  
  .profile-picture {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 8px;
  }
  
  .profile-name {
    font-size: 20px;
    font-weight: bold;
    color: #134611;
  }
  
  .info-section {
    background: #ebf7da;
    width: 100%;
    padding: 16px;
    border-radius: 16px;
  }
  
  .info-instruction {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 16px;
    color: #134611;
    text-align: center;
  }
  
  .info-group {
    margin-bottom: 12px;
  }
  
  label {
    font-size: 14px;
    font-weight: bold;
    color: #388e3c;
    margin-bottom: 4px;
    display: block;
  }
  
  .info-value {
    background: white;
    padding: 10px;
    border-radius: 16px;
    color: #134611;
    font-size: 14px;
  }
  
  .button-group {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }
  
  .edit-button {
    background-color: #388e3c;
    border: none;
    padding: 10px 20px;
    border-radius: 16px;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
</style>
