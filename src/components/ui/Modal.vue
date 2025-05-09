<template>
    <Teleport to="body">
      <!-- Backdrop -->
      <Transition name="fade">
        <div 
          v-if="modelValue" 
          class="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-40 backdrop-blur-sm"
          @click="closeOnBackdrop && $emit('update:modelValue', false)"
        ></div>
      </Transition>
      
      <!-- Modal -->
      <Transition name="modal">
        <div 
          v-if="modelValue" 
          class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0"
        >
          <div 
            :class="[
              'relative bg-white dark:bg-gray-800 w-full max-h-[90vh] overflow-hidden overflow-y-auto',
              'rounded-lg shadow-xl mx-auto',
              size === 'sm' ? 'max-w-md' : '',
              size === 'md' ? 'max-w-lg' : '',
              size === 'lg' ? 'max-w-2xl' : '',
              size === 'xl' ? 'max-w-4xl' : '',
              size === 'full' ? 'max-w-full m-4' : '',
              contentClass
            ]"
            @click.stop
          >
            <!-- Modal Header -->
            <div 
              v-if="!hideHeader" 
              class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
            >
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                <slot name="header">{{ title }}</slot>
              </h3>
              <button 
                v-if="!hideClose"
                @click="$emit('update:modelValue', false)" 
                class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
                aria-label="Close"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <!-- Modal Body -->
            <div 
              :class="[
                'p-6',
                bodyClass
              ]"
            >
              <slot></slot>
            </div>
            
            <!-- Modal Footer -->
            <div 
              v-if="$slots.footer" 
              class="p-4 border-t border-gray-200 dark:border-gray-700"
            >
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </template>
  
  <script setup>
  import { onMounted, onBeforeUnmount, watch } from 'vue';
  
  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg', 'xl', 'full'].includes(value)
    },
    hideHeader: {
      type: Boolean,
      default: false
    },
    hideClose: {
      type: Boolean,
      default: false
    },
    closeOnBackdrop: {
      type: Boolean,
      default: true
    },
    contentClass: {
      type: String,
      default: ''
    },
    bodyClass: {
      type: String,
      default: ''
    }
  });
  
  const emit = defineEmits(['update:modelValue', 'close']);
  
  // Handle ESC key to close modal
  const handleEscKey = (e) => {
    if (e.key === 'Escape' && props.modelValue) {
      emit('update:modelValue', false);
    }
  };
  
  // Add event listener on mount
  onMounted(() => {
    document.addEventListener('keydown', handleEscKey);
  });
  
  // Remove event listener before unmount
  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleEscKey);
  });
  
  // Prevent body scrolling when modal is open
  watch(() => props.modelValue, (newVal) => {
    if (newVal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      emit('close');
    }
  });
  </script>
  
  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  .modal-enter-active,
  .modal-leave-active {
    transition: all 0.3s ease;
  }
  
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }
  </style>
  