<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        {{ isEditing ? 'Yeteneği Düzenle' : 'Yeni Yetenek Ekle' }}
      </h3>
      
      <form @submit.prevent="submitForm">
        <!-- Skill Name -->
        <div class="mb-4">
          <label for="name" class="form-label">Yetenek Adı</label>
          <input 
            id="name"
            v-model="form.name"
            type="text" 
            class="form-input"
            :class="{ 'border-red-500 dark:border-red-500': errors.name }"
            placeholder="Örn: JavaScript"
            required
          />
          <p v-if="errors.name" class="form-error">{{ errors.name }}</p>
        </div>
        
        <!-- Skill Category -->
        <div class="mb-4">
          <label for="category" class="form-label">Kategori</label>
          <select
            id="category"
            v-model="form.category"
            class="form-input"
            :class="{ 'border-red-500 dark:border-red-500': errors.category }"
            required
          >
            <option value="" disabled>Kategori seçin</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
            <option value="custom">Diğer...</option>
          </select>
          <p v-if="errors.category" class="form-error">{{ errors.category }}</p>
        </div>
        
        <!-- Custom Category (if selected) -->
        <div v-if="form.category === 'custom'" class="mb-4">
          <label for="customCategory" class="form-label">Özel Kategori</label>
          <input 
            id="customCategory"
            v-model="form.customCategory"
            type="text" 
            class="form-input"
            :class="{ 'border-red-500 dark:border-red-500': errors.customCategory }"
            placeholder="Yeni kategori adı"
            required
          />
          <p v-if="errors.customCategory" class="form-error">{{ errors.customCategory }}</p>
        </div>
        
        <!-- Skill Level -->
        <div class="mb-6">
          <label for="level" class="form-label">Seviye ({{ form.level }}%)</label>
          <input 
            id="level"
            v-model.number="form.level"
            type="range" 
            min="10" 
            max="100" 
            step="5"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>Başlangıç</span>
            <span>Orta</span>
            <span>İleri</span>
            <span>Uzman</span>
          </div>
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
    skill: {
      type: Object,
      default: null
    },
    isSubmitting: {
      type: Boolean,
      default: false
    }
  });
  
  const emit = defineEmits(['submit', 'cancel']);
  
  // Predefined categories
  const categories = [
    'Frontend',
    'Backend',
    'DevOps',
    'Veritabanı',
    'Mobil',
    'UI/UX',
    'Diğer'
  ];
  
  const form = reactive({
    name: '',
    category: '',
    customCategory: '',
    level: 75
  });
  
  const errors = reactive({
    name: '',
    category: '',
    customCategory: ''
  });
  
  // Determine if we're editing or creating
  const isEditing = computed(() => {
    return !!props.skill;
  });
  
  // Initialize form with skill data if editing
  onMounted(() => {
    if (props.skill) {
      form.name = props.skill.name || '';
      
      // Check if the category exists in our predefined list
      const categoryExists = categories.includes(props.skill.category);
      if (categoryExists) {
        form.category = props.skill.category;
      } else {
        form.category = 'custom';
        form.customCategory = props.skill.category || '';
      }
      
      form.level = props.skill.level || 75;
    }
  });
  
  const validateForm = () => {
    let isValid = true;
    errors.name = '';
    errors.category = '';
    errors.customCategory = '';
    
    if (!form.name || form.name.trim() === '') {
      errors.name = 'Yetenek adı gereklidir';
      isValid = false;
    }
    
    if (!form.category) {
      errors.category = 'Kategori seçimi gereklidir';
      isValid = false;
    }
    
    if (form.category === 'custom' && (!form.customCategory || form.customCategory.trim() === '')) {
      errors.customCategory = 'Özel kategori adı gereklidir';
      isValid = false;
    }
    
    return isValid;
  };
  
  const submitForm = () => {
    if (!validateForm()) {
      return;
    }
    
    // Prepare data for submission
    const formData = { 
      name: form.name,
      category: form.category === 'custom' ? form.customCategory : form.category,
      level: form.level
    };
    
    emit('submit', formData);
  };
  </script>
  