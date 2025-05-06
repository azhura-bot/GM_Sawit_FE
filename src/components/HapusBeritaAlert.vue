<!-- components/HapusBeritaAlert.vue -->
<template>
  <dialog id="hapusModal" class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg text-green-600">Yakin ingin menghapus artikel ini?</h3>
      <p class="py-4">Tindakan ini tidak bisa dibatalkan.</p>
      <div class="modal-action">
        <button @click="$emit('close')" class="btn btn-ghost">Batal</button>
        <button @click="deleteArtikel" class="btn btn-error text-white">Hapus</button>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

// Props untuk menerima id artikel yang akan dihapus
const props = defineProps({
  artikelId: {
    type: Number,
    required: true
  }
})

// Emit untuk memberi tahu parent
const emit = defineEmits(['close', 'deleted'])

const API_URL = import.meta.env.VITE_API_URL

// Fungsi untuk menghapus artikel
const deleteArtikel = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      console.warn('Token tidak ditemukan, silakan login terlebih dahulu.')
      return
    }

    const response = await axios.delete(`${API_URL}/api/artikel/${props.artikelId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    emit('deleted')  // Emit event ke parent setelah berhasil dihapus
    emit('close')    // Tutup modal
  } catch (error) {
    console.error('Gagal menghapus artikel:', error)
    alert('Gagal menghapus artikel!')
  }
}
</script>
