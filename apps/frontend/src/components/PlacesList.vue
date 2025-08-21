<script setup lang="ts">
import { placesApi } from '@/services/places.api.ts'
import { onMounted, ref } from 'vue';
import type { Place } from '../../../shared/types/place.types.ts';

const places = ref<Place[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const loadPlaces = async () => {
  try {
    loading.value = true
    error.value = null
    places.value = await placesApi.getAll() // TODO: tightly coupled, replace
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load places'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadPlaces()
})
</script>

<template>
  <div class="places-list">
    <h2>Places visited</h2>
    <div v-if="loading" class="loading">Loading …</div>
    <div v-else-if="error" class="error">Error {{ error }}</div>
    <div v-else-if="places.length === 0" class="empty-state">No places visited yet.</div>
    <ul v-else class="places">
      <li v-for="place in places" :key="place.id" class="place-item">
        <h3>{{ place.name }}</h3>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
