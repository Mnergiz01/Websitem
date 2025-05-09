import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { profileService } from '@/services/profileService';

export const useProfileStore = defineStore('profile', () => {
  // State
  const profile = ref({});
  const isLoading = ref(false);
  const error = ref(null);
  const isLoaded = ref(false);
  
  // Actions
  async function fetchProfile() {
    if (isLoaded.value) return profile.value;
    
    isLoading.value = true;
    error.value = null;
    
    try {
      const data = await profileService.getProfile();
      profile.value = data;
      isLoaded.value = true;
      return data;
    } catch (err) {
      console.error('Error fetching profile:', err);
      error.value = err.message || 'Failed to fetch profile';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }
  
  async function updateProfile(profileData) {
    isLoading.value = true;
    error.value = null;
    
    try {
      const data = await profileService.updateProfile(profileData);
      profile.value = data;
      return data;
    } catch (err) {
      console.error('Error updating profile:', err);
      error.value = err.message || 'Failed to update profile';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }
  
  // Reset store state
  function reset() {
    profile.value = {};
    isLoading.value = false;
    error.value = null;
    isLoaded.value = false;
  }
  
  return {
    profile,
    isLoading,
    error,
    isLoaded,
    fetchProfile,
    updateProfile,
    reset
  };
});
