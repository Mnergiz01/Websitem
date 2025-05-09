<template>
    <section class="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center">
          <!-- Text Content -->
          <div class="md:w-1/2 md:pr-12 mb-8 md:mb-0 animate-fade-in">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              <span class="text-blue-600 dark:text-blue-400">{{ profile.firstName || 'Merhaba' }}</span>, ben 
              <span class="text-blue-600 dark:text-blue-400">{{ profile.lastName || 'Muzaffer' }}</span>.
            </h1>
            <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6">
              {{ profile.headline || 'Profesyonel Yazılım Geliştirici' }}
            </p>
            <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
              {{ profile.summary || 'Yaratıcı çözümler geliştirmeye ve yeni teknolojiler öğrenmeye tutkulu bir yazılım geliştiriciyim. Kullanıcı dostu, ölçeklenebilir ve güvenli uygulamalar oluşturmaya odaklanıyorum.' }}
            </p>
            <div class="flex space-x-4">
              <router-link to="/projects" class="btn btn-primary">
                Projelerimi Gör
              </router-link>
              <a href="#contact" class="btn btn-secondary">
                İletişime Geç
              </a>
            </div>
          </div>
          
          <!-- Profile Image -->
          <div class="md:w-1/2 animate-slide-up">
            <div class="relative mx-auto w-64 h-64 md:w-96 md:h-96">
              <div class="absolute inset-0 bg-blue-600 dark:bg-blue-500 rounded-full opacity-10 transform -rotate-6"></div>
              <div class="absolute inset-0 bg-indigo-600 dark:bg-indigo-500 rounded-full opacity-10 transform rotate-6"></div>
              <div class="relative h-full w-full overflow-hidden rounded-full border-4 border-white dark:border-gray-800 shadow-xl">
                <img 
                  :src="profile.avatar || '/foto5.jpeg'" 
                  alt="Profesyonel Portre" 
                  class="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { computed,onMounted } from 'vue';
  import { useProfileStore } from '@/stores/profile';
  
  const profileStore = useProfileStore();
  
  // Load profile data
  onMounted(() => {
    profileStore.fetchProfile();
  });
  
  const profile = computed(() => {
    return profileStore.profile;
  });
  </script>
  