<template>
  <div class="flex flex-col md:flex-row h-full min-h-screen bg-gray-50">
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet/dist/leaflet.css"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.css"
    />

    <!-- Kiri: Konten -->
    <div class="flex-1 p-6 space-y-6">
      <!-- Statistik -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-lime-100 p-6 rounded-2xl shadow-md text-center">
          <h2 class="text-green-900 font-bold mb-4">Task Total</h2>
          <div class="text-5xl font-extrabold text-green-900">{{ stats.total }}</div>
        </div>
        <div class="bg-green-300 p-6 rounded-2xl shadow-md text-center">
          <h2 class="text-green-900 font-bold mb-4">Ongoing Total</h2>
          <div class="text-5xl font-extrabold text-green-900">{{ stats.ongoing }}</div>
        </div>
        <div class="bg-green-700 p-6 rounded-2xl shadow-md text-center">
          <h2 class="text-white font-bold mb-4">Task Completed</h2>
          <div class="text-5xl font-extrabold text-white">{{ stats.completed }}</div>
        </div>
      </div>

      <!-- Filter Badge -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-pink-200 text-pink-900 px-4 py-2 rounded-full font-semibold text-center w-full">
          Task yang belum dikerjakan <span class="ml-2 bg-white px-2 py-1 rounded-full">{{ stats.pending }}</span>
        </div>
        <div class="bg-lime-100 text-green-900 px-4 py-2 rounded-full font-semibold text-center w-full">
          Task yang sudah dikerjakan <span class="ml-2 bg-white px-2 py-1 rounded-full">{{ stats.completed }}</span>
        </div>
        <div class="bg-blue-100 text-blue-900 px-4 py-2 rounded-full font-semibold text-center w-full">
          Task yang sedang dikerjakan <span class="ml-2 bg-white px-2 py-1 rounded-full">{{ stats.ongoing }}</span>
        </div>
      </div>

      <!-- List Tugas -->
      <div class="space-y-4">
        <div
          v-for="task in tasks"
          :key="task.id"
          class="bg-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
        >
          <div>
            <h3 class="font-bold text-green-900">{{ task.pengepul.name }}</h3>
            <div class="flex">
              <span class="font-semibold text-green-900 w-32">{{ task.janji_temu.nama_petani }}</span>
            </div>
          </div>
          <span
            class="mt-2 sm:mt-0 px-3 py-1 rounded-full font-medium"
            :class="badgeClass(task.status)"
          >
            {{ statusLabel(task.status) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Kanan: Map -->
    <div class="w-full md:w-1/3 p-4 sticky top-0 h-[100vh]">
      <div id="map" class="w-full h-full rounded-2xl overflow-hidden shadow-md"></div>
    </div>
  </div>
</template>

<script setup>
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { ref, onMounted, nextTick, computed } from 'vue';
import axios from 'axios';

const tasks = ref([]);

const stats = computed(() => {
  const total = tasks.value.length;
  const pending = tasks.value.filter(t => t.status === 'pending').length;
  const accepted = tasks.value.filter(t => t.status === 'accepted').length;
  const inProgress = tasks.value.filter(t => t.status === 'in_progress').length;
  const completed = tasks.value.filter(t => t.status === 'completed').length;
  return {
    total,
    pending,
    ongoing: inProgress,
    completed,
    accepted
  };
});

const statusLabel = status => {
  switch (status) {
    case 'pending': return 'Menunggu';
    case 'accepted': return 'Diterima';
    case 'rejected': return 'Ditolak';
    case 'in_progress': return 'Sedang dikerjakan';
    case 'completed': return 'Selesai';
    default: return 'Status tidak diketahui';
  }
};

const badgeClass = status => {
  return {
    'bg-blue-100 text-blue-900': status === 'pending',
    'bg-lime-100 text-green-900': status === 'accepted',
    'bg-red-100 text-red-900': status === 'rejected',
    'bg-blue-300 text-blue-900': status === 'in_progress',
    'bg-yellow-100 text-yellow-900': status === 'completed'
  };
};

// Code menampilkan map dan markernya 
const getMarkerIcon = status => {
  let iconUrl = '';
  switch (status) {
    case 'pending': iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png'; break;
    case 'accepted': iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png'; break;
    case 'rejected': iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png'; break;
    case 'in_progress': iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png'; break;
    case 'completed': iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png'; break;
    default: iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
  }
  return L.icon({ iconUrl, iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png', shadowSize: [41, 41] });
};

const initMap = () => {
  const map = L.map('map').setView([-6.5985, 106.7931], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' }).addTo(map);

  tasks.value.forEach(task => {
    const latP = parseFloat(task.janji_temu.latitude);
    const lngP = parseFloat(task.janji_temu.longitude);
    const latC = parseFloat(task.pul_latitude);
    const lngC = parseFloat(task.pul_longitude);

    // Marker petani
    L.marker([latP, lngP], { icon: getMarkerIcon(task.status) }).addTo(map)
      .bindPopup(`<strong>Petani:</strong> ${task.janji_temu.nama_petani}`);

    // Marker pengepul
    if (!isNaN(latC) && !isNaN(lngC)) {
      L.marker([latC, lngC], { icon: getMarkerIcon('rejected') }) // gunakan warna merah untuk pengepul
        .addTo(map)
        .bindPopup(`<strong>Pengepul:</strong> ${task.pengepul.name}`);

      // Routing jika in_progress
      if (task.status === 'in_progress') {
        L.Routing.control({
          waypoints: [L.latLng(latC, lngC), L.latLng(latP, lngP)],
          lineOptions: { styles: [{ color: 'green', weight: 4, opacity: 0.7 }] },
          draggableWaypoints: false,
          addWaypoints: false,
          createMarker: () => null
        }).addTo(map);
      }
    }
  });
};

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8000/api/task', { headers: { Authorization: `Bearer ${token}` } });
    if (response.data.success) {
      tasks.value = response.data.data;
      await nextTick();
      initMap();
    } else {
      console.error('Data tidak valid:', response.data);
    }
  } catch (err) {
    console.error('Gagal memuat data:', err);
  }
});
</script>

<style scoped>
#map {
  height: 100%;
}
</style>
