<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer flex flex-col h-full"
    @click="$emit('click')"
  >
    <div class="relative w-full pt-[56.25%]">
      <img
        v-if="project.image"
        :src="project.image"
        :alt="project.title"
        class="absolute top-0 left-0 w-full h-full object-cover"
      >
      <div v-else class="absolute top-0 left-0 w-full h-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
        <span class="text-gray-500 dark:text-gray-400">Image not available</span>
      </div>
      <div class="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
        {{ project.duration }}
      </div>
    </div>
    <div class="p-6 flex-grow flex flex-col">
      <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{{ project.title }}</h3>
      <p class="text-gray-600 dark:text-gray-300 mb-4">{{ truncatedDescription }}</p>
      <div class="mb-4">
        <span class="text-sm font-medium text-blue-600 dark:text-blue-400">{{ project.role }}</span>
      </div>
      <div class="mb-4 flex-grow">
        <h4 class="text-lg font-medium mb-2 text-gray-900 dark:text-white">Key Features:</h4>
        <ul class="list-disc list-inside text-gray-600 dark:text-gray-300">
          <li v-for="feature in project.keyFeatures" :key="feature">{{ feature }}</li>
        </ul>
      </div>
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tech in project.technologies"
          :key="tech"
          class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-300"
        >
          {{ tech }}
        </span>
      </div>
      <div class="flex flex-col sm:flex-row gap-2 mt-4">
        <button class="w-full sm:flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300">
          View Details
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
        <a
          v-if="project.testFlightLink"
          :href="project.testFlightLink"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300"
          @click.stop
        >
          <svg class="h-5 w-5 mr-2" viewBox="0 0 384 512" fill="currentColor">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
          </svg>
          Test on iOS
        </a>
        <a
          v-if="project.androidTestLink"
          :href="project.androidTestLink"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
          @click.stop
        >
          <svg class="h-5 w-5 mr-2" viewBox="0 0 576 512" fill="currentColor">
            <path d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55"/>
          </svg>
          Test on Android
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
});

const emits = defineEmits(['click']);

const truncatedDescription = computed(() => {
  return props.project.description.length > 100
    ? props.project.description.slice(0, 97) + '...'
    : props.project.description;
});
</script>

<style scoped>
.list-disc {
  list-style-type: disc;
}

.list-inside {
  list-style-position: inside;
}
</style>