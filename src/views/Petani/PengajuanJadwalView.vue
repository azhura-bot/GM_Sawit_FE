<template>
  <div class="fixed top-0 left-1/2 transform -translate-x-1/2 w-[720px] h-[1612px] bg-[#eaffe0] shadow-lg rounded-[40px] overflow-hidden flex flex-col">
    <!-- Form Section -->
    <div class="flex-1 flex flex-col px-10 py-8">
      <div class="flex-grow">
        <p class="text-2xl font-bold text-[#113b00] mb-6">
          Masukan data anda pada form dibawah ini
        </p>

        <form class="space-y-6">
          <input type="text" placeholder="Nama Petani" class="input input-bordered w-full rounded-full" />
          <input type="text" placeholder="Nomor Telephone" class="input input-bordered w-full rounded-full" />
          <input type="email" placeholder="Email" class="input input-bordered w-full rounded-full" />
          <input type="date" placeholder="Tanggal Pengambilan" class="input input-bordered w-full rounded-full" />
          <input type="text" placeholder="Alamat" class="input input-bordered w-full rounded-full" />
          <input type="number" placeholder="Jumlah" class="input input-bordered w-full rounded-full" />
        </form>
      </div>

      <!-- Button Section -->
      <div class="flex justify-between mt-8">
        <button class="btn w-[48%] bg-[#00A3FF] text-white text-lg font-bold rounded-full">Cancel</button>
        <button class="btn w-[48%] bg-[#2F8600] text-white text-lg font-bold rounded-full">Kirim</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// tidak ada script khusus
</script>

<style scoped>
body {
  margin: 0;
  background: #c6f7c4; /* agar terlihat latar belakang di luar frame mobile */
}
</style>
