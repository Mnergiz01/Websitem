<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
      Profil ve Hakkımda Bilgileri
    </h3>
    
    <form @submit.prevent="submitForm">
      <!-- Personal Info Section -->
      <div class="mb-6">
        <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
          Kişisel Bilgiler
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <!-- First Name -->
          <div>
            <label for="firstName" class="form-label">Ad</label>
            <input 
              id="firstName"
              v-model="form.firstName"
              type="text" 
              class="form-input"
              :class="{ 'border-red-500 dark:border-red-500': errors.firstName }"
              placeholder="Adınız"
              required
            />
            <p v-if="errors.firstName" class="form-error">{{ errors.firstName }}</p>
          </div>
          
          <!-- Last Name -->
          <div>
            <label for="lastName" class="form-label">Soyad</label>
            <input 
              id="lastName"
              v-model="form.lastName"
              type="text" 
              class="form-input"
              :class="{ 'border-red-500 dark:border-red-500': errors.lastName }"
              placeholder="Soyadınız"
              required
            />
            <p v-if="errors.lastName" class="form-error">{{ errors.lastName }}</p>
          </div>
        </div>
        
        <!-- Headline -->
        <div class="mb-4">
          <label for="headline" class="form-label">Başlık / Pozisyon</label>
          <input 
            id="headline"
            v-model="form.headline"
            type="text" 
            class="form-input"
            :class="{ 'border-red-500 dark:border-red-500': errors.headline }"
            placeholder="Örn: Senior Yazılım Geliştirici"
            required
          />
          <p v-if="errors.headline" class="form-error">{{ errors.headline }}</p>
        </div>
        
        <!-- Summary -->
        <div class="mb-4">
          <label for="summary" class="form-label">Kısa Özet</label>
          <textarea 
            id="summary"
            v-model="form.summary"
            rows="3" 
            class="form-input"
            :class="{ 'border-red-500 dark:border-red-500': errors.summary }"
            placeholder="Kendinizi kısaca tanıtın"
            required
          ></textarea>
          <p v-if="errors.summary" class="form-error">{{ errors.summary }}</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <!-- Email -->
          <div>
            <label for="email" class="form-label">Email</label>
            <input 
              id="email"
              v-model="form.email"
              type="email" 
              class="form-input"
              :class="{ 'border-red-500 dark:border-red-500': errors.email }"
              placeholder="örnek@email.com"
              required
            />
            <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
          </div>
          
          <!-- Phone -->
          <div>
            <label for="phone" class="form-label">Telefon</label>
            <input 
              id="phone"
              v-model="form.phone"
              type="tel" 
              class="form-input"
              :class="{ 'border-red-500 dark:border-red-500': errors.phone }"
              placeholder="+90 555 123 4567"
            />
            <p v-if="errors.phone" class="form-error">{{ errors.phone }}</p>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <!-- Location -->
          <div>
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
          
          <!-- Birth Date -->
          <div>
            <label for="birthDate" class="form-label">Doğum Tarihi</label>
            <input 
              id="birthDate"
              v-model="form.birthDate"
              type="date" 
              class="form-input"
              :class="{ 'border-red-500 dark:border-red-500': errors.birthDate }"
            />
            <p v-if="errors.birthDate" class="form-error">{{ errors.birthDate }}</p>
          </div>
        </div>
        
        <!-- Job Title -->
        <div class="mb-4">
          <label for="jobTitle" class="form-label">İş Ünvanı</label>
          <input 
            id="jobTitle"
            v-model="form.jobTitle"
            type="text" 
            class="form-input"
            :class="{ 'border-red-500 dark:border-red-500': errors.jobTitle }"
            placeholder="Örn: Senior Web Developer"
          />
          <p v-if="errors.jobTitle" class="form-error">{{ errors.jobTitle }}</p>
        </div>
      </div>
      
      <!-- About Section -->
      <div class="mb-6">
        <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
          Hakkımda Bölümü
        </h4>
        
        <!-- About Title -->
        <div class="mb-4">
          <label for="aboutTitle" class="form-label">Hakkımda Başlığı</label>
          <input 
            id="aboutTitle"
            v-model="form.aboutTitle"
            type="text" 
            class="form-input"
            :class="{ 'border-red-500 dark:border-red-500': errors.aboutTitle }"
            placeholder="Örn: Yazılım Geliştirme Tutkum"
          />
          <p v-if="errors.aboutTitle" class="form-error">{{ errors.aboutTitle }}</p>
        </div>
        
        <!-- About Content -->
        <div class="mb-4">
          <label for="aboutContent" class="form-label">Hakkımda İçeriği</label>
          <textarea 
            id="aboutContent"
            v-model="form.aboutContent"
            rows="6" 
            class="form-input"
            :class="{ 'border-red-500 dark:border-red-500': errors.aboutContent }"
            placeholder="Kendiniz hakkında detaylı bilgi"
            required
          ></textarea>
          <p v-if="errors.aboutContent" class="form-error">{{ errors.aboutContent }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            HTML formatlaması kullanabilirsiniz (örn: &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;)
          </p>
        </div>
        
        <!-- About Image URL -->
        <div class="mb-4">
          <label for="aboutImage" class="form-label">Hakkımda Görsel URL</label>
          <input 
            id="aboutImage"
            v-model="form.aboutImage"
            type="url" 
            class="form-input"
            :class="{ 'border-red-500 dark:border-red-500': errors.aboutImage }"
            placeholder="https://example.com/image.jpg"
          />
          <p v-if="errors.aboutImage" class="form-error">{{ errors.aboutImage }}</p>
        </div>
      </div>
      
      <!-- Social Media Section -->
      <div class="mb-6">
        <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
          Sosyal Medya
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- LinkedIn -->
          <div>
            <label for="linkedin" class="form-label">LinkedIn URL</label>
            <input 
              id="linkedin"
              v-model="form.linkedin"
              type="url" 
              class="form-input"
              :class="{ 'border-red-500 dark:border-red-500': errors.linkedin }"
              placeholder="https://linkedin.com/in/kullaniciadi"
            />
            <p v-if="errors.linkedin" class="form-error">{{ errors.linkedin }}</p>
          </div>
          
          <!-- GitHub -->
          <div>
            <label for="github" class="form-label">GitHub URL</label>
            <input 
              id="github"
              v-model="form.github"
              type="url" 
              class="form-input"
              :class="{ 'border-red-500 dark:border-red-500': errors.github }"
              placeholder="https://github.com/kullaniciadi"
            />
            <p v-if="errors.github" class="form-error">{{ errors.github }}</p>
          </div>
          
          <!-- Twitter -->
          <div>
            <label for="twitter" class="form-label">Twitter URL</label>
            <input 
              id="twitter"
              v-model="form.twitter"
              type="url" 
              class="form-input"
              :class="{ 'border-red-500 dark:border-red-500': errors.twitter }"
              placeholder="https://twitter.com/kullaniciadi"
            />
            <p v-if="errors.twitter" class="form-error">{{ errors.twitter }}</p>
          </div>
          
          <!-- Instagram -->
          <div>
            <label for="instagram" class="form-label">Instagram URL</label>
            <input 
              id="instagram"
              v-model="form.instagram"
              type="url" 
              class="form-input"
              :class="{ 'border-red-500 dark:border-red-500': errors.instagram }"
              placeholder="https://instagram.com/kullaniciadi"
            />
            <p v-if="errors.instagram" class="form-error">{{ errors.instagram }}</p>
          </div>
        </div>
      </div>
      
      <!-- Avatar Section -->
      <div class="mb-6">
        <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
          Profil Fotoğrafı
        </h4>
        
        <div class="mb-4">
          <label for="avatar" class="form-label">Profil Fotoğrafı URL</label>
          <input 
            id="avatar"
            v-model="form.avatar"
            type="url" 
            class="form-input"
            :class="{ 'border-red-500 dark:border-red-500': errors.avatar }"
            placeholder="https://example.com/avatar.jpg"
          />
          <p v-if="errors.avatar" class="form-error">{{ errors.avatar }}</p>
        </div>
        
        <div v-if="form.avatar" class="flex justify-center mb-4">
          <div class="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
            <img :src="form.avatar" alt="Avatar Preview" class="w-full h-full object-cover" />
          </div>
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
          <span v-else>Kaydet</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

const props = defineProps({
  profile: {
    type: Object,
    default: () => ({})
  },
  isSubmitting: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['submit', 'cancel']);

const form = reactive({
  firstName: '',
  lastName: '',
  headline: '',
  summary: '',
  email: '',
  phone: '',
  location: '',
  birthDate: '',
  jobTitle: '',
  aboutTitle: '',
  aboutContent: '',
  aboutImage: '',
  linkedin: '',
  github: '',
  twitter: '',
  instagram: '',
  avatar: ''
});

const errors = reactive({
  firstName: '',
  lastName: '',
  headline: '',
  summary: '',
  email: '',
  phone: '',
  location: '',
  birthDate: '',
  jobTitle: '',
  aboutTitle: '',
  aboutContent: '',
  aboutImage: '',
  linkedin: '',
  github: '',
  twitter: '',
  instagram: '',
  avatar: ''
});

// Initialize form with profile data
onMounted(() => {
  if (props.profile) {
    Object.keys(form).forEach(key => {
      if (props.profile[key]) {
        form[key] = props.profile[key];
      }
    });
    
    // Format date if it exists
    if (props.profile.birthDate) {
      const date = new Date(props.profile.birthDate);
      if (!isNaN(date.getTime())) {
        form.birthDate = date.toISOString().split('T')[0];
      }
    }
  }
});

const validateForm = () => {
  let isValid = true;
  
  // Reset all errors
  Object.keys(errors).forEach(key => {
    errors[key] = '';
  });
  
  // Required fields
  if (!form.firstName || form.firstName.trim() === '') {
    errors.firstName = 'Ad gereklidir';
    isValid = false;
  }
  
  if (!form.lastName || form.lastName.trim() === '') {
    errors.lastName = 'Soyad gereklidir';
    isValid = false;
  }
  
  if (!form.headline || form.headline.trim() === '') {
    errors.headline = 'Başlık gereklidir';
    isValid = false;
  }
  
  if (!form.summary || form.summary.trim() === '') {
    errors.summary = 'Özet gereklidir';
    isValid = false;
  }
  
  if (!form.email || form.email.trim() === '') {
    errors.email = 'Email gereklidir';
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = 'Geçerli bir email adresi giriniz';
    isValid = false;
  }
  
  if (!form.aboutContent || form.aboutContent.trim() === '') {
    errors.aboutContent = 'Hakkımda içeriği gereklidir';
    isValid = false;
  }
  
  // URL validations
  const urlFields = ['aboutImage', 'linkedin', 'github', 'twitter', 'instagram', 'avatar'];
  urlFields.forEach(field => {
    if (form[field] && !isValidUrl(form[field])) {
      errors[field] = 'Geçerli bir URL giriniz';
      isValid = false;
    }
  });
  
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
