import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { experienceService } from '@/services/experienceService';

export const useExperiencesStore = defineStore('experiences', () => {
  // State
  const experiences = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  
  // Actions
  async function fetchExperiences() {
    if (experiences.value.length > 0) return;
    
    isLoading.value = true;
    error.value = null;
    
    try {
      const data = await experienceService.getExperiences();
      experiences.value = data;
    } catch (err) {
      console.error('Error fetching experiences:', err);
      error.value = err.message || 'Failed to fetch experiences';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }
  
  async function fetchExperienceById(id) {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Check if we already have the experience in the store
      const foundExperience = experiences.value.find(e => e.id.toString() === id.toString());
      
      if (foundExperience) {
        return foundExperience;
      }
      
      // Fetch from API if not in store
      const data = await experienceService.getExperienceById(id);
      return data;
    } catch (err) {
      console.error(`Error fetching experience with id ${id}:`, err);
      error.value = err.message || 'Failed to fetch experience';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }
  
  async function createExperience(experienceData) {
    isLoading.value = true;
    error.value = null;
    
    try {
      const data = await experienceService.createExperience(experienceData);
      experiences.value.push(data);
      return data;
    } catch (err) {
      console.error('Error creating experience:', err);
      error.value = err.message || 'Failed to create experience';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }
  
  async function updateExperience(experienceData) {
    isLoading.value = true;
    error.value = null;
    
    try {
      const data = await experienceService.updateExperience(experienceData);
      
      // Update in the local array
      const index = experiences.value.findIndex(e => e.id === data.id);
      if (index !== -1) {
        experiences.value[index] = data;
      }
      
      return data;
    } catch (err) {
      console.error(`Error updating experience:`, err);
      error.value = err.message || 'Failed to update experience';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }
  
  async function deleteExperience(id) {
    isLoading.value = true;
    error.value = null;
    
    try {
      await experienceService.deleteExperience(id);
      
      // Remove from local array
      experiences.value = experiences.value.filter(e => e.id !== id);
    } catch (err) {
      console.error(`Error deleting experience with id ${id}:`, err);
      error.value = err.message || 'Failed to delete experience';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }
  
  // Reset store state
  function reset() {
    experiences.value = [];
    isLoading.value = false;
    error.value = null;
  }
  
  return {
    experiences,
    isLoading,
    error,
    fetchExperiences,
    fetchExperienceById,
    createExperience,
    updateExperience,
    deleteExperience,
    reset
  };
});
