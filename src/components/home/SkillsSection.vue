<template>
    <section class="section bg-gray-50 dark:bg-gray-800">
      <div class="container">
        <div class="max-w-3xl mx-auto text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Yeteneklerim
          </h2>
          <div class="w-20 h-1 bg-blue-600 dark:bg-blue-500 mx-auto mb-6"></div>
          <p class="text-gray-600 dark:text-gray-400">
            Uzmanlık alanlarım ve teknik becerilerim
          </p>
        </div>
        
        <div v-if="isLoading" class="flex justify-center">
          <Spinner size="lg" />
        </div>
        
        <div v-else>
          <!-- Skill Categories -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              v-for="category in skillCategories" 
              :key="category.name"
              class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6"
            >
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path v-if="category.name === 'Frontend'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    <path v-else-if="category.name === 'Backend'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    <path v-else-if="category.name === 'Diğer'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {{ category.name }}
                </h3>
              </div>
              
              <div class="space-y-4">
                <div 
                  v-for="skill in category.skills" 
                  :key="skill.id"
                  class="mb-4"
                >
                  <div class="flex justify-between mb-1">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">{{ skill.name }}</span>
                    <span class="text-gray-500 dark:text-gray-400 text-sm">{{ skill.level }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div 
                      class="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full" 
                      :style="{ width: `${skill.level}%` }"
                    ></div>
                  </div>
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
  import { useSkillsStore } from '@/stores/skills';
  import Spinner from '@/components/ui/Spinner.vue';
  
  const skillsStore = useSkillsStore();
  
  // Load skills data
  onMounted(() => {
    skillsStore.fetchSkills();
  });
  
  const isLoading = computed(() => {
    return skillsStore.isLoading;
  });
  
  // Group skills by category
  const skillCategories = computed(() => {
    const categories = {};
    
    skillsStore.skills.forEach(skill => {
      if (!categories[skill.category]) {
        categories[skill.category] = {
          name: skill.category,
          skills: []
        };
      }
      
      categories[skill.category].skills.push(skill);
    });
    
    // Convert to array and sort skills by level (highest first)
    return Object.values(categories).map(category => {
      category.skills.sort((a, b) => b.level - a.level);
      return category;
    });
  });
  </script>
  