<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-500 to-blue-700 dark:from-cyan-700 dark:to-cyan-900 text-white">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold mb-8 text-center" v-motion-fade-visible>
        My Projects
      </h1>
      <p class="text-xl text-center mb-12" v-motion-slide-visible-once-bottom>
        Explore my portfolio of innovative solutions in mental health tech, app development, and business transformation.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          v-motion-slide-visible-once-bottom
          :delay="index * 100"
        >
          <ProjectCard :project="project" @click="navigateToProject(project.id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMotion } from '@vueuse/motion'
import { useRouter } from 'vue-router'
import ProjectCard from './ProjectCard.vue'

useMotion()
const router = useRouter()

const projects = ref([
  {
    id: 1,
    title: 'Align Mental Health App',
    description: 'A comprehensive mental health social app focusing on user well-being and personalized support.',
    image: null, // We'll set this dynamically
    technologies: ['React Native Expo', 'Express.js', 'Node.js', 'MongoDB', 'Typescript', 'AWS S3'],
    link: 'https://alignmentalhealthinc.org/',
    role: 'Lead Developer',
    duration: 'Jan 2024 - Present',
    keyFeatures: [
      'Mental Health resource library with resource articles regarding mental health.',
      'In app music player with Spotify sdk integration.',
      'Personalized timeline , with stories, health resource articles, user posts, media related posts.',
      'Community groups for users who are coping with the same mental health illness.'
    ],
    testFlightLink: null,
    androidTestLink: null
  },
  {
    id: 2,
    title: 'Blüm Relocations',
    description: 'An innovative platform streamlining the relocation process for businesses and individuals.',
    image: null, // We'll set this dynamically
    technologies: ['React Native Expo', 'Express.js', 'Node.js', 'MongoDB', 'Typescript', 'AWS S3'],
    link: 'https://www.blumrelocations.com/',
    role: 'Full Stack Developer',
    duration: 'Sept 2023 - March 2024',
    keyFeatures: [
      'Automated moving task generation system based on response given in questionnaire.',
      'Automated budget tracker system.',
      'Interactive move planning and scheduling tools.',
      'Moving services finder for Auto, Storage, Moving & Packing.',
      'Invite loved ones to join the app and share related tasks.'
    ],
    testFlightLink: 'https://testflight.apple.com/join/JHp2Jvfs',
    androidTestLink: null
  },
  {
    id: 3,
    title: 'Parlay Cleveland',
    description: 'A website created for a sports bar in Cleveland.',
    image: null, // We'll set this to a placeholder if no image is available
    technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    link: 'https://parlaycleveland.com/',
    role: 'Frontend Developer',
    duration: 'Sep 2023 - Sep 2023',
    keyFeatures: [
      'Gallery Page',
      '360 Tour',
      'Events Booking'
    ],
        testFlightLink: null,
    androidTestLink: null
  }
])

const navigateToProject = (projectId) => {
  router.push({ name: 'ProjectDetails', params: { id: projectId } })
}

onMounted(async () => {
  // Dynamically import images
  projects.value[0].image = (await import('../assets/icon.png')).default
  projects.value[1].image = (await import('../assets/BlumShowcase.png')).default
  projects.value[2].image = '../assets/parlaylogo.png' // Placeholder for missing image
})
</script>