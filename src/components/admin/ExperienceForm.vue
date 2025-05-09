<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        {{ isEditing ? 'İş Deneyimini Düzenle' : 'Yeni İş Deneyimi Ekle' }}
      </h3>
      
      <form @submit.prevent="submitForm">
        <!-- Job Title -->
        <div class="mb-4">
          <label for="title" class="form-label">İş Ünvanı</label>
          <input 
            id="title"
            v-model="form.title"
            type="text" 
            class="form-input"
            :class="{ 'border-red-500 dark:border-red-500': errors.title }"
            placeholder="Örn: Senior Frontend Developer"
            required
          />
          <p v-if="errors.title" class="form-error">{{ errors.title }}</p>
        </div>
        
        <!-- Company -->
        <div class="mb-4">
          <label for="company" class="form-label">Şirket</label>
          <input 
            id="company"
            v-model="form.company"
            type="text" 
            class="form-input"
            :class="{ 'border-red-500 dark:border-red-500': errors.company }"
            placeholder="Örn: Acme Corp"
            required
          />
          <p v-if="errors.company" class="form-error">{{ errors.company }}</p>
        </div>
        
        <!-- Location -->
        <div class="mb-4">
          <label for="location" class="form-label">Konum</label>
          <input 
            id="location"
            v-model="form.location"
            type="text" 
            class="form-input"
            :class="{ 'border-red-500 dark:border-red-500': errors.location }"
            placeholder="Örn: İstanbul, Türkiye"
          />
          <p v-if="errors.location" class="form-error">{{ errors.location }}</p>
        </div>
        
        <!-- Date Range -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label for="startDate" class="form-label">Başlangıç Tarihi</label>
            <input 
              id="startDate"
              v-model="form.startDate"
              type="date" 
              class="form-input"
              :class="{ 'border-red-500 dark:border-red-500': errors.startDate }"
              required
            />
            <p v-if="errors.startDate" class="form-error">{{ errors.startDate }}</p>
          </div>
          
          <div>
            <label for="endDate" class="form-label">Bitiş Tarihi</label>
            <input 
              id="endDate"
              v-model="form.endDate"
              type="date" 
              class="form-input"
              :class="{ 'border-red-500 dark:border-red-500': errors.endDate }"
              :disabled="form.current"
            />
            <p v-if="errors.endDate" class="form-error">{{ errors.endDate }}</p>
            
            <div class="mt-2">
              <div class="flex items-center">
                <input 
                  id="current"
                  v-model="form.current"
                  type="checkbox" 
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="current" class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Şu anda burada çalışıyorum
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Description -->
        <div class="mb-4">
          <label for="description" class="form-label">Açıklama</label>
          <textarea 
            id="description"
            v-model="form.description"
            rows="4" 
            class="form-input"
            :class="{ 'border-red-500 dark:border-red-500': errors.description }"
            placeholder="İş tanımı ve başarılarınız"
            required
          ></textarea>
          <p v-if="errors.description" class="form-error">{{ errors.description }}</p>
        </div>
        
        <!-- Company Logo URL -->
        <div class="mb-4">
          <label for="companyLogo" class="form-label">Şirket Logo URL (Opsiyonel)</label>
          <input 
            id="companyLogo"
            v-model="form.companyLogo"
            type="url" 
            class="form-input"
            :class="{ 'border-red-500 dark:border-red-500': errors.companyLogo }"
            placeholder="https://example.com/logo.png"
          />
          <p v-if="errors.companyLogo" class="form-error">{{ errors.companyLogo }}</p>
        </div>
        
        <!-- Skills -->
        <div class="mb-6">
          <label for="skills" class="form-label">Kullandığınız Teknolojiler</label>
          <input 
            id="skills"
            v-model="form.skills"
            type="text" 
            class="form-input"
            :class="{ 'border-red-500 dark:border-red-500': errors.skills }"
            placeholder="Vue.js, JavaScript, CSS"
            required
          />
          <p v-if="errors.skills" class="form-error">{{ errors.skills }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Becerileri virgülle ayırın
          </p>
        </div>
        
        <!-- Form Buttons -->
        <div class="flex justify-end space-x-3">
          <button 
            type="button" 
            class="btn btn-secondary"
            @click="$emit('cancel')"
          >
            İptal
          </button>
          <button 
            type="submit"
            class="btn btn-primary"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Kaydediliyor...
            </span>
            <span v-else>{{ isEditing ? 'Güncelle' : 'Ekle' }}</span>
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed, watch, onMounted } from 'vue';
  
  const props = defineProps({
    experience: {
      type: Object,
      default: null
    },
    isSubmitting: {
      type: Boolean,
      default: false
    }
  });
  
  const emit = defineEmits(['submit', 'cancel']);
  
  const form = reactive({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    companyLogo: '',
    skills: ''
  });
  
  const errors = reactive({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    companyLogo: '',
    skills: ''
  });
  
  // Determine if we're editing or creating
  const isEditing = computed(() => {
    return !!props.experience;
  });
  
  // Initialize form with experience data if editing
  onMounted(() => {
    if (props.experience) {
      form.title = props.experience.title || '';
      form.company = props.experience.company || '';
      form.location = props.experience.location || '';
      form.startDate = props.experience.startDate ? new Date(props.experience.startDate).toISOString().split('T')[0] : '';
      form.current = !props.experience.endDate;
      form.endDate = props.experience.endDate ? new Date(props.experience.endDate).toISOString().split('T')[0] : '';
      form.description = props.experience.description || '';
      form.companyLogo = props.experience.companyLogo || '';
      form.skills = props.experience.skills || '';
    }
  });
  
  // Watch for current checkbox changes
  watch(() => form.current, (newValue) => {
    if (newValue) {
      form.endDate = '';
    }
  });
  
  const validateForm = () => {
    let isValid = true;
    errors.title = '';
    errors.company = '';
    errors.location = '';
    errors.startDate = '';
    errors.endDate = '';
    errors.description = '';
    errors.companyLogo = '';
    errors.skills = '';
    
    if (!form.title || form.title.trim() === '') {
      errors.title = 'İş ünvanı gereklidir';
      isValid = false;
    }
    
    if (!form.company || form.company.trim() === '') {
      errors.company = 'Şirket adı gereklidir';
      isValid = false;
    }
    
    if (!form.startDate) {
      errors.startDate = 'Başlangıç tarihi gereklidir';
      isValid = false;
    }
    
    if (!form.current && !form.endDate) {
      errors.endDate = 'Bitiş tarihi gereklidir';
      isValid = false;
    }
    
    if (!form.current && form.startDate && form.endDate && new Date(form.startDate) > new Date(form.endDate)) {
      errors.endDate = 'Bitiş tarihi başlangıç tarihinden sonra olmalıdır';
      isValid = false;
    }
    
    if (!form.description || form.description.trim() === '') {
      errors.description = 'Açıklama gereklidir';
      isValid = false;
    }
    
    if (form.companyLogo && !isValidUrl(form.companyLogo)) {
      errors.companyLogo = 'Geçerli bir URL giriniz';
      isValid = false;
    }
    
    if (!form.skills || form.skills.trim() === '') {
      errors.skills = 'En az bir beceri gereklidir';
      isValid = false;
    }
    
    return isValid;
  };
  
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  const submitForm = () => {
    if (!validateForm()) {
      return;
    }
    
    // Prepare data for submission
    const formData = { ...form };
    
    // If current job, clear end date
    if (formData.current) {
      formData.endDate = null;
    }
    
    emit('submit', formData);
  };
  </script>
  