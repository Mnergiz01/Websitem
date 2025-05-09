<template>
    <section class="section bg-white dark:bg-gray-900">
        <div class="container">
            <div class="max-w-3xl mx-auto text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    İş Deneyimim
                </h2>
                <div class="w-20 h-1 bg-blue-600 dark:bg-blue-500 mx-auto mb-6"></div>
                <p class="text-gray-600 dark:text-gray-400">
                    Profesyonel kariyerimde öne çıkan deneyimlerim
                </p>
            </div>

            <div v-if="isLoading" class="flex justify-center">
                <Spinner size="lg" />
            </div>

            <div v-else-if="experiences.length === 0"
                class="text-center p-8 bg-white dark:bg-gray-700 rounded-lg shadow">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p class="text-gray-600 dark:text-gray-400">Henüz deneyim eklenmemiş.</p>
            </div>

            <div v-else class="relative max-w-4xl mx-auto">
                <!-- Timeline Line -->
                <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200 dark:bg-blue-900">
                </div>

                <!-- Timeline Items -->
                <div class="space-y-12">
                    <div v-for="(experience, index) in experiences" :key="experience.id" class="relative">
                        <!-- Timeline Dot -->
                        <div
                            class="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 w-8 h-8 rounded-full border-4 border-white dark:border-gray-900 bg-blue-600 dark:bg-blue-500 z-10">
                        </div>

                        <!-- Content -->
                        <div :class="[
                            'flex flex-col md:flex-row items-center',
                            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                        ]">
                            <!-- Date -->
                            <div class="md:w-5/12 mb-4 md:mb-0 text-center md:text-right md:pr-12"
                                :class="{ 'md:text-left md:pl-12 md:pr-0': index % 2 !== 0 }">
                                <span
                                    class="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg font-medium">
                                    {{ formatDate(experience.startDate) }} - {{ experience.endDate ?
                                        formatDate(experience.endDate) : 'Şu anda' }}
                                </span>
                            </div>

                            <!-- Experience Card -->
                            <div class="md:w-7/12 bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                                <div class="flex items-start">
                                    <div class="flex-shrink-0 mr-4">
                                        <div
                                            class="w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded-md flex items-center justify-center">
                                            <img v-if="experience.companyLogo" :src="experience.companyLogo"
                                                :alt="experience.company" class="w-8 h-8 object-contain" />
                                            <svg v-else xmlns="http://www.w3.org/2000/svg"
                                                class="h-6 w-6 text-gray-500 dark:text-gray-400" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                                            {{ experience.title }}
                                        </h3>
                                        <p class="text-blue-600 dark:text-blue-400 font-medium mb-3">
                                            {{ experience.company }}
                                            <span v-if="experience.location"
                                                class="text-gray-500 dark:text-gray-400 font-normal">
                                                • {{ experience.location }}
                                            </span>
                                        </p>
                                        <p class="text-gray-600 dark:text-gray-300">
                                            {{ experience.description }}
                                        </p>

                                        <!-- Skills Used -->
                                        <div v-if="experience.skills" class="mt-4">
                                            <div class="flex flex-wrap">
                                                <span v-for="skill in experience.skills.split(',').map(s => s.trim())"
                                                    :key="skill"
                                                    class="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full mr-2 mb-2">
                                                    {{ skill }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
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
import { useExperiencesStore } from '@/stores/experiences';
import Spinner from '@/components/ui/Spinner.vue';

const experiencesStore = useExperiencesStore();

// Load experiences data
onMounted(() => {
    experiencesStore.fetchExperiences();
});

const isLoading = computed(() => {
    return experiencesStore.isLoading;
});

const experiences = computed(() => {
    // Sort by date (newest first)
    return [...experiencesStore.experiences].sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return dateB - dateA;
    });
});

// Format date for display
const formatDate = (dateString) => {
    if (!dateString || typeof dateString !== 'string') return '';

    // Tarih formatı düzeltici
    const correctedDate = new Date(dateString);
    if (isNaN(correctedDate.getTime())) return '';

    return new Intl.DateTimeFormat('tr-TR', {
        year: 'numeric',
        month: 'long'
    }).format(correctedDate);
};


</script>