<template>
    <header class="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <router-link to="/" class="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Muzaffer Nergiz
          </router-link>
          
          <!-- Mobile Menu Button -->
          <button 
            @click="isMenuOpen = !isMenuOpen" 
            class="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center space-x-8">
            <router-link 
              v-for="item in navItems" 
              :key="item.path" 
              :to="item.path"
              class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              {{ item.name }}
            </router-link>
            
            <ThemeToggle />
            
            <div v-if="isAuthenticated">
              <router-link 
                to="/admin/dashboard" 
                class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500"
              >
                Admin Panel
              </router-link>
            </div>
          </div>
        </div>
        
        <!-- Mobile Menu -->
        <div 
          v-if="isMenuOpen" 
          class="md:hidden mt-4 pb-4 space-y-4 animate-fade-in"
        >
          <router-link 
            v-for="item in navItems" 
            :key="item.path" 
            :to="item.path"
            class="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            @click="isMenuOpen = false"
          >
            {{ item.name }}
          </router-link>
          
          <div v-if="isAuthenticated" class="py-2">
            <router-link 
              to="/admin/dashboard" 
              class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500"
              @click="isMenuOpen = false"
            >
              Admin Panel
            </router-link>
          </div>
          
          <div class="pt-2 flex justify-between items-center border-t border-gray-200 dark:border-gray-700">
            <span class="text-sm text-gray-500 dark:text-gray-400">Tema</span>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  </template>
  
  <script setup>
  import { ref, computed , watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';
  import ThemeToggle from '@/components/shared/ThemeToggle.vue';
  
  const isMenuOpen = ref(false);
  const authStore = useAuthStore();
  const route = useRoute();
  
  const isAuthenticated = computed(() => {
    return authStore.isAuthenticated;
  });
  
  const navItems = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Projeler', path: '/projects' },
    { name: 'İletişim', path: '/#contact' }
  ];
  
  // Close menu on route change
  watch(
    () => route.path,
    () => {
      isMenuOpen.value = false;
    }
  );
  </script>
  