<template>
    <div class="py-16">
        <div class="container mx-auto px-4">
            <!-- Loading State -->
            <div v-if="isLoading" class="flex justify-center items-center py-24">
                <Spinner size="lg" />
            </div>

            <!-- Error State -->
            <div v-else-if="error"
                class="max-w-3xl mx-auto bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-red-500 mb-4" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h2 class="text-2xl font-semibold text-red-800 dark:text-red-200 mb-2">
                    Proje Bulunamadı
                </h2>
                <p class="text-red-700 dark:text-red-300 mb-6">
                    İstediğiniz proje bulunamadı veya bir hata oluştu.
                </p>
                <router-link to="/projects"
                    class="inline-block px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                    Projelere Dön
                </router-link>
            </div>

            <!-- Project Detail -->
            <div v-else-if="project" class="max-w-7xl mx-auto">
                <!-- Back Button -->
                <div class="mb-6">
                    <router-link to="/projects"
                        class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Projelere Dön
                    </router-link>
                </div>

                <!-- Project Header -->
                <div class="flex flex-col md:flex-row items-start mb-10">
                    <!-- Project Image -->
                    <div class="w-full md:w-2/5 mb-6 md:mb-0 md:pr-8">
                        <div class="relative rounded-xl overflow-hidden shadow-xl h-80">
                            <img :src="project.image || getProjectImagePlaceholder(project.id)" :alt="project.title"
                                class="w-full h-full object-cover" />
                        </div>
                    </div>

                    <!-- Project Info -->
                    <div class="w-full md:w-3/5">
                        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {{ project.title }}
                        </h1>

                        <!-- Tags -->
                        <div class="mb-6">
                            <span v-for="tag in (project.tags || '').split(',')" :key="tag"
                                class="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 mr-2 mb-2">
                                {{ tag.trim() }}
                            </span>
                        </div>

                        <!-- Links -->
                        <div class="flex flex-wrap mb-6">
                            <a v-if="project.projectUrl" :href="project.projectUrl" target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg mr-3 mb-3 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                                Canlı Demo
                            </a>

                            <a v-if="project.sourceCodeUrl" :href="project.sourceCodeUrl" target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg mb-3 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                Kaynak Kodu
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Project Description -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-10">
                    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        Proje Açıklaması
                    </h2>
                    <div class="prose prose-lg dark:prose-invert max-w-none">
                        <p class="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                            {{ project.description }}
                        </p>
                    </div>
                </div>

                <!-- Other Projects -->
                <div>
                    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                        Diğer Projeler
                    </h2>

                    <div v-if="relatedProjects.length === 0"
                        class="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <p class="text-gray-600 dark:text-gray-400">Başka proje bulunmuyor.</p>
                    </div>

                    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div v-for="relatedProject in relatedProjects" :key="relatedProject.id"
                            class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:-translate-y-1">
                            <div class="h-40 overflow-hidden">
                                <img :src="relatedProject.image || getProjectImagePlaceholder(relatedProject.id)"
                                    :alt="relatedProject.title" class="w-full h-full object-cover" />
                            </div>
                            <div class="p-4">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    {{ relatedProject.title }}
                                </h3>
                                <div class="mb-3">
                                    <span v-for="tag in (relatedProject.tags || '').split(',').slice(0, 2)" :key="tag"
                                        class="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 mr-1 mb-1">
                                        {{ tag.trim() }}
                                    </span>
                                </div>
                                <router-link :to="{ name: 'ProjectDetail', params: { id: relatedProject.id } }"
                                    class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 text-sm font-medium">
                                    Detayları Gör →
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useProjectsStore } from '@/stores/projects';
import Spinner from '@/components/ui/Spinner.vue';

const route = useRoute();
const projectsStore = useProjectsStore();
const isLoading = ref(true);
const error = ref(null);

// Load project details on mount
onMounted(async () => {
    await loadProject();
});

// Watch for route changes to reload project when navigating between project details
watch(() => route.params.id, async () => {
    isLoading.value = true;
    await loadProject();
});

// Load project data
const loadProject = async () => {
    try {
        const projectId = route.params.id;
        await projectsStore.fetchProjectById(projectId);
        error.value = null;
    } catch (err) {
        console.error("Error loading project:", err);
        error.value = err;
    } finally {
        isLoading.value = false;
    }
};

// Current project
const project = computed(() => {
    return projectsStore.currentProject;
});

// Get related projects (up to 3 different projects with similar tags)
const relatedProjects = computed(() => {
    if (!project.value || !projectsStore.projects.length) return [];

    // Extract current project tags
    const currentTags = project.value.tags ? project.value.tags.split(',').map(tag => tag.trim()) : [];

    // Filter and score other projects based on tag similarity
    return projectsStore.projects
        .filter(p => p.id !== project.value.id) // Exclude current project
        .map(p => {
            const projectTags = p.tags ? p.tags.split(',').map(tag => tag.trim()) : [];
            // Count how many matching tags
            const matchingTags = projectTags.filter(tag => currentTags.includes(tag)).length;
            return { ...p, score: matchingTags };
        })
        .sort((a, b) => b.score - a.score) // Sort by most matching tags
        .slice(0, 3); // Limit to 3 projects
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