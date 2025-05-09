<template>
    <footer class="bg-gray-100 dark:bg-gray-800 py-8">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <!-- Logo & Copyright -->
          <div class="mb-4 md:mb-0">
            <div class="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
              Muzaffer Nergiz
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              &copy; {{ currentYear }} Tüm hakları saklıdır.
            </p>
          </div>
          
          <!-- Social Links -->
          <div class="flex space-x-4">
            <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </a>
            <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </a>
            <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Navigation -->
        <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="flex flex-wrap justify-center space-x-4 md:space-x-8">
            <router-link 
              to="/" 
              class="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-2"
            >
              Ana Sayfa
            </router-link>
            <router-link 
              to="/projects" 
              class="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-2"
            >
              Projeler
            </router-link>
            <a 
              href="#about" 
              class="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-2"
            >
              Hakkımda
            </a>
            <a 
              href="#contact" 
              class="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-2"
            >
              İletişim
            </a>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const currentYear = computed(() => {
    return new Date().getFullYear();
  });
  </script>
  