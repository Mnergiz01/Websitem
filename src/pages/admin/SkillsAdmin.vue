<template>
    <div class="p-6">
      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            Projeler
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            Portfolyonuzda gösterilecek projeleri yönetin
          </p>
        </div>
        <button 
          @click="openProjectForm(null)" 
          class="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Yeni Proje Ekle
        </button>
      </div>
      
      <!-- Alert -->
      <Alert 
        v-if="alertConfig.show" 
        :type="alertConfig.type" 
        :message="alertConfig.message" 
        dismissible
        class="mb-6"
        @close="alertConfig.show = false"
      />
      
      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
      
      <!-- Empty State -->
      <div v-else-if="projects.length === 0" class="flex flex-col items-center justify-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-4">Henüz proje eklenmemiş.</p>
        <button 
          @click="openProjectForm(null)" 
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors"
        >
          İlk Projeyi Ekle
        </button>
      </div>
      
      <!-- Projects Table -->
      <div v-else class="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Proje
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Etiketler
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Öne Çıkan
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="project in projects" :key="project.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden">
                      <img 
                        :src="project.image || getProjectImagePlaceholder(project.id)" 
                        :alt="project.title"
                        class="h-10 w-10 object-cover"
                      />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">
                        {{ project.title }}
                      </div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">
                        {{ truncate(project.description, 60) }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex flex-wrap">
                    <span 
                      v-for="(tag, index) in getDisplayTags(project.tags)" 
                      :key="index"
                      class="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 mr-1 mb-1"
                    >
                      {{ tag }}
                    </span>
                    <span 
                      v-if="project.tags && project.tags.split(',').length > 2" 
                      class="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mr-1 mb-1"
                    >
                      +{{ project.tags.split(',').length - 2 }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="[
                      'px-2 py-1 text-xs rounded-full',
                      project.featured 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    ]"
                  >
                    {{ project.featured ? 'Evet' : 'Hayır' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    @click="openProjectForm(project)" 
                    class="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-3"
                  >
                    Düzenle
                  </button>
                  <button 
                    @click="confirmDeleteProject(project)" 
                    class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Project Form Modal -->
      <Modal
        v-model="showFormModal"
        :title="currentProject ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'"
        size="lg"
      >
        <ProjectForm
          :project="currentProject"
          :is-submitting="isSubmitting"
          @submit="saveProject"
          @cancel="closeProjectForm"
        />
      </Modal>
      
      <!-- Delete Confirmation Modal -->
      <Modal
        v-model="showDeleteModal"
        title="Projeyi Sil"
        size="md"
      >
        <p class="text-gray-700 dark:text-gray-300 mb-6">
          <strong>{{ projectToDelete?.title }}</strong> projesini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
        </p>
        
        <template #footer>
          <div class="flex justify-end space-x-3">
            <button 
              @click="showDeleteModal = false" 
              class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white rounded-md transition-colors"
            >
              İptal
            </button>
            <button 
              @click="deleteProject" 
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              :disabled="isDeleting"
            >
              <span v-if="isDeleting" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Siliniyor...
              </span>
              <span v-else>Evet, Sil</span>
            </button>
          </div>
        </template>
      </Modal>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed, onMounted, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useProjectsStore } from '@/stores/projects';
  import ProjectForm from '@/components/admin/ProjectForm.vue';
  import Alert from '@/components/ui/Alert.vue';
  import Modal from '@/components/ui/Modal.vue';
  import Spinner from '@/components/ui/Spinner.vue';
  
  const route = useRoute();
  const router = useRouter();
  const projectsStore = useProjectsStore();
  
  // State
  const showFormModal = ref(false);
  const showDeleteModal = ref(false);
  const currentProject = ref(null);
  const projectToDelete = ref(null);
  const isSubmitting = ref(false);
  const isDeleting = ref(false);
  const alertConfig = reactive({
    show: false,
    type: 'success',
    message: ''
  });
  
  // Computed
  const isLoading = computed(() => projectsStore.isLoading);
  const projects = computed(() => projectsStore.projects);
  
  // Load projects
  onMounted(async () => {
    await projectsStore.fetchProjects();
    
    // Check if we should open edit form (from URL query)
    if (route.query.edit) {
      const projectId = route.query.edit;
      const projectToEdit = projects.value.find(p => p.id.toString() === projectId.toString());
      
      if (projectToEdit) {
        openProjectForm(projectToEdit);
      }
    }
  });
  
  // Watch for route changes
  watch(() => route.query, (newQuery) => {
    if (!newQuery.edit && showFormModal.value) {
      closeProjectForm();
    }
  });
  
  // Methods
  const openProjectForm = (project) => {
    currentProject.value = project;
    showFormModal.value = true;
    
    // Update URL
    if (project) {
      router.replace({ query: { ...route.query, edit: project.id } });
    }
  };
  
  const closeProjectForm = () => {
    showFormModal.value = false;
    currentProject.value = null;
    
    // Remove edit query param
    if (route.query.edit) {
      const query = { ...route.query };
      delete query.edit;
      router.replace({ query });
    }
  };
  
  const saveProject = async (formData) => {
    isSubmitting.value = true;
    
    try {
      if (currentProject.value) {
        // Update existing project
        await projectsStore.updateProject({
          id: currentProject.value.id,
          ...formData
        });
        
        showAlert('success', 'Proje başarıyla güncellendi.');
      } else {
        // Create new project
        await projectsStore.createProject(formData);
        
        showAlert('success', 'Proje başarıyla eklendi.');
      }
      
      closeProjectForm();
    } catch (error) {
      console.error('Error saving project:', error);
      showAlert('error', `Proje kaydedilirken bir hata oluştu: ${error.message}`);
    } finally {
      isSubmitting.value = false;
    }
  };
  
  const confirmDeleteProject = (project) => {
    projectToDelete.value = project;
    showDeleteModal.value = true;
  };
  
  const deleteProject = async () => {
    if (!projectToDelete.value) return;
    
    isDeleting.value = true;
    
    try {
      await projectsStore.deleteProject(projectToDelete.value.id);
      showDeleteModal.value = false;
      showAlert('success', 'Proje başarıyla silindi.');
    } catch (error) {
      console.error('Error deleting project:', error);
      showAlert('error', `Proje silinirken bir hata oluştu: ${error.message}`);
    } finally {
      isDeleting.value = false;
      projectToDelete.value = null;
    }
  };
  
  const showAlert = (type, message) => {
    alertConfig.type = type;
    alertConfig.message = message;
    alertConfig.show = true;
    
    // Hide alert after 5 seconds
    setTimeout(() => {
      alertConfig.show = false;
    }, 5000);
  };
  
  // Get display tags (first 2)
  const getDisplayTags = (tags) => {
    if (!tags) return [];
    
    return tags.split(',')
      .map(tag => tag.trim())
      .slice(0, 2);
  };
  
  // Placeholder image for projects without images
  const getProjectImagePlaceholder = (id) => {
    const images = [
      '/src/assets/proje-gorseli-1.svg',
      '/src/assets/proje-gorseli-2.svg',
      '/src/assets/proje-gorseli-3.svg',
      '/src/assets/proje-gorseli-4.svg'
    ];
    
    // Use the id to deterministically select an image
    const index = parseInt(id, 10) % images.length;
    return images[index];
  };
  
  // Truncate text helper
  const truncate = (text, length) => {
    if (!text) return '';
    return text.length > length ? text.slice(0, length) + '...' : text;
  };
  </script>
  