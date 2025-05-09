<template>
    <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
      <div class="max-w-md w-full text-center">
        <!-- Error Code -->
        <h1 class="text-9xl font-bold text-blue-600 dark:text-blue-400">404</h1>
        
        <!-- Error Message -->
        <h2 class="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">
          Sayfa Bulunamadı
        </h2>
        <p class="mt-3 text-lg text-gray-600 dark:text-gray-400">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        
        <!-- Illustration -->
        <div class="mt-6 flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-40 w-40 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <!-- Back Button -->
        <div class="mt-6">
          <router-link 
            to="/" 
            class="inline-flex items-center px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Ana Sayfaya Dön
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // No additional logic needed
  </script>
  