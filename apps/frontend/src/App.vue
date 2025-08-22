<script setup lang="ts">
import PlacesList from '@/components/PlacesList.vue'
import { GoogleMap, AdvancedMarker } from 'vue3-google-map'

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const useMap = true

function logHelp() {
  console.log('clicked')
}
</script>

<template>
  <main>
    <h1>Maps</h1>
    <PlacesList />
    <button @click="logHelp">Button</button>
    >
    <div v-if="useMap">
      <GoogleMap
        :api-key="apiKey"
        style="width: 100%; height: 500px"
        :center="{ lat: 0, lng: 0 }"
        :zoom="15"
        map-id="main_map"
      >
        <AdvancedMarker :options="{ position: { lat: 0, lng: 0 } }" />
      </GoogleMap>
    </div>
  </main>
</template>

<style scoped></style>
