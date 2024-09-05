<template>
  <section class="py-16 bg-gradient-to-b from-blue-500 to-blue-600 dark:from-cyan-500 dark:to-cyan-600">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-4xl font-extrabold text-white mb-12 text-center tracking-wide animate__animated animate__fadeInDown">My Projects</h2>
      <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="project in projects" :key="project.id" class="bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden group transition-transform transform hover:scale-105 duration-500">
          <!-- Project Image with Gradient Overlay -->
          <div class="relative">
            <img :src="project.imageUrl" :alt="project.title" class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
          </div>
          <!-- Project Content -->
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-cyan-400">
              {{ project.title }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {{ project.description }}
            </p>
            <div class="mt-6">
              <router-link
                :to="{ name: 'ProjectDetails', params: { id: project.id } }"
                class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white text-sm font-medium rounded-md shadow-sm transition-all duration-300 transform hover:scale-105"
              >
                View Project
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Import all images from the assets folder
const images = import.meta.glob('../assets/*.png', { eager: true })

const projects = ref([
  {
    id: 1,
    title: 'Align Mental Health App',
    description: 'A comprehensive mental health social app focusing on user well-being and personalized support.',
    image: 'icon.png',
    link: 'https://alignmentalhealthinc.org/'
  },
  {
    id: 2,
    title: 'Blüm Relocations',
    description: 'An innovative platform streamlining the relocation process for businesses and individuals.',
    image: 'BlumShowcase.png',
    link: 'https://www.blumrelocations.com/'
  },
  {
    id: 3,
    title: 'Parlay Cleveland',
    description: 'A community-driven platform connecting local entrepreneurs and fostering innovation.',
    image: '#',
    link: 'https://parlaycleveland.com/'
  }
])

// Process images
projects.value.forEach(project => {
  const imageModule = images[`../assets/${project.image}`]
  project.imageUrl = imageModule ? imageModule.default : 'https://via.placeholder.com/300'
})
</script>

<style scoped>
section {
  transition: background-color 1s ease-in-out;
}
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}
.group:hover .group-hover\:opacity-75 {
  opacity: 0.75;
}
.animate__animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.group:hover .group-hover\:text-blue-600 {
  color: #2563eb; /* Tailwind blue-600 */
}
.group:hover .dark\:group-hover\:text-cyan-400 {
  color: #0bc5ea; /* Tailwind cyan-400 */
}
a:hover {
  transform: scale(1.05);
}
</style>