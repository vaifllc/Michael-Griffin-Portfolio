<template>
  <div class="mt-16 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
    <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
      <div class="p-6 sm:p-8">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          About This Site
        </h2>
        <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
          This portfolio website is built with cutting-edge web technologies to showcase my skills and projects:
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(tech, index) in siteTechnologies" :key="index" class="flex items-start space-x-3">
            <Icon :icon="tech.icon" class="text-2xl text-blue-500 dark:text-blue-400 flex-shrink-0" />
            <span class="text-gray-700 dark:text-gray-300">{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const siteTechnologies = [
  { name: 'Frontend Framework: Vue.js 3 with Composition API', icon: 'mdi:vuejs' },
  { name: 'Styling: Tailwind CSS for responsive designs', icon: 'mdi:tailwind' },
  { name: 'Animations: GSAP and Vue Motion', icon: 'mdi:animation' },
  { name: 'Icons: Iconify for vector icons', icon: 'mdi:svg' },
  { name: 'Routing: Vue Router for navigation', icon: 'mdi:routes' },
  { name: 'State Management: Vuex (if applicable)', icon: 'mdi:state-machine' },
  { name: 'Build Tool: Vite for fast development', icon: 'mdi:lightning-bolt' },
  { name: 'Deployment: [Your deployment platform]', icon: 'mdi:cloud-upload' },
]
</script>