<template>
    <div :class="wrapperClass">
      <svg
        :class="spinnerClass"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span v-if="text" :class="[textClass]">{{ text }}</span>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    },
    color: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'light', 'dark'].includes(value)
    },
    text: {
      type: String,
      default: ''
    },
    fullScreen: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: false
    }
  });
  
  // Size classes
  const sizeClass = computed(() => {
    switch (props.size) {
      case 'xs': return 'h-3 w-3';
      case 'sm': return 'h-4 w-4';
      case 'md': return 'h-8 w-8';
      case 'lg': return 'h-12 w-12';
      case 'xl': return 'h-16 w-16';
      default: return 'h-8 w-8';
    }
  });
  
  // Color classes
  const colorClass = computed(() => {
    switch (props.color) {
      case 'primary': return 'text-blue-600 dark:text-blue-500';
      case 'secondary': return 'text-gray-600 dark:text-gray-400';
      case 'success': return 'text-green-600 dark:text-green-500';
      case 'error': return 'text-red-600 dark:text-red-500';
      case 'warning': return 'text-yellow-600 dark:text-yellow-500';
      case 'info': return 'text-blue-400 dark:text-blue-300';
      case 'light': return 'text-gray-300 dark:text-gray-500';
      case 'dark': return 'text-gray-800 dark:text-gray-200';
      default: return 'text-blue-600 dark:text-blue-500';
    }
  });
  
  // Combined spinner classes
  const spinnerClass = computed(() => {
    return [
      'animate-spin', 
      sizeClass.value, 
      colorClass.value
    ].join(' ');
  });
  
  // Text classes
  const textClass = computed(() => {
    return [
      'ml-3 font-medium',
      colorClass.value
    ].join(' ');
  });
  
  // Wrapper classes
  const wrapperClass = computed(() => {
    if (props.fullScreen) {
      return [
        'fixed inset-0 flex flex-col items-center justify-center z-50',
        props.overlay ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm' : ''
      ].join(' ');
    }
    return 'flex items-center justify-center';
  });
  </script>
  