<template>
    <div class="main-container">
      <!-- Header -->
      <header class="header flex items-center p-4 bg-white shadow">
      <router-link to="/profile" class="inline-block mr-3">
        <img
          v-if="user.photo"
          :src="user.photo"
          alt="Foto Profil"
          class="circle"
        />
        <div v-else class="circle placeholder"></div>
      </router-link>
      <span class="username font-semibold text-white-800">
        {{ user.name || 'nama User' }}
      </span>
    </header>
  
      <!-- Content -->
      <main class="content">
        <!-- Profile Section -->
        <div class="profile-section">
          <img src="@/assets/jay.jpg" alt="Profile" class="profile-picture" />
          <!-- Nama di bawah foto dihapus sesuai permintaan -->
        </div>
  
        <!-- Form Section -->
        <form class="form-section" @submit.prevent="saveProfile">
          <!-- Instruction Title -->
          <h2 class="instruction-title">Edit Profil</h2>
  
          <div class="form-group">
            <label class="form-label">Nama</label>
            <input type="text" v-model="profile.nama" placeholder="Masukkan Nama" required />
          </div>
  
          <div class="form-group">
            <label class="form-label">Nomor Telepon</label>
            <input type="text" v-model="profile.nomorTelepon" placeholder="Masukkan Nomor Telepon" required />
          </div>
  
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" v-model="profile.email" placeholder="Masukkan Email" required />
          </div>
  
          <div class="form-group">
            <label class="form-label">Alamat</label>
            <input type="text" v-model="profile.alamat" placeholder="Masukkan Alamat" required />
          </div>
  
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" v-model="profile.password" placeholder="Masukkan Password Baru" required />
          </div>
  
          <!-- Buttons -->
          <div class="button-group">
            <button type="button" class="cancel-button" @click="cancelEdit">Cancel</button>
            <button type="submit" class="save-button">Simpan</button>
          </div>
        </form>
      </main>
    </div>
</template>
  
<script>
  export default {
    name: 'EditProfilePengepulView',
    data() {
      return {
        profile: {
          nama: 'Udin Suyonto',
          nomorTelepon: '08123456789',
          email: 'udin.suyonto@email.com',
          alamat: 'Jl. Anggrek No. 99',
          password: 'passwordlama'
        }
      }
    },
    methods: {
      cancelEdit() {
        this.$router.push('/profile-pengepul');
      },
      saveProfile() {
        console.log('Data setelah edit:', this.profile);
        this.$router.push('/profile-pengepul');
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
    border-radius: 16px 16px 16px 16px;
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
  
  .form-section {
    background: #ebf7da;
    width: 100%;
    padding: 16px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
  }
  
  .instruction-title {
    color: #134611;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 16px;
   text-align: center;
  }
  
  .form-group {
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
  }
  
  .form-label {
    color: #388e3c;
    font-size: 14px;
    margin-bottom: 6px;
    font-weight: 600;
  }
  
  input {
    width: 100%;
    padding: 10px 16px;
    border-radius: 24px;
    outline: none;
    font-size: 14px;
    background-color: white;
    color: #134611;
  }
  
  input::placeholder {
    color: #999;
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }
  
  .cancel-button {
    background-color: #4b8116;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 24px;
    font-weight: bold;
    cursor: pointer;
    width: 45%;
  }
  
  .save-button {
    background-color: #0095da;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 24px;
    font-weight: bold;
    cursor: pointer;
    width: 45%;
  }
</style>
  