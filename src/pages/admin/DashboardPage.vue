<template>
    <div class="p-6">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          Admin Paneli
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Portfolyo içeriğinizi buradan yönetebilirsiniz.
        </p>
      </div>
      
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <!-- Projects -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center">
          <div class="rounded-full w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">Projeler</div>
            <div class="text-2xl font-semibold text-gray-900 dark:text-white">{{ stats.projects }}</div>
          </div>
        </div>
        
        <!-- Experiences -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center">
          <div class="rounded-full w-12 h-12 flex items-center justify-center bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">İş Deneyimleri</div>
            <div class="text-2xl font-semibold text-gray-900 dark:text-white">{{ stats.experiences }}</div>
          </div>
        </div>
        
        <!-- Skills -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center">
          <div class="rounded-full w-12 h-12 flex items-center justify-center bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">Yetenekler</div>
            <div class="text-2xl font-semibold text-gray-900 dark:text-white">{{ stats.skills }}</div>
          </div>
        </div>
        
        <!-- Messages (placeholder for future feature) -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center">
          <div class="rounded-full w-12 h-12 flex items-center justify-center bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div>
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">Mesajlar</div>
            <div class="text-2xl font-semibold text-gray-900 dark:text-white">0</div>
          </div>
        </div>
      </div>
      
      <!-- Quick Actions -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Hızlı İşlemler
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <router-link 
            :to="{ name: 'AdminProjects' }" 
            class="flex flex-col items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Yeni Proje</span>
          </router-link>
          
          <router-link 
            :to="{ name: 'AdminExperiences' }" 
            class="flex flex-col items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600 dark:text-green-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Yeni Deneyim</span>
          </router-link>
          
          <router-link 
            :to="{ name: 'AdminSkills' }" 
            class="flex flex-col items-center justify-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Yeni Yetenek</span>
          </router-link>
          
          <router-link 
            :to="{ name: 'AdminProfile' }" 
            class="flex flex-col items-center justify-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-amber-600 dark:text-amber-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Profil Düzenle</span>
          </router-link>
        </div>
      </div>
      
      <!-- Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Projects -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              Son Projeler
            </h2>
            <router-link 
              :to="{ name: 'AdminProjects' }" 
              class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Tümünü Gör
            </router-link>
          </div>
          
          <div v-if="isLoading" class="py-8 flex justify-center">
            <Spinner />
          </div>
          
          <div v-else-if="recentProjects.length === 0" class="py-8 text-center">
            <p class="text-gray-500 dark:text-gray-400">Henüz proje eklenmemiş.</p>
          </div>
          
          <div v-else class="space-y-3">
            <div 
              v-for="project in recentProjects" 
              :key="project.id"
              class="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
            >
              <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-md flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {{ project.title }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ formatTags(project.tags) }}
                </p>
              </div>
              <router-link 
                :to="{ name: 'AdminProjects', query: { edit: project.id } }" 
                class="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
        
        <!-- Recent Experiences -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              Son İş Deneyimleri
            </h2>
            <router-link 
              :to="{ name: 'AdminExperiences' }" 
              class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Tümünü Gör
            </router-link>
          </div>
          
          <div v-if="isLoading" class="py-8 flex justify-center">
            <Spinner />
          </div>
          
          <div v-else-if="recentExperiences.length === 0" class="py-8 text-center">
            <p class="text-gray-500 dark:text-gray-400">Henüz deneyim eklenmemiş.</p>
          </div>
          
          <div v-else class="space-y-3">
            <div 
              v-for="experience in recentExperiences" 
              :key="experience.id"
              class="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
            >
              <div class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-md flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {{ experience.title }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ experience.company }}
                </p>
              </div>
              <router-link 
                :to="{ name: 'AdminExperiences', query: { edit: experience.id } }" 
                class="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed, onMounted } from 'vue';
  import { useProjectsStore } from '@/stores/projects';
  import { useExperiencesStore } from '@/stores/experiences';
  import { useSkillsStore } from '@/stores/skills';
  import Spinner from '@/components/ui/Spinner.vue';
  
  const projectsStore = useProjectsStore();
  const experiencesStore = useExperiencesStore();
  const skillsStore = useSkillsStore();
  const isLoading = ref(true);
  
  // Stats data
  const stats = reactive({
    projects: 0,
    experiences: 0,
    skills: 0
  });
  
  // Fetch all data on component mount
  onMounted(async () => {
    try {
      await Promise.all([
        projectsStore.fetchProjects(),
        experiencesStore.fetchExperiences(),
        skillsStore.fetchSkills()
      ]);
      
      // Update stats
      stats.projects = projectsStore.projects.length;
      stats.experiences = experiencesStore.experiences.length;
      stats.skills = skillsStore.skills.length;
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      isLoading.value = false;
    }
  });
  
  // Get recent projects (up to 5)
  const recentProjects = computed(() => {
    return [...projectsStore.projects]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 5);
  });
  
  // Get recent experiences (up to 5)
  const recentExperiences = computed(() => {
    return [...experiencesStore.experiences]
      .sort((a, b) => new Date(b.startDate || 0) - new Date(a.startDate || 0))
      .slice(0, 5);
  });
  
  // Format tags for display (show first 2 tags)
  const formatTags = (tags) => {
    if (!tags) return '';
    
    const tagArray = tags.split(',').map(tag => tag.trim());
    if (tagArray.length <= 2) {
      return tagArray.join(', ');
    }
    
    return `${tagArray.slice(0, 2).join(', ')} +${tagArray.length - 2}`;
  };
  </script>
  