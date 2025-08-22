import type { Place } from '../../../shared/types/place.types.ts'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export const placesApi = {
  async getAll(): Promise<Place[]> {
    const response = await axios.get(`${API_BASE_URL}/places`)
    return response.data
  },
}
