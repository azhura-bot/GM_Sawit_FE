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

// Props untuk menerima id artikel yang mau dihapus
const props = defineProps({
  artikelId: {
    type: Number,
    required: true
  }
})

// Emit untuk kasih tahu parent
const emit = defineEmits(['close', 'deleted'])

const API_URL = import.meta.env.VITE_API_URL 

const deleteArtikel = async () => {
  try {
    await axios.delete(`${API_URL}/api/artikel/${props.artikelId}`)
    emit('deleted') 
    emit('close')  
  } catch (error) {
    console.error('Gagal menghapus artikel:', error)
    alert('Gagal menghapus artikel!')
  }
}
</script>

