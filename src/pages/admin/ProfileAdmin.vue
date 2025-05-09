<template>
    <div class="p-6">
      <!-- Page Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          Profil
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Kişisel bilgilerinizi ve portfolyo içeriğini yönetin
        </p>
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
      
      <!-- Profile Form -->
      <div v-else class="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <AboutForm
          :profile="profile"
          :is-submitting="isSubmitting"
          @submit="saveProfile"
          @cancel="handleCancel"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useProfileStore } from '@/stores/profile';
  import AboutForm from '@/components/admin/AboutForm.vue';
  import Alert from '@/components/ui/Alert.vue';
  import Spinner from '@/components/ui/Spinner.vue';
  
  const router = useRouter();
  const profileStore = useProfileStore();
  
  // State
  const isSubmitting = ref(false);
  const alertConfig = reactive({
    show: false,
    type: 'success',
    message: ''
  });
  
  // Computed
  const isLoading = computed(() => profileStore.isLoading);
  const profile = computed(() => profileStore.profile);
  
  // Load profile data
  onMounted(async () => {
    try {
      await profileStore.fetchProfile();
    } catch (error) {
      console.error('Error loading profile:', error);
      showAlert('error', `Profil bilgileri yüklenirken bir hata oluştu: ${error.message}`);
    }
  });
  
  // Methods
  const saveProfile = async (formData) => {
    isSubmitting.value = true;
    
    try {
      await profileStore.updateProfile(formData);
      showAlert('success', 'Profil bilgileri başarıyla güncellendi.');
    } catch (error) {
      console.error('Error saving profile:', error);
      showAlert('error', `Profil bilgileri kaydedilirken bir hata oluştu: ${error.message}`);
    } finally {
      isSubmitting.value = false;
    }
  };
  
  const handleCancel = () => {
    router.push({ name: 'AdminDashboard' });
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
  </script>
  