<!-- components/HapusBeritaAlert.vue -->
<template>
    <dialog id="hapusModal" class="modal modal-open">
      <div class="modal-box">
        <h3 class="font-bold text-lg text-green-900">Yakin ingin menghapus artikel ini?</h3>
        <p class="py-4">Tindakan ini tidak bisa dibatalkan.</p>
        <div class="modal-action">
          <button @click="$emit('close')" class="btn btn-ghost">Batal</button>
          <button class="btn btn-error text-white">Hapus</button>
        </div>
      </div>
    </dialog>
  </template>
  
  <script setup>
  // emit close ke parent saat batal
  </script>
  