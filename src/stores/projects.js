import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { projectService } from '@/services/projectService';

export const useProjectsStore = defineStore('projects', () => {
  // State
  const projects = ref([]);
  const currentProject = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  
  // Actions
  async function fetchProjects() {
    if (projects.value.length > 0) return;
    
    isLoading.value = true;
    error.value = null;
    
    try {
      const data = await projectService.getProjects();
      projects.value = data;
    } catch (err) {
      console.error('Error fetching projects:', err);
      error.value = err.message || 'Failed to fetch projects';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }
  
  async function fetchProjectById(id) {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Check if we already have the project in the store
      const foundProject = projects.value.find(p => p.id.toString() === id.toString());
      
      if (foundProject) {
        currentProject.value = foundProject;
        return foundProject;
      }
      
      // Fetch from API if not in store
      const data = await projectService.getProjectById(id);
      currentProject.value = data;
      return data;
    } catch (err) {
      console.error(`Error fetching project with id ${id}:`, err);
      error.value = err.message || 'Failed to fetch project';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }
  
  async function createProject(projectData) {
    isLoading.value = true;
    error.value = null;
    
    try {
      const data = await projectService.createProject(projectData);
      projects.value.push(data);
      return data;
    } catch (err) {
      console.error('Error creating project:', err);
      error.value = err.message || 'Failed to create project';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }
  
  async function updateProject(projectData) {
    isLoading.value = true;
    error.value = null;
    
    try {
      const data = await projectService.updateProject(projectData);
      
      // Update in the local array
      const index = projects.value.findIndex(p => p.id === data.id);
      if (index !== -1) {
        projects.value[index] = data;
      }
      
      // Update current project if it's the same
      if (currentProject.value && currentProject.value.id === data.id) {
        currentProject.value = data;
      }
      
      return data;
    } catch (err) {
      console.error(`Error updating project:`, err);
      error.value = err.message || 'Failed to update project';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }
  
  async function deleteProject(id) {
    isLoading.value = true;
    error.value = null;
    
    try {
      await projectService.deleteProject(id);
      
      // Remove from local array
      projects.value = projects.value.filter(p => p.id !== id);
      
      // Clear current project if it's the same
      if (currentProject.value && currentProject.value.id === id) {
        currentProject.value = null;
      }
    } catch (err) {
      console.error(`Error deleting project with id ${id}:`, err);
      error.value = err.message || 'Failed to delete project';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }
  
  // Reset store state
  function reset() {
    projects.value = [];
    currentProject.value = null;
    isLoading.value = false;
    error.value = null;
  }
  
  return {
    projects,
    currentProject,
    isLoading,
    error,
    fetchProjects,
    fetchProjectById,
    createProject,
    updateProject,
    deleteProject,
    reset
  };
});
