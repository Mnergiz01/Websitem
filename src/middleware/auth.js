import { useAuthStore } from '@/stores/auth';

/**
 * Authentication middleware
 * Usage:
 * - Import in a component: import { requireAuth } from '@/middleware/auth'
 * - Use in onMounted or beforeRouteEnter: onMounted(() => requireAuth(router))
 *
 * @param {Object} router - Vue Router instance
 * @param {string} redirectRoute - Route to redirect to if not authenticated
 * @returns {boolean} Authentication status
 */
export const requireAuth = (router, redirectRoute = '/admin/login') => {
  const authStore = useAuthStore();
  
  if (!authStore.isAuthenticated) {
    router.push({
      path: redirectRoute,
      query: { redirect: router.currentRoute.value.fullPath }
    });
    return false;
  }
  
  return true;
};

/**
 * Guest only middleware (for login pages)
 * Usage:
 * - Import in a component: import { requireGuest } from '@/middleware/auth'
 * - Use in onMounted or beforeRouteEnter: onMounted(() => requireGuest(router))
 *
 * @param {Object} router - Vue Router instance
 * @param {string} redirectRoute - Route to redirect to if authenticated
 * @returns {boolean} Guest status
 */
export const requireGuest = (router, redirectRoute = '/admin/dashboard') => {
  const authStore = useAuthStore();
  
  if (authStore.isAuthenticated) {
    router.push(redirectRoute);
    return false;
  }
  
  return true;
};

/**
 * Check authentication status
 * This is useful for components that need to check auth status without redirection
 *
 * @returns {Promise<boolean>} Authentication status
 */
export const checkAuth = async () => {
  const authStore = useAuthStore();
  
  if (!authStore.isAuthenticated) {
    await authStore.checkAuth();
  }
  
  return authStore.isAuthenticated;
};
