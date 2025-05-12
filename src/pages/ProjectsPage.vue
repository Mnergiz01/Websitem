<template>
    <div class="py-16">
        <div class="container mx-auto px-4">
            <!-- Page Header -->
            <div class="max-w-3xl mx-auto text-center mb-12">
                <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    Projelerim
                </h1>
                <div class="w-20 h-1 bg-blue-600 dark:bg-blue-500 mx-auto mb-6"></div>
                <p class="text-xl text-gray-600 dark:text-gray-400">
                    Geliştirdiğim tüm projeler
                </p>
            </div>

            <!-- Filter Section -->
            <div class="max-w-6xl mx-auto mb-10">
                <div class="flex flex-wrap items-center justify-center mb-6">
                    <span class="text-gray-700 dark:text-gray-300 mr-3 mb-2">Filtrele:</span>
                    <button @click="activeFilter = 'all'" :class="[
                        'px-4 py-2 rounded-full mr-2 mb-2 border transition-colors',
                        activeFilter === 'all'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                    ]">
                        Tümü
                    </button>
                    <button v-for="tag in uniqueTags" :key="tag" @click="activeFilter = tag" :class="[
                        'px-4 py-2 rounded-full mr-2 mb-2 border transition-colors',
                        activeFilter === tag
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                    ]">
                        {{ tag }}
                    </button>
                </div>

                <!-- Search Box -->
                <div class="max-w-md mx-auto mb-8">
                    <div class="relative">
                        <input v-model="searchQuery" type="text"
                            class="w-full px-4 py-3 pl-10 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                            placeholder="Proje ara..." />
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <button v-if="searchQuery" @click="searchQuery = ''"
                            class="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="flex justify-center items-center py-20">
                <Spinner size="lg" />
            </div>

            <!-- No Projects State -->
            <div v-else-if="projects.length === 0"
                class="flex flex-col items-center justify-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 dark:text-gray-500 mb-4"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p class="text-lg text-gray-600 dark:text-gray-400">Henüz proje eklenmemiş.</p>
            </div>

            <!-- No Results State -->
            <div v-else-if="filteredProjects.length === 0"
                class="flex flex-col items-center justify-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 dark:text-gray-500 mb-4"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-lg text-gray-600 dark:text-gray-400">Aramanızla eşleşen proje bulunamadı.</p>
                <button @click="resetFilters"
                    class="mt-4 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Filtreleri Temizle
                </button>
            </div>

            <!-- Projects Grid -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                <div v-for="project in filteredProjects" :key="project.id"
                    class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2">
                    <!-- Project Image -->
                    <div class="relative h-52 overflow-hidden">
                        <img :src="project.image_url || getProjectImagePlaceholder(project.id)" :alt="project.title"
                            class="w-full h-full object-cover" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div class="absolute bottom-0 left-0 right-0 p-4">
                            <span v-for="tag in (project.tags ? project.tags.split(',').slice(0, 3) : [])" :key="tag"
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
                            <a v-if="project.projectUrl" :href="project.projectUrl" target="_blank"
                                rel="noopener noreferrer"
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
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useProjectsStore } from '@/stores/projects';
import Spinner from '@/components/ui/Spinner.vue';

const projectsStore = useProjectsStore();
const searchQuery = ref('');
const activeFilter = ref('all');

// Fetch projects on component mount
onMounted(() => {
    projectsStore.fetchProjects();
});

const isLoading = computed(() => {
    return projectsStore.isLoading;
});

const projects = computed(() => {
    return projectsStore.projects;
});

// Extract unique tags from all projects
const uniqueTags = computed(() => {
    const allTags = new Set();

    projects.value.forEach(project => {
        if (project.tags) {
            project.tags.split(',').forEach(tag => {
                allTags.add(tag.trim());
            });
        }
    });

    return Array.from(allTags).sort();
});

// Filter projects based on search query and tag filter
const filteredProjects = computed(() => {
    let result = [...projects.value];

    // Apply tag filter
    if (activeFilter.value !== 'all') {
        result = result.filter(project => {
            return project.tags && project.tags
                .split(',')
                .map(tag => tag.trim())
                .includes(activeFilter.value);
        });
    }

    // Apply search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(project => {
            return (
                project.title.toLowerCase().includes(query) ||
                project.description.toLowerCase().includes(query) ||
                (project.tags && project.tags.toLowerCase().includes(query))
            );
        });
    }

    return result;
});

// Reset all filters
const resetFilters = () => {
    searchQuery.value = '';
    activeFilter.value = 'all';
};

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