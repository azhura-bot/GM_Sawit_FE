<template>
    <div class="min-h-screen bg-gray-50 p-6 space-y-8">
      
      <!-- Statistik Grafik -->
      <div class="bg-white p-6 rounded-2xl shadow-md">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-green-900">Statistik hingga saat ini</h2>
          <div class="flex gap-2">
            <button class="bg-gray-100 px-3 py-1 rounded-full text-sm">🔍 Filter</button>
            <button class="bg-gray-100 px-2 py-1 rounded-full text-sm">◀</button>
            <button class="bg-gray-100 px-2 py-1 rounded-full text-sm">▶</button>
          </div>
        </div>
        <div class="h-40 bg-gradient-to-t from-green-200 to-white rounded-md"></div>
        <!-- Grafik Dummy -->
      </div>
  
      <!-- Presentase Kenaikan & Penurunan -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Kenaikan -->
        <div class="bg-lime-100 p-6 rounded-2xl shadow-md relative">
          <div class="absolute top-4 right-4">
            <button class="bg-white px-3 py-1 rounded-full text-sm">🔍 Filter</button>
          </div>
          <h3 class="text-xl font-bold text-green-900 mb-2">Presentase Kenaikan</h3>
          <div class="text-4xl font-extrabold text-green-900 mb-4">12%</div>
          <div class="h-20 bg-green-300 rounded-md"></div>
        </div>
  
        <!-- Penurunan -->
        <div class="bg-lime-100 p-6 rounded-2xl shadow-md relative">
          <div class="absolute top-4 right-4">
            <button class="bg-white px-3 py-1 rounded-full text-sm">🔍 Filter</button>
          </div>
          <h3 class="text-xl font-bold text-green-900 mb-2">Presentase Penurunan</h3>
          <div class="text-4xl font-extrabold text-green-900 mb-4">5%</div>
          <div class="h-20 bg-green-300 rounded-md"></div>
        </div>
      </div>
  
      <!-- Form Manajemen Harga -->
      <div class="bg-white p-6 rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <!-- Info & Input -->
        <div class="space-y-6">
          <div class="flex items-center gap-3">
            <div class="bg-green-900 text-white p-3 rounded-xl text-xl">💵</div>
            <h3 class="text-2xl font-bold text-green-900">Manajemen Data Harga Kelapa Sawit</h3>
          </div>
  
          <div class="flex gap-3">
            <button class="bg-green-700 text-white px-4 py-2 rounded-full font-semibold">Kenaikan</button>
            <button class="bg-gray-200 text-green-900 px-4 py-2 rounded-full font-semibold">Penurunan</button>
          </div>
  
          <div class="space-y-4">
            <input type="text" placeholder="Harga per Kg" class="w-full p-3 rounded-full bg-gray-200 focus:outline-none" />
            <input type="text" placeholder="Harga kenaikan" class="w-full p-3 rounded-full bg-gray-200 focus:outline-none" />
            <input type="text" placeholder="Presentase Kenaikan" class="w-full p-3 rounded-full bg-gray-200 focus:outline-none" />
          </div>
  
          <button class="bg-green-700 text-white px-6 py-3 rounded-full font-bold">Masukan Data</button>
        </div>
  
        <!-- Kalender Dummy -->
        <div>
          <label class="font-semibold text-green-900 mb-2 block">Tanggal Input Harga</label>
          <div class="bg-white border rounded-xl shadow-md p-4">
            <div class="font-bold text-lg mb-2">Month 2000</div>
            <div class="grid grid-cols-7 text-center text-sm gap-y-1">
              <div class="text-gray-400">Mon</div>
              <div class="text-gray-400">Tue</div>
              <div class="text-gray-400">Wed</div>
              <div class="text-gray-400">Thu</div>
              <div class="text-gray-400">Fri</div>
              <div class="text-gray-400">Sat</div>
              <div class="text-gray-400">Sun</div>
              <!-- Angka Dummy -->
              <div class="text-gray-400">28</div>
              <div class="text-gray-400">29</div>
              <div class="text-gray-400">30</div>
              <div class="text-gray-400">31</div>
              <div>1</div><div>2</div><div>3</div>
              <div>4</div><div>5</div><div>6</div><div>7</div><div>8</div><div>9</div><div>10</div>
              <div>11</div><div>12</div><div>13</div><div>14</div><div>15</div><div>16</div><div>17</div>
              <div>18</div><div>19</div><div>20</div><div>21</div><div>22</div><div>23</div><div>24</div>
              <div>25</div><div>26</div><div>27</div><div>28</div><div>29</div><div>30</div><div>31</div>
            </div>
          </div>
        </div>
      </div>
  
    </div>
  </template>
  
  <script>
export default {
  name: "StatistikHarga",
};
</script>

<style scoped>
/* Tambahan jika perlu kustomisasi style lebih lanjut */
</style>