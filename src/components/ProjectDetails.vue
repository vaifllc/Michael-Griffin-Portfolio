<template>
  <div v-if="project" class="bg-gradient-to-b from-blue-500 to-blue-700 dark:from-cyan-700 dark:to-cyan-900 min-h-screen text-white py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl md:text-6xl font-bold mb-8 text-center" v-motion-slide-visible-once-bottom>
        {{ project.title }}
      </h1>

  <!-- Gallery -->
  <div class="mb-16" v-motion-slide-visible-once-bottom>
    <swiper
      :modules="swiperModules"
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }"
      :pagination="{ clickable: true }"
      :navigation="true"
      class="mySwiper"
    >
      <swiper-slide v-for="(image, index) in project.gallery" :key="index">
        <img
          :src="image"
          :alt="`${project.title} image ${index + 1}`"
          class="w-full h-full object-contain rounded-lg cursor-pointer"
          @click="openFullscreen(index)"
        />
      </swiper-slide>
    </swiper>
  </div>

      <!-- Project Description -->
      <div class="mb-16 bg-white/10 backdrop-blur-md rounded-lg p-8" v-motion-slide-visible-once-bottom>
        <h2 class="text-2xl font-semibold mb-4">Project Description</h2>
        <p class="text-lg">{{ project.description }}</p>
      </div>

      <!-- Client Information -->
      <div class="mb-16 bg-white/10 backdrop-blur-md rounded-lg p-8" v-motion-slide-visible-once-bottom>
        <h2 class="text-2xl font-semibold mb-4">Client</h2>
        <p class="text-lg">{{ project.client }}</p>
      </div>

      <!-- Role and Duration -->
      <div class="mb-16 bg-white/10 backdrop-blur-md rounded-lg p-8" v-motion-slide-visible-once-bottom>
        <h2 class="text-2xl font-semibold mb-4">My Role</h2>
        <p class="text-lg">{{ project.role }}</p>
        <h2 class="text-2xl font-semibold mb-4 mt-8">Duration</h2>
        <p class="text-lg">{{ project.duration }}</p>
      </div>

      <!-- Key Features -->
      <div class="mb-16 bg-white/10 backdrop-blur-md rounded-lg p-8" v-motion-slide-visible-once-bottom>
        <h2 class="text-2xl font-semibold mb-4">Key Features</h2>
        <ul class="list-disc list-inside text-lg">
          <li v-for="feature in project.keyFeatures" :key="feature" class="mb-2">{{ feature }}</li>
        </ul>
      </div>

      <!-- Tech Stack -->
      <div class="mb-16" v-motion-slide-visible-once-bottom>
        <h2 class="text-2xl font-semibold mb-4">Tech Stack</h2>
        <div class="flex flex-wrap gap-4">
          <div v-for="tech in project.technologies" :key="tech.name" class="bg-white/20 backdrop-blur-md rounded-full px-4 py-2 text-sm font-semibold flex items-center">
            <Icon :icon="tech.icon" class="mr-2 h-6 w-6" />
            {{ tech.name }}
          </div>
        </div>
      </div>

      <!-- Links -->
      <div class="mb-16 flex flex-wrap justify-center gap-4" v-motion-slide-visible-once-bottom>
        <a :href="project.link" target="_blank" rel="noopener noreferrer" class="bg-white text-blue-700 hover:bg-blue-100 px-6 py-3 rounded-full font-semibold transition duration-300">
          View Live Project
        </a>
        <a v-if="project.testFlightLink" :href="project.testFlightLink" target="_blank" rel="noopener noreferrer" class="bg-gray-800 text-white hover:bg-gray-700 px-6 py-3 rounded-full font-semibold transition duration-300 flex items-center">
          <svg class="h-5 w-5 mr-2" viewBox="0 0 384 512" fill="currentColor">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
          </svg>
          Test on iOS
        </a>
        <a v-if="project.androidTestLink" :href="project.androidTestLink" target="_blank" rel="noopener noreferrer" class="bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-full font-semibold transition duration-300 flex items-center">
          <svg class="h-5 w-5 mr-2" viewBox="0 0 576 512" fill="currentColor">
            <path d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55"/>
          </svg>
          Test on Android
        </a>
      </div>
    </div>

    <!-- Fullscreen Modal -->
    <div v-if="fullscreenImage" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90" @click="closeFullscreen">
      <img :src="fullscreenImage" alt="Fullscreen image" class="max-w-full max-h-full object-contain" />
      <button @click="closeFullscreen" class="absolute top-4 right-4 text-white text-2xl">&times;</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMotion } from '@vueuse/motion';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { Icon } from '@iconify/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

