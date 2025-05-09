import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { supabase } from '@/services/supabase';

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  
  // Computed
  const isAuthenticated = computed(() => !!user.value);
  
  // Actions
  async function login(email, password) {
    isLoading.value = true;
    error.value = null;
    
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (authError) throw authError;
      
      user.value = data.user;
      return data.user;
    } catch (err) {
      error.value = err.message || 'Login failed';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }
  
  async function logout() {
    isLoading.value = true;
    error.value = null;
    
    try {
      const { error: authError } = await supabase.auth.signOut();
      
      if (authError) throw authError;
      
      user.value = null;
    } catch (err) {
      error.value = err.message || 'Logout failed';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }
  
  async function checkAuth() {
    isLoading.value = true;
    
    try {
      const { data } = await supabase.auth.getSession();
      
      if (data && data.session) {
        user.value = data.session.user;
      } else {
        user.value = null;
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      user.value = null;
    } finally {
      isLoading.value = false;
    }
  }
  
  async function register(email, password) {
    isLoading.value = true;
    error.value = null;
    
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password
      });
      
      if (authError) throw authError;
      
      return data;
    } catch (err) {
      error.value = err.message || 'Registration failed';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }
  
  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
    checkAuth,
    register
  };
});
