<template>
    <div class="p-6">
      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            İş Deneyimleri
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            Profesyonel deneyimlerinizi yönetin
          </p>
        </div>
        <button 
          @click="openExperienceForm(null)" 
          class="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Yeni Deneyim Ekle
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
      <div v-else-if="experiences.length === 0" class="flex flex-col items-center justify-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-4">Henüz deneyim eklenmemiş.</p>
        <button 
          @click="openExperienceForm(null)" 
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors"
        >
          İlk Deneyimi Ekle
        </button>
      </div>
      
      <!-- Experiences Table -->
      <div v-else class="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Pozisyon
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Şirket
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tarih
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="experience in sortedExperiences" :key="experience.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <img 
                        v-if="experience.companyLogo" 
                        :src="experience.companyLogo" 
                        :alt="experience.company" 
                        class="h-8 w-8 object-contain"
                      />
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">
                        {{ experience.title }}
                      </div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">
                        {{ truncate(experience.description, 60) }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 dark:text-white">{{ experience.company }}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">{{ experience.location || 'Belirtilmemiş' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 dark:text-white">
                    {{ formatDate(experience.startDate) }} - {{ experience.endDate ? formatDate(experience.endDate) : 'Şu anda' }}
                  </div>
                  <div v-if="!experience.endDate" class="text-xs text-green-600 dark:text-green-400 font-medium">
                    Aktif Çalışıyor
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    @click="openExperienceForm(experience)" 
                    class="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-3"
                  >
                    Düzenle
                  </button>
                  <button 
                    @click="confirmDeleteExperience(experience)" 
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
      
      <!-- Experience Form Modal -->
      <Modal
        v-model="showFormModal"
        :title="currentExperience ? 'Deneyimi Düzenle' : 'Yeni Deneyim Ekle'"
        size="lg"
      >
        <ExperienceForm
          :experience="currentExperience"
          :is-submitting="isSubmitting"
          @submit="saveExperience"
          @cancel="closeExperienceForm"
        />
      </Modal>
      
      <!-- Delete Confirmation Modal -->
      <Modal
        v-model="showDeleteModal"
        title="Deneyimi Sil"
        size="md"
      >
        <p class="text-gray-700 dark:text-gray-300 mb-6">
          <strong>{{ experienceToDelete?.company }}</strong> şirketindeki <strong>{{ experienceToDelete?.title }}</strong> deneyimini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
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
              @click="deleteExperience" 
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
  import { useExperiencesStore } from '@/stores/experiences';
  import ExperienceForm from '@/components/admin/ExperienceForm.vue';
  import Alert from '@/components/ui/Alert.vue';
  import Modal from '@/components/ui/Modal.vue';
  import Spinner from '@/components/ui/Spinner.vue';
  
  const route = useRoute();
  const router = useRouter();
  const experiencesStore = useExperiencesStore();
  
  // State
  const showFormModal = ref(false);
  const showDeleteModal = ref(false);
  const currentExperience = ref(null);
  const experienceToDelete = ref(null);
  const isSubmitting = ref(false);
  const isDeleting = ref(false);
  const alertConfig = reactive({
    show: false,
    type: 'success',
    message: ''
  });
  
  // Computed
  const isLoading = computed(() => experiencesStore.isLoading);
  const experiences = computed(() => experiencesStore.experiences);
  
  // Sort experiences by start date (newest first)
  const sortedExperiences = computed(() => {
    return [...experiences.value].sort((a, b) => {
      return new Date(b.startDate) - new Date(a.startDate);
    });
  });
  
  // Load experiences
  onMounted(async () => {
    await experiencesStore.fetchExperiences();
    
    // Check if we should open edit form (from URL query)
    if (route.query.edit) {
      const experienceId = route.query.edit;
      const experienceToEdit = experiences.value.find(e => e.id.toString() === experienceId.toString());
      
      if (experienceToEdit) {
        openExperienceForm(experienceToEdit);
      }
    }
  });
  
  // Watch for route changes
  watch(() => route.query, (newQuery) => {
    if (!newQuery.edit && showFormModal.value) {
      closeExperienceForm();
    }
  });
  
  // Methods
  const openExperienceForm = (experience) => {
    currentExperience.value = experience;
    showFormModal.value = true;
    
    // Update URL
    if (experience) {
      router.replace({ query: { ...route.query, edit: experience.id } });
    }
  };
  
  const closeExperienceForm = () => {
    showFormModal.value = false;
    currentExperience.value = null;
    
    // Remove edit query param
    if (route.query.edit) {
      const query = { ...route.query };
      delete query.edit;
      router.replace({ query });
    }
  };
  
  const saveExperience = async (formData) => {
    isSubmitting.value = true;
    
    try {
      if (currentExperience.value) {
        // Update existing experience
        await experiencesStore.updateExperience({
          id: currentExperience.value.id,
          ...formData
        });
        
        showAlert('success', 'Deneyim başarıyla güncellendi.');
      } else {
        // Create new experience
        await experiencesStore.createExperience(formData);
        
        showAlert('success', 'Deneyim başarıyla eklendi.');
      }
      
      closeExperienceForm();
    } catch (error) {
      console.error('Error saving experience:', error);
      showAlert('error', `Deneyim kaydedilirken bir hata oluştu: ${error.message}`);
    } finally {
      isSubmitting.value = false;
    }
  };
  
  const confirmDeleteExperience = (experience) => {
    experienceToDelete.value = experience;
    showDeleteModal.value = true;
  };
  
  const deleteExperience = async () => {
    if (!experienceToDelete.value) return;
    
    isDeleting.value = true;
    
    try {
      await experiencesStore.deleteExperience(experienceToDelete.value.id);
      showDeleteModal.value = false;
      showAlert('success', 'Deneyim başarıyla silindi.');
    } catch (error) {
      console.error('Error deleting experience:', error);
      showAlert('error', `Deneyim silinirken bir hata oluştu: ${error.message}`);
    } finally {
      isDeleting.value = false;
      experienceToDelete.value = null;
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
  
  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', { 
      year: 'numeric', 
      month: 'short'
    }).format(date);
  };
  
  // Truncate text helper
  const truncate = (text, length) => {
    if (!text) return '';
    return text.length > length ? text.slice(0, length) + '...' : text;
  };
  </script>
  