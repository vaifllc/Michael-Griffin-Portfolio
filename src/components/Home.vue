<template>
  <div class="min-h-screen">
    <div class="flex flex-col justify-center items-center text-center p-4">
      <div v-motion
        :initial="{ opacity: 0, y: 100 }"
        :enter="{ opacity: 1, y: 0 }"
        :delay="200"
      >
        <h1 class="text-5xl md:text-7xl font-bold mb-4 animate__animated animate__fadeInDown">
          Hi, I'm <span class="text-blue-500 dark:text-blue-400">Michael Griffin</span>
        </h1>
      </div>
      <div v-motion
        :initial="{ opacity: 0, y: 100 }"
        :enter="{ opacity: 1, y: 0 }"
        :delay="400"
      >
        <p class="text-xl md:text-2xl mb-8 animate__animated animate__fadeInUp animate__delay-1s">
          A passionate developer creating innovative solutions
        </p>
      </div>
      <div v-motion
        :initial="{ opacity: 0, y: 100 }"
        :enter="{ opacity: 1, y: 0 }"
        :delay="600"
      >
        <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate__animated animate__fadeInUp animate__delay-2s">
          <router-link
            to="/projects"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105"
          >
            View My Projects
          </router-link>
          <router-link
            to="/contact"
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105"
          >
            Get in Touch
          </router-link>
        </div>
      </div>
      <div v-motion
        :initial="{ opacity: 0, y: 100 }"
        :enter="{ opacity: 1, y: 0 }"
        :delay="800"
        class="mt-16"
      >
        <h2 class="text-3xl font-semibold mb-6 animate__animated animate__fadeInUp animate__delay-3s">
          Featured Technologies
        </h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          <div
            v-for="(tech, index) in technologies"
            :key="tech.name"
            v-motion
            :initial="{ opacity: 0, scale: 0.8 }"
            :enter="{ opacity: 1, scale: 1 }"
            :delay="1000 + index * 100"
            class="flex flex-col items-center"
          >
            <Icon :icon="tech.icon" class="text-4xl mb-2 text-vt-c-text-light-2 dark:text-vt-c-text-dark-2" />
            <span class="text-sm">{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </div>


    <!-- About This Site Section -->
    <section class="py-16 bg-gradient-to-b from-gray-100 to-blue-500 dark:from-gray-800 dark:to-cyan-500">
      <AboutThisSite />
    </section>

    <!-- Project Showcase Section -->
    <section class="py-16 bg-gradient-to-b from-blue-500 to-blue-600 dark:from-cyan-500 dark:to-cyan-600">
      <ProjectShowcase />
    </section>

    <!-- Skills Visualization Section -->
    <section class="py-16 bg-gradient-to-b from-blue-600 to-green-500 dark:from-cyan-600 dark:to-blue-700">
      <SkillsVisualization :isDarkMode="isDarkMode" />
    </section>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useMotion } from '@vueuse/motion'
import ProjectShowcase from './ProjectShowcase.vue'
import SkillsVisualization from './SkillsVisualization.vue'
import AboutThisSite from './AboutThisSite.vue'

useMotion()

const technologies = [
  { name: 'Vue.js', icon: 'mdi:vuejs' },
  { name: 'React', icon: 'mdi:react' },
  { name: 'Node.js', icon: 'mdi:nodejs' },
  { name: 'Python', icon: 'mdi:language-python' },
  { name: 'TailwindCSS', icon: 'mdi:tailwind' },
  { name: 'JavaScript', icon: 'mdi:language-javascript' },
  { name: 'TypeScript', icon: 'mdi:language-typescript' },
  { name: 'GraphQL', icon: 'mdi:graphql' },
  { name: 'Docker', icon: 'mdi:docker' },
  { name: 'Git', icon: 'mdi:git' },
]

const siteTechnologies = [
  { name: 'Frontend Framework: Vue.js 3 with Composition API', icon: 'mdi:vuejs' },
  { name: 'Styling: Tailwind CSS for responsive designs', icon: 'mdi:tailwind' },
  { name: 'Animations: GSAP and Vue Motion', icon: 'mdi:animation' },
  { name: 'Icons: Iconify for vector icons', icon: 'mdi:svg' },
  { name: 'Routing: Vue Router for navigation', icon: 'mdi:routes' },
  { name: 'State Management: Vuex ', icon: 'mdi:state-machine' },
  { name: 'Build Tool: Vite for fast development', icon: 'mdi:lightning-bolt' },
  { name: 'Deployment: Netifly', icon: 'mdi:cloud-upload' },
]

const props = defineProps({
  isDarkMode: Boolean
})
</script>

<style scoped>
.animate__animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}

.list-disc {
  list-style-type: disc;
}

.list-inside {
  list-style-position: inside;
}
</style>