useMotion();

const route = useRoute();
const project = ref(null);
const swiperModules = [Navigation, Pagination, EffectCoverflow];
const fullscreenImage = ref(null);

const projects = [
  {
    id: 1,
    title: 'Align Mental Health App',
    description: 'A comprehensive mental health social app focusing on user well-being and personalized support.',
    gallery: [], // We'll populate this dynamically
    technologies: [
      { name: 'React Native Expo', icon: 'logos:react' },
      { name: 'Express.js', icon: 'logos:express' },
      { name: 'Node.js', icon: 'logos:nodejs' },
      { name: 'MongoDB', icon: 'logos:mongodb' },
      { name: 'Typescript', icon: 'logos:typescript-icon' },
      { name: 'AWS S3', icon: 'logos:aws-s3' }
    ],
    link: 'https://alignmentalhealthinc.org/',
    role: 'Lead Developer',
    duration: 'Jan 2024 - Present',
    client: 'Align Mental Health Inc.',
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
    gallery: [], // We'll populate this dynamically
    technologies: [
      { name: 'React Native Expo', icon: 'logos:react' },
      { name: 'Express.js', icon: 'logos:express' },
      { name: 'Node.js', icon: 'logos:nodejs' },
      { name: 'MongoDB', icon: 'logos:mongodb' },
      { name: 'Typescript', icon: 'logos:typescript-icon' },
      { name: 'AWS S3', icon: 'logos:aws-s3' }
    ],
    link: 'https://www.blumrelocations.com/',
    role: 'Full Stack Developer',
    duration: 'Mar 2021 - Dec 2021',
    client: 'Blüm Relocations',
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
    description: 'A community-driven platform connecting local entrepreneurs and fostering innovation.',
    gallery: [], // We'll populate this with placeholder images
    technologies: [
      { name: 'Vue.js', icon: 'logos:vue' },
      { name: 'Firebase', icon: 'logos:firebase' },
      { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' }
    ],
    link: 'https://example.com/parlay-cleveland',
    role: 'Frontend Developer',
    duration: 'Sep 2020 - Feb 2021',
    client: 'Parlay Cleveland',
    keyFeatures: [
      'Event management and ticketing system',
      'Networking features for entrepreneurs',
      'Resource sharing and collaboration tools'
    ],
    testFlightLink: 'https://testflight.apple.com/join/yourAppId',
    androidTestLink: 'https://play.google.com/apps/testing/com.yourapp'
  }
];

const openFullscreen = (index) => {
  fullscreenImage.value = project.value.gallery[index];
};

const closeFullscreen = () => {
  fullscreenImage.value = null;
};

onMounted(async () => {
  const projectId = parseInt(route.params.id);
  project.value = projects.find(p => p.id === projectId);

  if (project.value) {
    // Dynamically import images for the gallery
    if (project.value.id === 1) {
      project.value.gallery = [
        (await import('../assets/icon.png')).default,
        (await import('../assets/Align/1.png')).default,
        (await import('../assets/Align/2.png')).default,
        (await import('../assets/Align/3.png')).default,
        (await import('../assets/Align/4.png')).default,
        (await import('../assets/Align/5.png')).default,
        (await import('../assets/Align/6.png')).default,
        (await import('../assets/Align/7.png')).default,
        (await import('../assets/Align/8.png')).default,
        (await import('../assets/Align/9.png')).default,
        (await import('../assets/Align/10.png')).default,
        (await import('../assets/Align/11.png')).default,
        (await import('../assets/Align/12.png')).default,
      ];
    } else if (project.value.id === 2) {
      project.value.gallery = [
        (await import('../assets/BlumShowcase.png')).default,
        // ... other Blüm images ...
      ];
    } else {
      // Use placeholder images for Parlay Cleveland or any other project
      project.value.gallery = [
        'https://via.placeholder.com/300',
        'https://via.placeholder.com/300',
        'https://via.placeholder.com/300',
        'https://via.placeholder.com/300'
      ];
    }
  }
});
</script>


<style scoped>
.swiper {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper-slide {
  width: 300px;
  height: 500px; /* Increased height */
  display: flex;
  align-items: center;
  justify-content: center;
}

.swiper-slide img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

/* Add some additional styling for better visibility */
.swiper-button-next,
.swiper-button-prev {
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 20px;
}

.swiper-pagination-bullet {
  background-color: white;
}

.swiper-pagination-bullet-active {
  background-color: #3b82f6; /* blue-500 */
}
</style>