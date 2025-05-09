import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { skillService } from '@/services/skillService';

export const useSkillsStore = defineStore('skills', () => {
  // State
  const skills = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  
  // Actions
  async function fetchSkills() {
    if (skills.value.length > 0) return;
    
    isLoading.value = true;
    error.value = null;
    
    try {
      const data = await skillService.getSkills();
      skills.value = data;
    } catch (err) {
      console.error('Error fetching skills:', err);
      error.value = err.message || 'Failed to fetch skills';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }
  
  async function fetchSkillById(id) {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Check if we already have the skill in the store
      const foundSkill = skills.value.find(s => s.id.toString() === id.toString());
      
      if (foundSkill) {
        return foundSkill;
      }
      
      // Fetch from API if not in store
      const data = await skillService.getSkillById(id);
      return data;
    } catch (err) {
      console.error(`Error fetching skill with id ${id}:`, err);
      error.value = err.message || 'Failed to fetch skill';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }
  
  async function createSkill(skillData) {
    isLoading.value = true;
    error.value = null;
    
    try {
      const data = await skillService.createSkill(skillData);
      skills.value.push(data);
      return data;
    } catch (err) {
      console.error('Error creating skill:', err);
      error.value = err.message || 'Failed to create skill';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }
  
  async function updateSkill(skillData) {
    isLoading.value = true;
    error.value = null;
    
    try {
      const data = await skillService.updateSkill(skillData);
      
      // Update in the local array
      const index = skills.value.findIndex(s => s.id === data.id);
      if (index !== -1) {
        skills.value[index] = data;
      }
      
      return data;
    } catch (err) {
      console.error(`Error updating skill:`, err);
      error.value = err.message || 'Failed to update skill';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }
  
  async function deleteSkill(id) {
    isLoading.value = true;
    error.value = null;
    
    try {
      await skillService.deleteSkill(id);
      
      // Remove from local array
      skills.value = skills.value.filter(s => s.id !== id);
    } catch (err) {
      console.error(`Error deleting skill with id ${id}:`, err);
      error.value = err.message || 'Failed to delete skill';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }
  
  // Reset store state
  function reset() {
    skills.value = [];
    isLoading.value = false;
    error.value = null;
  }
  
  return {
    skills,
    isLoading,
    error,
    fetchSkills,
    fetchSkillById,
    createSkill,
    updateSkill,
    deleteSkill,
    reset
  };
});
