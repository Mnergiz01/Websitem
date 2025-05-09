<template>
  <div class="min-h-screen flex flex-col">
    <Navbar v-if="!isAdminRoute || isLoggedIn" />
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer v-if="!isAdminRoute || isLoggedIn" />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import Navbar from '@/components/layout/Navbar.vue';
import Footer from '@/components/layout/Footer.vue';

const route = useRoute();
const authStore = useAuthStore();

// Check if route is in admin section
const isAdminRoute = computed(() => {
  return route.path.includes('/admin');
});

// Check if user is logged in
const isLoggedIn = computed(() => {
  return authStore.isAuthenticated;
});

// Check authentication status on mount
onMounted(async () => {
  await authStore.checkAuth();
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
