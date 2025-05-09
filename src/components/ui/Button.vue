<template>
    <button
      :type="type"
      :class="buttonClasses"
      :disabled="disabled || loading"
      @click="$emit('click', $event)"
    >
      <!-- Loading Spinner -->
      <span v-if="loading" class="mr-2">
        <svg class="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </span>
      
      <!-- Leading Icon -->
      <span v-if="iconLeft" class="mr-2">
        <slot name="icon-left"></slot>
      </span>
      
      <!-- Content -->
      <span>
        <slot>{{ text }}</slot>
      </span>
      
      <!-- Trailing Icon -->
      <span v-if="iconRight" class="ml-2">
        <slot name="icon-right"></slot>
      </span>
    </button>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
    },
    text: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'submit', 'reset'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    iconLeft: {
      type: Boolean,
      default: false
    },
    iconRight: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    }
  });
  
  defineEmits(['click']);
  
  // Compute button classes based on props
  const buttonClasses = computed(() => {
    const baseClasses = 'inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200';
    
    // Size classes
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-5 py-2.5 text-base',
      xl: 'px-6 py-3 text-lg'
    };
    
    // Variant classes
    const variantClasses = {
      primary: props.outlined
        ? 'border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:ring-blue-500'
        : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
      secondary: props.outlined
        ? 'border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/20 focus:ring-gray-400'
        : 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 focus:ring-gray-400',
      success: props.outlined
        ? 'border border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 focus:ring-green-500'
        : 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
      danger: props.outlined
        ? 'border border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 focus:ring-red-500'
        : 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
      warning: props.outlined
        ? 'border border-yellow-500 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 focus:ring-yellow-500'
        : 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500',
      info: props.outlined
        ? 'border border-blue-400 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:ring-blue-400'
        : 'bg-blue-400 hover:bg-blue-500 text-white focus:ring-blue-400',
      light: props.outlined
        ? 'border border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 focus:ring-gray-300'
        : 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 focus:ring-gray-300',
      dark: props.outlined
        ? 'border border-gray-800 text-gray-800 hover:bg-gray-100 dark:border-gray-200 dark:text-gray-200 dark:hover:bg-gray-800 focus:ring-gray-600'
        : 'bg-gray-800 hover:bg-gray-900 text-white dark:bg-gray-200 dark:hover:bg-gray-100 dark:text-gray-800 focus:ring-gray-600',
      link: 'text-blue-600 hover:text-blue-700 underline dark:text-blue-400 dark:hover:text-blue-300 focus:ring-blue-500'
    };
    
    // Border radius
    const roundedClasses = props.rounded ? 'rounded-full' : 'rounded-md';
    
    // Width
    const widthClasses = props.fullWidth ? 'w-full' : '';
    
    // Disabled state
    const disabledClasses = (props.disabled || props.loading) ? 'opacity-60 cursor-not-allowed' : '';
    
    return [
      baseClasses,
      sizeClasses[props.size],
      variantClasses[props.variant],
      roundedClasses,
      widthClasses,
      disabledClasses,
    ].join(' ');
  });
  </script>
  