<template>
  <div class="flex flex-col md:flex-row h-full min-h-screen bg-gray-50">
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.css" />

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

      <!-- Filter Status -->
      <div class="flex justify-end">
        <select v-model="selectedStatus" class="order border-gray-300 rounded p-2 text-white bg-[#134611]">
          <option value="">Semua Status</option>
          <option value="pending">Menunggu</option>
          <option value="in_progress">Sedang Dikerjakan</option>
          <option value="completed">Selesai</option>
        </select>
      </div>

      <!-- List Tugas -->
      <div class="space-y-4">
        <div
          v-for="task in filteredTasks"
          :key="task.id"
          class="bg-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
        >
          <div>
            <div class="font-bold text-green-900 text-lg">{{ task.nama_task }}</div>
            <div class="text-green-900">Pengepul: <span class="font-semibold">{{ task.pengepul.name }}</span></div>
            <div class="text-green-900">Petani: <span class="font-semibold">{{ task.janji_temu.nama_petani }}</span></div>
            <div class="text-sm text-gray-500">
              {{ formatDate(task.janji_temu.tanggal) }} {{ formatTime(task.janji_temu.tanggal) }}
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

    <!-- Kanan: Map (tanpa UI tambahan) -->
    <div class="w-full md:w-1/3 p-4 sticky top-0 h-[100vh] relative">
      <div id="map" class="w-full h-full rounded-2xl overflow-hidden shadow-md"></div>
      <!-- Legend -->
      <div class="absolute bottom-4 right-4 bg-white bg-opacity-90 rounded-xl shadow p-3 flex flex-col gap-2 z-10 min-w-[160px]">
        <div class="flex items-center gap-2">
          <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png" width="20" height="32" alt="Pengepul/Ditolak" />
          <span class="text-sm text-gray-800">Pengepul</span>
        </div>
        <div class="flex items-center gap-2">
          <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png" width="20" height="32" alt="Selesai/Accepted" />
          <span class="text-sm text-gray-800">Selesai</span>
        </div>
        <div class="flex items-center gap-2">
          <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png" width="20" height="32" alt="Sedang Dikerjakan" />
          <span class="text-sm text-gray-800">Sedang Dikerjakan</span>
        </div>
        <div class="flex items-center gap-2">
          <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png" width="20" height="32" alt="Pending" />
          <span class="text-sm text-gray-800">Menunggu</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { ref, onMounted, nextTick, computed, watch } from 'vue';
import axios from 'axios';

const tasks = ref([]);
const selectedStatus = ref('');
let mapInstance = null;
let markerLayerGroup = null;
let routingControls = [];

const stats = computed(() => {
  const total = tasks.value.length;
  const pending = tasks.value.filter(t => t.status === 'pending').length;
  const inProgress = tasks.value.filter(t => t.status === 'in_progress').length;
  const completed = tasks.value.filter(t => t.status === 'completed').length;
  return { total, pending, ongoing: inProgress, completed };
});

const statusOrder = { pending: 0, in_progress: 1, completed: 2 };
const filteredTasks = computed(() => {
  let list = tasks.value;
  if (selectedStatus.value) {
    list = list.filter(t => t.status === selectedStatus.value);
  }
  return [...list].sort((a, b) => {
    return (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99);
  });
});

const formatDate = (datetime) => {
  if (!datetime) return ''
  try {
    return new Date(datetime).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return ''
  }
}

// Format jam
const formatTime = (datetime) => {
  if (!datetime) return ''
  const str = datetime.replace('T', ' ')
  const parts = str.split(' ')
  if (parts.length < 2) return ''
  const timePart = parts[1]
  const [hour, minute] = timePart.split(':')
  return `${hour.padStart(2,'0')}:${minute.padStart(2,'0')}`
}

const statusLabel = status => ({ 'pending':'Menunggu','accepted':'Diterima','rejected':'Ditolak','in_progress':'Sedang dikerjakan','completed':'Selesai' }[status]||'Unknown');
const badgeClass = status => ({
  'bg-gray-300 text-gray-800': status==='pending',
  'bg-blue-300 text-blue-900': status==='in_progress',
  'bg-green-500 text-white': status==='completed',
  'bg-lime-100 text-green-900': status==='accepted',
  'bg-red-100 text-red-900': status==='rejected'
});

const getMarkerIcon = status => {
  const urls = {
    pending: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
    in_progress: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    completed: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    accepted:'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    rejected:'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png'
  };
  return L.icon({ iconUrl: urls[status]||L.Icon.Default.prototype.options.iconUrl, iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowUrl:L.Icon.Default.prototype.options.shadowUrl,shadowSize:[41,41] });
};

const clearMap = () => {
  if (markerLayerGroup) markerLayerGroup.clearLayers();
  routingControls.forEach(ctrl => ctrl.remove());
  routingControls = [];
};

const renderMarkers = () => {
  clearMap();
  filteredTasks.value.forEach(task => {
    const latP = +task.janji_temu.latitude;
    const lngP = +task.janji_temu.longitude;
    const latC = +task.pul_latitude;
    const lngC = +task.pul_longitude;

    // Marker Petani (tampilkan selalu ketika filter completed)
    if (task.status === 'completed' || task.status !== 'completed') {
      if (!markerLayerGroup) markerLayerGroup = L.layerGroup().addTo(mapInstance);
      L.marker([latP, lngP], { icon: getMarkerIcon(task.status) })
        .bindPopup(`<strong>Task:</strong> ${task.nama_task}<br><strong>Petani:</strong> ${task.janji_temu.nama_petani}<br><strong>Waktu:</strong> ${formatDate(task.janji_temu.tanggal)} ${formatTime(task.janji_temu.tanggal)}`)
        .addTo(markerLayerGroup);
    }

    // Marker Pengepul: hanya ketika bukan completed
    if (task.status !== 'completed' && !isNaN(latC) && !isNaN(lngC)) {
      L.marker([latC, lngC], { icon: getMarkerIcon('rejected') })
        .bindPopup(`<strong>Pengepul:</strong> ${task.pengepul.name}`)
        .addTo(markerLayerGroup);

      // Routing hanya untuk in_progress
      if (task.status === 'in_progress') {
        const ctrl = L.Routing.control({
          waypoints: [L.latLng(latC, lngC), L.latLng(latP, lngP)],
          lineOptions: { styles: [{ weight: 4, opacity: 0.7 }] },
          show: false,
          showAlternatives: false,
          draggableWaypoints: false,
          addWaypoints: false,
          routeWhileDragging: false,
          fitSelectedRoutes: false,
          collapsible: true,
          createMarker: () => null
        }).addTo(mapInstance);
        routingControls.push(ctrl);
      }
    }
  });
};

const initMap = () => {
  mapInstance = L.map('map').setView([-6.5985, 106.7931], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' })
    .addTo(mapInstance);
  renderMarkers();
};

onMounted(async () => {
  try {
    const res = await axios.get('https://api.ecopalm.ydns.eu/api/task', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    if (res.data.success) {
      tasks.value = res.data.data;
      await nextTick();
      initMap();
    }
  } catch (e) {
    console.error(e);
  }
});

watch(selectedStatus, () => renderMarkers());
</script>

<style>
#map {
  height: 100%;
  z-index: 1;
}
.leaflet-routing-container {
  display: none !important;
}
.legend-map {
  z-index: 10;
  pointer-events: auto;
}
</style>
