<template>
    <section id="about" class="section bg-white dark:bg-gray-900">
      <div class="container">
        <div class="max-w-3xl mx-auto text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Hakkımda
          </h2>
          <div class="w-20 h-1 bg-blue-600 dark:bg-blue-500 mx-auto mb-6"></div>
        </div>
        
        <div class="flex flex-col md:flex-row items-center">
          <!-- Image Side -->
          <div class="md:w-2/5 mb-8 md:mb-0">
            <div class="relative">
              <!-- Decorative elements -->
              <div class="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-lg opacity-50"></div>
              <div class="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-100 dark:bg-indigo-900 rounded-lg opacity-50"></div>
              
              <!-- Main image -->
              <div class="relative z-10 rounded-lg overflow-hidden shadow-xl">
                <img 
                  :src="profile.aboutImage || '/public/foto4.jpeg'" 
                  alt="Hakkımda Resmi" 
                  class="w-full h-auto"
                />
              </div>
            </div>
          </div>
          
          <!-- Content Side -->
          <div class="md:w-3/5 md:pl-12">
            <div class="prose prose-lg dark:prose-invert max-w-none">
              <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                {{ profile.aboutTitle || 'Yazılım Geliştirme Tutkum' }}
              </h3>
              
              <div v-if="profile.aboutContent" v-html="profile.aboutContent"></div>
              <div v-else>
                <p>
                  Merhaba! Ben bir yazılım geliştiriciyim ve teknoloji dünyasında 5+ yıllık deneyime sahibim. 
                  Web uygulamaları geliştirme konusunda uzmanlaşmış olup, kullanıcı deneyimini ön planda tutan, 
                  performanslı ve güvenli çözümler üretmeye odaklanıyorum.
                </p>
                <p>
                  Frontend teknolojilerinde (Vue.js, React, JavaScript) ve backend geliştirmede (Node.js, PHP, Python) 
                  geniş bir yelpazede deneyime sahibim. Sürekli kendimi geliştirmeye ve yeni teknolojileri 
                  öğrenmeye büyük önem veriyorum.
                </p>
              </div>
              
              <!-- Personal Info -->
              <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                    </svg>
                  </div>
                  <span class="ml-3 text-gray-700 dark:text-gray-300">
                    {{ profile.birthDate || '25.10.2002' }}
                  </span>
                </div>
                
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span class="ml-3 text-gray-700 dark:text-gray-300">
                    {{ profile.email || 'contact@example.com' }}
                  </span>
                </div>
                
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span class="ml-3 text-gray-700 dark:text-gray-300">
                    {{ profile.location || 'Kahramanmaraş, Türkiye' }}
                  </span>
                </div>
                
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span class="ml-3 text-gray-700 dark:text-gray-300">
                    {{ profile.jobTitle || 'Juinor Yazılım Geliştirici' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { computed, onMounted } from 'vue';
  import { useProfileStore } from '@/stores/profile';
  
  const profileStore = useProfileStore();
  
  // Load profile data
  onMounted(() => {
    if (!profileStore.isLoaded) {
      profileStore.fetchProfile();
    }
  });
  
  const profile = computed(() => {
    return profileStore.profile;
  });
  </script>
  