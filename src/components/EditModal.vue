<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-2xl p-8 w-[700px]">
        <div class="flex items-start gap-4 mb-6">
          <img src="/warning-image.png" alt="Warning" class="w-10 h-10 mt-1" />
          <p class="font-bold text-green-900 text-lg leading-tight">
            Apakah anda yakin melakukan perubahan pada data transaksi ini?
          </p>
        </div>
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block text-sm text-gray-600 mb-1">Tanggal dan Jam</label>
            <input type="text" v-model="form.tanggal" class="w-full border-2 border-green-300 rounded-xl px-4 py-2 outline-none" />
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">Nama Petani</label>
            <input type="text" v-model="form.petani" class="w-full border-2 border-green-300 rounded-xl px-4 py-2 outline-none" />
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">Nama Pengepul</label>
            <input type="text" v-model="form.pengepul" class="w-full border-2 border-green-300 rounded-xl px-4 py-2 outline-none" />
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">Total Harga</label>
            <input type="text" v-model="form.harga" class="w-full border-2 border-green-300 rounded-xl px-4 py-2 outline-none" />
          </div>
        </div>
        <div class="flex justify-center gap-6 mt-8">
          <button @click="onCancel" class="bg-sky-500 text-white px-8 py-2 rounded-full font-bold">Batalkan</button>
          <button @click="onSave" class="bg-green-700 text-white px-8 py-2 rounded-full font-bold">Simpan Perubahan</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    show: Boolean,
    form: Object
  })
  
  const emit = defineEmits(['close', 'save'])
  
  const onCancel = () => emit('close')
  const onSave = () => emit('save')
  </script>
  