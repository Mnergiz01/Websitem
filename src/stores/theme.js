import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const isDarkMode = ref(getInitialTheme());
  
  // Watch for changes to theme preference
  watch(isDarkMode, (newValue) => {
    // Update localStorage
    localStorage.setItem('theme', newValue ? 'dark' : 'light');
    
    // Update HTML class for dark mode
    if (newValue) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });
  
  // Toggle theme
  function toggleTheme() {
    isDarkMode.value = !isDarkMode.value;
  }
  
  return {
    isDarkMode,
    toggleTheme
  };
});

// Helper function to determine initial theme
function getInitialTheme() {
  // Check if theme is stored in localStorage
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    return savedTheme === 'dark';
  }
  
  // If not in localStorage, check system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}
