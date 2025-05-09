<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <!-- Header -->
        <div class="text-center">
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Yönetici Girişi
          </h2>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Portfolyo admin paneline giriş yapın
          </p>
        </div>
        
        <!-- Alert for error messages -->
        <Alert 
          v-if="errorMessage" 
          type="error" 
          :message="errorMessage" 
          @close="errorMessage = ''"
        />
        
        <!-- Login Form -->
        <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
          <!-- Email -->
          <div>
            <label for="email" class="form-label">Email Adresi</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="form-input"
              :class="{ 'border-red-500 dark:border-red-500': errors.email }"
              placeholder="admin@example.com"
              autocomplete="email"
            />
            <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
          </div>
          
          <!-- Password -->
          <div>
            <label for="password" class="form-label">Şifre</label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="form-input pr-10"
                :class="{ 'border-red-500 dark:border-red-500': errors.password }"
                placeholder="••••••••"
                autocomplete="current-password"
              />
              <button 
                type="button" 
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
              >
                <svg 
                  v-if="showPassword" 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                <svg 
                  v-else 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="form-error">{{ errors.password }}</p>
          </div>
          
          <!-- Remember Me -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="form.rememberMe"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Beni hatırla
              </label>
            </div>
          </div>
          
          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Giriş yapılıyor...
              </span>
              <span v-else>Giriş Yap</span>
            </button>
          </div>
          
          <div class="text-center mt-4">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Hesabınız yok mu?
              <router-link :to="{ name: 'Register' }" class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                Kayıt Ol
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';
  import Alert from '@/components/ui/Alert.vue';
  
  const router = useRouter();
  const authStore = useAuthStore();
  const isLoading = ref(false);
  const errorMessage = ref('');
  const showPassword = ref(false);
  
  // Form data
  const form = reactive({
    email: '',
    password: '',
    rememberMe: false
  });
  
  // Form validation errors
  const errors = reactive({
    email: '',
    password: ''
  });
  
  // Validate form inputs
  const validateForm = () => {
    let isValid = true;
    
    // Reset errors
    errors.email = '';
    errors.password = '';
    
    // Validate email
    if (!form.email) {
      errors.email = 'Email adresi gereklidir';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      errors.email = 'Geçerli bir email adresi giriniz';
      isValid = false;
    }
    
    // Validate password
    if (!form.password) {
      errors.password = 'Şifre gereklidir';
      isValid = false;
    } else if (form.password.length < 6) {
      errors.password = 'Şifre en az 6 karakter olmalıdır';
      isValid = false;
    }
    
    return isValid;
  };
  
  // Handle login submission
  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }
    
    isLoading.value = true;
    errorMessage.value = '';
    
    try {
      await authStore.login(form.email, form.password);
      router.push({ name: 'AdminDashboard' });
    } catch (error) {
      console.error('Login failed:', error);
      errorMessage.value = error.message || 'Giriş yapılamadı. Lütfen email ve şifrenizi kontrol edin.';
    } finally {
      isLoading.value = false;
    }
  };
  </script>
  