<template>
    <section id="contact" class="section bg-white dark:bg-gray-900">
      <div class="container">
        <div class="max-w-3xl mx-auto text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            İletişime Geç
          </h2>
          <div class="w-20 h-1 bg-blue-600 dark:bg-blue-500 mx-auto mb-6"></div>
          
        </div>
        
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Contact Info -->
          <div class="lg:w-1/3">
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                İletişim Bilgileri
              </h3>
              
              <div class="space-y-4">
                <!-- Email -->
                <div class="flex items-start">
                  <div class="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p class="text-gray-700 dark:text-gray-300">{{ profile.email || 'contact@example.com' }}</p>
                  </div>
                </div>
                
                <!-- Phone -->
                <div class="flex items-start">
                  <div class="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Telefon</p>
                    <p class="text-gray-700 dark:text-gray-300">{{ profile.phone || '+90 555 123 4567' }}</p>
                  </div>
                </div>
                
                <!-- Location -->
                <div class="flex items-start">
                  <div class="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Konum</p>
                    <p class="text-gray-700 dark:text-gray-300">{{ profile.location || 'İstanbul, Türkiye' }}</p>
                  </div>
                </div>
                
                <!-- Social Media -->
                <div class="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                  <p class="text-gray-600 dark:text-gray-400 mb-4">Sosyal Medya</p>
                  <div class="flex space-x-4">
                    <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank" rel="noopener noreferrer" class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a v-if="profile.github" :href="profile.github" target="_blank" rel="noopener noreferrer" class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a v-if="profile.twitter" :href="profile.twitter" target="_blank" rel="noopener noreferrer" class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a v-if="profile.instagram" :href="profile.instagram" target="_blank" rel="noopener noreferrer" class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Contact Form -->
          <div class="lg:w-2/3">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Mesaj Gönder
              </h3>
              
              <form @submit.prevent="submitForm">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label for="name" class="form-label">Adınız</label>
                    <input 
                      id="name"
                      v-model="form.name"
                      type="text" 
                      class="form-input"
                      :class="{ 'border-red-500 dark:border-red-500': errors.name }"
                      placeholder="Adınız Soyadınız"
                      required
                    />
                    <p v-if="errors.name" class="form-error">{{ errors.name }}</p>
                  </div>
                  
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
                </div>
                
                <div class="mb-6">
                  <label for="subject" class="form-label">Konu</label>
                  <input 
                    id="subject"
                    v-model="form.subject"
                    type="text" 
                    class="form-input"
                    :class="{ 'border-red-500 dark:border-red-500': errors.subject }"
                    placeholder="Mesajınızın konusu"
                    required
                  />
                  <p v-if="errors.subject" class="form-error">{{ errors.subject }}</p>
                </div>
                
                <div class="mb-6">
                  <label for="message" class="form-label">Mesaj</label>
                  <textarea 
                    id="message"
                    v-model="form.message"
                    rows="5" 
                    class="form-input"
                    :class="{ 'border-red-500 dark:border-red-500': errors.message }"
                    placeholder="Mesajınızı buraya yazın"
                    required
                  ></textarea>
                  <p v-if="errors.message" class="form-error">{{ errors.message }}</p>
                </div>
                
                <div>
                  <button 
                    type="submit"
                    class="btn btn-primary w-full md:w-auto"
                    :disabled="isSubmitting"
                  >
                    <span v-if="isSubmitting" class="flex items-center justify-center">
                      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Gönderiliyor...
                    </span>
                    <span v-else>Gönder</span>
                  </button>
                </div>
              </form>
              
              <!-- Success/Error Alert -->
              <Alert 
                v-if="formStatus" 
                :type="formStatus.type" 
                :message="formStatus.message"
                class="mt-4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, reactive, computed, onMounted } from 'vue';
  import { useProfileStore } from '@/stores/profile';
  import Alert from '@/components/ui/Alert.vue';
  
  const profileStore = useProfileStore();
  const form = reactive({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const errors = reactive({});
  const isSubmitting = ref(false);
  const formStatus = ref(null);
  
  // Load profile data
  onMounted(() => {
    if (!profileStore.isLoaded) {
      profileStore.fetchProfile();
    }
  });
  
  const profile = computed(() => {
    return profileStore.profile;
  });
  
  const validateForm = () => {
    let isValid = true;
    errors.name = '';
    errors.email = '';
    errors.subject = '';
    errors.message = '';
    
    if (!form.name || form.name.trim() === '') {
      errors.name = 'Adınız gereklidir';
      isValid = false;
    }
    
    if (!form.email || form.email.trim() === '') {
      errors.email = 'Email gereklidir';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      errors.email = 'Geçerli bir email adresi giriniz';
      isValid = false;
    }
    
    if (!form.subject || form.subject.trim() === '') {
      errors.subject = 'Konu gereklidir';
      isValid = false;
    }
    
    if (!form.message || form.message.trim() === '') {
      errors.message = 'Mesaj gereklidir';
      isValid = false;
    }
    
    return isValid;
  };
  
  const submitForm = async () => {
    if (!validateForm()) {
      return;
    }
    
    isSubmitting.value = true;
    formStatus.value = null;
    
    try {
      // In a real application, you would send this data to your backend
      // For demo, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      formStatus.value = {
        type: 'success',
        message: 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.'
      };
      
      // Reset form
      form.name = '';
      form.email = '';
      form.subject = '';
      form.message = '';
    } catch (error) {
      formStatus.value = {
        type: 'error',
        message: 'Mesajınız gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
      };
    } finally {
      isSubmitting.value = false;
    }
  };
  </script>
  