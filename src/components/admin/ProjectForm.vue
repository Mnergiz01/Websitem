<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        {{ isEditing ? 'Projeyi Düzenle' : 'Yeni Proje Ekle' }}
      </h3>
      
      <form @submit.prevent="submitForm">
        <!-- Project Title -->
        <div class="mb-4">
          <label for="title" class="form-label">Proje Başlığı</label>
          <input 
            id="title"
            v-model="form.title"
            type="text" 
            class="form-input"
            :class="{ 'border-red-500 dark:border-red-500': errors.title }"
            placeholder="Proje başlığı"
            required
          />
          <p v-if="errors.title" class="form-error">{{ errors.title }}</p>
        </div>
        
        <!-- Project Description -->
        <div class="mb-4">
          <label for="description" class="form-label">Açıklama</label>
          <textarea 
            id="description"
            v-model="form.description"
            rows="4" 
            class="form-input"
            :class="{ 'border-red-500 dark:border-red-500': errors.description }"
            placeholder="Proje açıklaması"
            required
          ></textarea>
          <p v-if="errors.description" class="form-error">{{ errors.description }}</p>
        </div>
        
        <!-- Project Image URL -->
        <div class="mb-4">
          <label for="image" class="form-label">Görsel URL</label>
          <input 
            id="image"
            v-model="form.image"
            type="url" 
            class="form-input"
            :class="{ 'border-red-500 dark:border-red-500': errors.image }"
            placeholder="https://example.com/image.jpg"
          />
          <p v-if="errors.image" class="form-error">{{ errors.image }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Proje görseli için URL girin. Boş bırakırsanız varsayılan görsel kullanılacaktır.
          </p>
        </div>
        
        <!-- Project URL -->
        <div class="mb-4">
          <label for="projectUrl" class="form-label">Proje URL (Opsiyonel)</label>
          <input 
            id="projectUrl"
            v-model="form.projectUrl"
            type="url" 
            class="form-input"
            :class="{ 'border-red-500 dark:border-red-500': errors.projectUrl }"
            placeholder="https://example.com"
          />
          <p v-if="errors.projectUrl" class="form-error">{{ errors.projectUrl }}</p>
        </div>
        
        <!-- Project Source Code URL -->
        <div class="mb-4">
          <label for="sourceCodeUrl" class="form-label">Kaynak Kodu URL (Opsiyonel)</label>
          <input 
            id="sourceCodeUrl"
            v-model="form.sourceCodeUrl"
            type="url" 
            class="form-input"
            :class="{ 'border-red-500 dark:border-red-500': errors.sourceCodeUrl }"
            placeholder="https://github.com/username/repo"
          />
          <p v-if="errors.sourceCodeUrl" class="form-error">{{ errors.sourceCodeUrl }}</p>
        </div>
        
        <!-- Tags -->
        <div class="mb-4">
          <label for="tags" class="form-label">Etiketler</label>
          <input 
            id="tags"
            v-model="form.tags"
            type="text" 
            class="form-input"
            :class="{ 'border-red-500 dark:border-red-500': errors.tags }"
            placeholder="Vue.js, Tailwind, Firebase"
            required
          />
          <p v-if="errors.tags" class="form-error">{{ errors.tags }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Etiketleri virgülle ayırın
          </p>
        </div>
        
        <!-- Featured Project -->
        <div class="mb-6">
          <div class="flex items-center">
            <input 
              id="featured"
              v-model="form.featured"
              type="checkbox" 
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
            />
            <label for="featured" class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Öne Çıkan Proje
            </label>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Öne çıkan projeler ana sayfada görüntülenir
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
  import { ref, reactive, computed, onMounted } from 'vue';
  
  const props = defineProps({
    project: {
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
    description: '',
    image: '',
    projectUrl: '',
    sourceCodeUrl: '',
    tags: '',
    featured: false
  });
  
  const errors = reactive({
    title: '',
    description: '',
    image: '',
    projectUrl: '',
    sourceCodeUrl: '',
    tags: ''
  });
  
  // Determine if we're editing or creating
  const isEditing = computed(() => {
    return !!props.project;
  });
  
  // Initialize form with project data if editing
  onMounted(() => {
    if (props.project) {
      form.title = props.project.title || '';
      form.description = props.project.description || '';
      form.image = props.project.image || '';
      form.projectUrl = props.project.projectUrl || '';
      form.sourceCodeUrl = props.project.sourceCodeUrl || '';
      form.tags = props.project.tags || '';
      form.featured = props.project.featured || false;
    }
  });
  
  const validateForm = () => {
    let isValid = true;
    errors.title = '';
    errors.description = '';
    errors.image = '';
    errors.projectUrl = '';
    errors.sourceCodeUrl = '';
    errors.tags = '';
    
    if (!form.title || form.title.trim() === '') {
      errors.title = 'Proje başlığı gereklidir';
      isValid = false;
    }
    
    if (!form.description || form.description.trim() === '') {
      errors.description = 'Proje açıklaması gereklidir';
      isValid = false;
    }
    
    if (form.image && !isValidUrl(form.image)) {
      errors.image = 'Geçerli bir URL giriniz';
      isValid = false;
    }
    
    if (form.projectUrl && !isValidUrl(form.projectUrl)) {
      errors.projectUrl = 'Geçerli bir URL giriniz';
      isValid = false;
    }
    
    if (form.sourceCodeUrl && !isValidUrl(form.sourceCodeUrl)) {
      errors.sourceCodeUrl = 'Geçerli bir URL giriniz';
      isValid = false;
    }
    
    if (!form.tags || form.tags.trim() === '') {
      errors.tags = 'En az bir etiket gereklidir';
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
    
    emit('submit', { ...form });
  };
  </script>
  