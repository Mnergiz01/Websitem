<template>
    <div 
      v-if="show" 
      ref="alert"
      :class="[
        'p-4 rounded-md border',
        typeClasses,
        dismissible ? 'pr-12' : '',
        className
      ]"
      role="alert"
    >
      <!-- Alert Icon -->
      <div v-if="icon" class="flex items-start">
        <div class="flex-shrink-0">
          <svg 
            v-if="type === 'success'" 
            class="h-5 w-5 text-green-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          
          <svg 
            v-else-if="type === 'error'" 
            class="h-5 w-5 text-red-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          
          <svg 
            v-else-if="type === 'warning'" 
            class="h-5 w-5 text-yellow-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          
          <svg 
            v-else-if="type === 'info'" 
            class="h-5 w-5 text-blue-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
  
          <slot name="icon"></slot>
        </div>
        
        <div class="ml-3">
          <!-- Alert Title -->
          <h3 v-if="title" class="text-sm font-medium" :class="textColorClass">
            {{ title }}
          </h3>
          
          <!-- Alert Message -->
          <div class="text-sm" :class="[title ? 'mt-2' : '', textColorClass]">
            <p v-if="message">{{ message }}</p>
            <slot></slot>
          </div>
        </div>
      </div>
      
      <!-- Alert without icon -->
      <div v-else>
        <!-- Alert Title -->
        <h3 v-if="title" class="text-sm font-medium" :class="textColorClass">
          {{ title }}
        </h3>
        
        <!-- Alert Message -->
        <div class="text-sm" :class="[title ? 'mt-2' : '', textColorClass]">
          <p v-if="message">{{ message }}</p>
          <slot></slot>
        </div>
      </div>
      
      <!-- Dismiss Button -->
      <button 
        v-if="dismissible" 
        @click="dismiss" 
        type="button" 
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none"
        aria-label="Close"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  
  const props = defineProps({
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    icon: {
      type: Boolean,
      default: true
    },
    dismissible: {
      type: Boolean,
      default: false
    },
    autoClose: {
      type: [Boolean, Number],
      default: false
    },
    visible: {
      type: Boolean,
      default: true
    },
    className: {
      type: String,
      default: ''
    }
  });
  
  const emit = defineEmits(['close']);
  
  const show = ref(props.visible);
  const alert = ref(null);
  
  // Type-based classes
  const typeClasses = computed(() => {
    switch (props.type) {
      case 'success':
        return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800';
    }
  });
  
  // Text color based on type
  const textColorClass = computed(() => {
    switch (props.type) {
      case 'success':
        return 'text-green-800 dark:text-green-200';
      case 'error':
        return 'text-red-800 dark:text-red-200';
      case 'warning':
        return 'text-yellow-800 dark:text-yellow-200';
      case 'info':
      default:
        return 'text-blue-800 dark:text-blue-200';
    }
  });
  
  const dismiss = () => {
    show.value = false;
    emit('close');
  };
  
  onMounted(() => {
    if (props.autoClose) {
      const timeout = typeof props.autoClose === 'number' ? props.autoClose : 5000;
      setTimeout(() => {
        dismiss();
      }, timeout);
    }
  });
  </script>
  