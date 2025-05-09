<template>
    <div 
      :class="[
        'overflow-hidden transition-shadow duration-300',
        `rounded-${rounded}`,
        shadow ? `shadow-${shadow}` : '',
        border ? 'border border-gray-200 dark:border-gray-700' : '',
        hover ? 'hover:shadow-lg dark:hover:shadow-gray-800/50' : '',
        bgColor ? bgColor : 'bg-white dark:bg-gray-800',
        className
      ]"
    >
      <!-- Card Header -->
      <div 
        v-if="$slots.header || title" 
        :class="[
          'px-6 py-4 border-b border-gray-200 dark:border-gray-700',
          headerClass
        ]"
      >
        <slot name="header">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ title }}
          </h3>
        </slot>
      </div>
      
      <!-- Card Image -->
      <div v-if="imageUrl || $slots.image" class="w-full h-48 overflow-hidden">
        <slot name="image">
          <img 
            :src="imageUrl" 
            :alt="imageAlt" 
            class="w-full h-full object-cover"
          />
        </slot>
      </div>
      
      <!-- Card Body -->
      <div 
        :class="[
          'px-6 py-4',
          bodyClass
        ]"
      >
        <slot></slot>
      </div>
      
      <!-- Card Footer -->
      <div 
        v-if="$slots.footer" 
        :class="[
          'px-6 py-4 border-t border-gray-200 dark:border-gray-700',
          footerClass
        ]"
      >
        <slot name="footer"></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: ''
    },
    imageAlt: {
      type: String,
      default: 'Card image'
    },
    shadow: {
      type: String,
      default: 'md',
      validator: (value) => ['none', 'sm', 'md', 'lg', 'xl', '2xl'].includes(value)
    },
    rounded: {
      type: String,
      default: 'lg',
      validator: (value) => ['none', 'sm', 'md', 'lg', 'xl', 'full'].includes(value)
    },
    border: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    },
    bgColor: {
      type: String,
      default: ''
    },
    headerClass: {
      type: String,
      default: ''
    },
    bodyClass: {
      type: String,
      default: ''
    },
    footerClass: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  });
  </script>
  