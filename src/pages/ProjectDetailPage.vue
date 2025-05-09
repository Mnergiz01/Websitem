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
                <div class="flex flex-col md:flex-row items-start mb-10 gap-8">
                    <!-- Project Image -->
                    <div class="w-full md:w-2/5">
                        <div
                            class="relative rounded-xl overflow-hidden shadow-xl h-80 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                            <template v-if="project.image_url">
                                <img :src="project.image_url" :alt="project.title" class="w-full h-full object-cover" />
                            </template>
                            <template v-else>
                                <div class="text-gray-400 dark:text-gray-500 text-center p-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p class="mt-2">Proje görseli yok</p>
                                </div>
                            </template>
                        </div>
                    </div>

                    <!-- Project Info -->
                    <div class="w-full md:w-3/5">
                        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {{ project.title }}
                        </h1>

                        <!-- Featured Badge -->
                        <div v-if="project.featured" class="mb-4">
                            <span
                                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                Öne Çıkan Proje
                            </span>
                        </div>

                        <!-- Short Description -->
                        <div v-if="project.short_description"
                            class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                            <p class="text-blue-800 dark:text-blue-200">
                                {{ project.short_description }}
                            </p>
                        </div>

                        <!-- Project Metadata Section -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <!-- Links Section -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                    Proje Linkleri
                                </h3>

                                <div v-if="project.project_url" class="mb-4">
                                    <div class="flex items-start">
                                        <span
                                            class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm px-3 py-1 rounded mr-3 mt-1">Live</span>
                                        <div>
                                            <a :href="project.project_url" target="_blank" rel="noopener noreferrer"
                                                class="text-blue-600 dark:text-blue-400 hover:underline break-all">
                                                {{ project.project_url }}
                                            </a>
                                            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Canlı proje linki
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="project.github_url" class="flex items-start">
                                    <span
                                        class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm px-3 py-1 rounded mr-3 mt-1">GitHub</span>
                                    <div>
                                        <a :href="project.github_url" target="_blank" rel="noopener noreferrer"
                                            class="text-blue-600 dark:text-blue-400 hover:underline break-all">
                                            {{ project.github_url }}
                                        </a>
                                        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Projenin kaynak kodları
                                        </p>
                                    </div>
                                </div>
                                <div v-if="!project.project_url && !project.github_url"
                                    class="text-gray-500 dark:text-gray-400 text-sm">
                                    Proje linkleri bulunmamaktadır
                                </div>
                            </div>

                            <!-- Technologies Section -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-green-500"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Kullanılan Teknolojiler
                                </h3>

                                <div v-if="hasTechStack" class="flex flex-wrap gap-2">
                                    <span v-for="(tech, index) in formattedTechStack" :key="index"
                                        class="inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm">
                                        {{ tech }}
                                    </span>
                                </div>
                                <div v-else class="text-gray-500 dark:text-gray-400 text-sm">
                                    Teknoloji bilgisi girilmemiş
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Project Description -->
                <div v-if="project.description" class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-10">
                    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        Proje Açıklaması
                    </h2>
                    <div class="prose prose-lg dark:prose-invert max-w-none">
                        {{ project.description }}
                    </div>
                </div>

                <!-- Other Projects -->
                <div class="mt-16">
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
                            <div
                                class="h-40 overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                <template v-if="relatedProject.image_url">
                                    <img :src="relatedProject.image_url" :alt="relatedProject.title"
                                        class="w-full h-full object-cover" />
                                </template>
                                <template v-else>
                                    <div class="text-gray-400 dark:text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </template>
                            </div>
                            <div class="p-4">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    {{ relatedProject.title }}
                                </h3>
                                <p v-if="relatedProject.short_description"
                                    class="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                                    {{ relatedProject.short_description }}
                                </p>
                                <div v-if="relatedProject.tech_stack" class="mb-3">
                                    <span v-for="tag in formattedTechStack(relatedProject.tech_stack).slice(0, 2)"
                                        :key="tag"
                                        class="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 mr-1 mb-1">
                                        {{ tag }}
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

// Format tech stack data
// Format tech stack data - GÜNCELLENDİ
const formattedTechStack = computed(() => {
    if (!project.value?.tech_stack) return [];

    // Eğer tech_stack string ise (virgülle ayrılmış)
    if (typeof project.value.tech_stack === 'string') {
        return project.value.tech_stack
            .split(',')
            .map(tech => tech.trim())
            .filter(tech => tech.length > 0);
    }
    // Eğer tech_stack array ise
    else if (Array.isArray(project.value.tech_stack)) {
        return project.value.tech_stack;
    }
    // Diğer durumlar
    return [];
});

// Computed properties - GÜNCELLENDİ
const project = computed(() => {
    if (!projectsStore.currentProject) return null;
    return projectsStore.currentProject;
});

const hasTechStack = computed(() => {
    return formattedTechStack.value.length > 0;
});

const relatedProjects = computed(() => {
    if (!project.value || !projectsStore.projects.length) return [];

    return projectsStore.projects
        .filter(p => p.id !== project.value.id)
        .sort((a, b) => {
            // Featured projects first
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            // Then by order_index
            return (a.order_index || 0) - (b.order_index || 0);
        })
        .slice(0, 3);
});

// Load project data
const loadProject = async () => {
    try {
        isLoading.value = true;
        error.value = null;
        const projectId = route.params.id;
        await projectsStore.fetchProjectById(projectId);
    } catch (err) {
        console.error("Error loading project:", err);
        error.value = err;
    } finally {
        isLoading.value = false;
    }
};

// Lifecycle hooks
onMounted(() => {
    loadProject();
});

watch(() => route.params.id, () => {
    loadProject();
});
</script>