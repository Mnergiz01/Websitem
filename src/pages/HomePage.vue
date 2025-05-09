<template>
    <div>
      <!-- Hero Section -->
      <HeroSection />
      
      <!-- About Me Section -->
      <AboutSection />
      
      <!-- Projects Section -->
      <ProjectsSection />
      
      <!-- Experience Section -->
      <ExperienceSection />
      
      <!-- Skills Section -->
      <SkillsSection />
      
      <!-- Contact Section -->
      <ContactSection />
    </div>
  </template>
  
  <script setup>
  import HeroSection from '@/components/home/HeroSection.vue';
  import AboutSection from '@/components/home/AboutSection.vue';
  import ProjectsSection from '@/components/home/ProjectsSection.vue';
  import ExperienceSection from '@/components/home/ExperienceSection.vue';
  import SkillsSection from '@/components/home/SkillsSection.vue';
  import ContactSection from '@/components/home/ContactSection.vue';
  </script>
  