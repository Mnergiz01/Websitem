<template>
  <section class="section bg-gray-50 dark:bg-gray-800">
    <div class="container">
      <div class="max-w-3xl mx-auto text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Projelerim
        </h2>
        <div class="w-20 h-1 bg-blue-600 dark:bg-blue-500 mx-auto mb-6"></div>
        <p class="text-gray-600 dark:text-gray-400">
          Geliştirdiğim en iyi projelerden bazıları
        </p>
      </div>

      <div v-if="isLoading" class="flex justify-center">
        <Spinner size="lg" />
      </div>

      <div v-else-if="projects.length === 0" class="text-center p-8 bg-white dark:bg-gray-700 rounded-lg shadow">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4"
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <p class="text-gray-600 dark:text-gray-400">Henüz proje eklenmemiş.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="project in featuredProjects" :key="project.id"
          class="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2">
          <!-- Project Image -->
          <div class="relative h-48 overflow-hidden">
            <img :src="project.image || getProjectImagePlaceholder(project.id)" :alt="project.title"
              class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-4">
              <span v-for="tag in (project.tags?.split?.(',') || []).slice(0, 3)" :key="tag"
                class="inline-block px-2 py-1 text-xs rounded-full bg-blue-600 text-white mr-2 mb-2">
                {{ tag.trim() }}
              </span>

            </div>
          </div>

          <!-- Project Content -->
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {{ project.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              {{ project.description }}
            </p>
            <div class="mt-4 flex justify-between items-center">
              <router-link :to="{ name: 'ProjectDetail', params: { id: project.id } }"
                class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 font-medium">
                Detayları Gör
              </router-link>
              <a v-if="project.projectUrl" :href="project.projectUrl" target="_blank" rel="noopener noreferrer"
                class="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 text-center">
        <router-link to="/projects" class="btn btn-primary">
          Tüm Projeleri Gör
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useProjectsStore } from '@/stores/projects';
import Spinner from '@/components/ui/Spinner.vue';

const projectsStore = useProjectsStore();

// Load projects data
onMounted(() => {
  projectsStore.fetchProjects();
});

const isLoading = computed(() => {
  return projectsStore.isLoading;
});

const projects = computed(() => {
  return projectsStore.projects;
});

// Show only featured projects on home page (max 3)
const featuredProjects = computed(() => {
  return projects.value
    .filter(project => project.featured)
    .slice(0, 3);
});

// Placeholder image for projects without images
const getProjectImagePlaceholder = (id) => {
  const images = [
    '/src/assets/proje-gorseli-1.svg',
    '/src/assets/proje-gorseli-2.svg',
    '/src/assets/proje-gorseli-3.svg',
    '/src/assets/proje-gorseli-4.svg'
  ];

  // Use the id to deterministically select an image
  const index = parseInt(id, 10) % images.length;
  return images[index];
};
</script>