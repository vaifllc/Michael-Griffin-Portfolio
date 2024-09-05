<template>
  <div class="min-h-screen bg-gradient-to-b from-vt-c-white-soft to-blue-500 dark:from-vt-c-black-soft dark:to-cyan-500 text-vt-c-text-light-1 dark:text-vt-c-text-dark-1 transition-colors duration-1000 ease-in-out">
    <AnimatedBackground :isDarkMode="isDarkMode" />

    <!-- Initial Welcome Loading -->
    <Transition name="fade">
      <div v-if="showWelcome" class="fixed inset-0 z-50 flex items-center justify-center bg-vt-c-white dark:bg-vt-c-black">
        <div class="text-4xl font-bold">
          <span ref="loadingText"></span>
        </div>
      </div>
    </Transition>

    <!-- Page transition loading -->
    <Transition name="fade">
      <div v-if="isPageTransitioning" class="fixed inset-0 z-40 flex items-center justify-center bg-vt-c-white dark:bg-vt-c-black">
        <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
      </div>
    </Transition>

    <!-- Navigation -->
    <TheNavigation
      :isDarkMode="isDarkMode"
      @toggleDarkMode="toggleDarkMode"
      @startPageTransition="startPageTransition"
      @endPageTransition="endPageTransition"
    />

    <!-- Main content -->
    <main class="pt-16 relative z-10">
      <router-view v-slot="{ Component }">
        <transition
          name="fade"
          mode="out-in"
          @enter="onEnter"
          @leave="onLeave"
        >
          <component :is="Component" :isDarkMode="isDarkMode" />
        </transition>
      </router-view>
    </main>

  <!-- Footer -->
  <footer class="bg-vt-c-white-soft dark:bg-vt-c-black-soft mt-12 py-6 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p>&copy; {{ new Date().getFullYear() }}
        <span class="glow-text">Michael Griffin</span>. All rights reserved.
      </p>
    </div>
  </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePreferredDark } from '@vueuse/core'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import TheNavigation from './components/TheNavigation.vue'
import AnimatedBackground from './components/AnimatedBackground.vue'

gsap.registerPlugin(TextPlugin)

const isDarkMode = ref(false)
const prefersDark = usePreferredDark()
const route = useRoute()
const showWelcome = ref(true)
const isPageTransitioning = ref(false)
const loadingText = ref(null)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  updateDarkMode()
}

const updateDarkMode = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const startPageTransition = () => {
  isPageTransitioning.value = true
}

const endPageTransition = () => {
  isPageTransitioning.value = false
}

onMounted(() => {
  isDarkMode.value = prefersDark.value
  updateDarkMode()

  // Initial welcome animation
  gsap.to(loadingText.value, {
    duration: 2,
    text: "Welcome to My Portfolio",
    ease: "none",
    onComplete: () => {
      gsap.to(loadingText.value, {
        duration: 0.5,
        opacity: 0,
        y: -20,
        ease: "power2.in",
        onComplete: () => {
          showWelcome.value = false
        }
      })
    }
  })
})

watch(prefersDark, (newValue) => {
  isDarkMode.value = newValue
  updateDarkMode()
})

// GSAP animations for route transitions
const onEnter = (el, done) => {
  gsap.fromTo(el,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', onComplete: done }
  )
}

const onLeave = (el, done) => {
  gsap.to(el,
    { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in', onComplete: done }
  )
}

// Watch for route changes
watch(() => route.path, () => {
  window.scrollTo(0, 0)
})
</script>

<style>
@import 'animate.css';

:root {
  --vt-c-white: #ffffff;
  --vt-c-black: #181818;
  --vt-c-text-light-1: #2c3e50;
  --vt-c-text-dark-1: #ffffff;
}

.dark {
  --color-background: var(--vt-c-black);
  --color-text: var(--vt-c-text-dark-1);
}

body {
  color: var(--color-text);
  background: var(--color-background);
  transition: color 0.5s, background-color 0.5s;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.glow-text {
  animation: glow 4s ease-in-out infinite alternate;
  font-weight: bold;
}

@keyframes glow {
  0% {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff00de, 0 0 35px #ff00de, 0 0 40px #ff00de, 0 0 50px #ff00de, 0 0 75px #ff00de;
    color: #fff;
  }
  50% {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #00ffff, 0 0 35px #00ffff, 0 0 40px #00ffff, 0 0 50px #00ffff, 0 0 75px #00ffff;
    color: #fff;
  }
  100% {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff6600, 0 0 35px #ff6600, 0 0 40px #ff6600, 0 0 50px #ff6600, 0 0 75px #ff6600;
    color: #fff;
  }
}

/* Dark mode adjustments */
.dark .glow-text {
  animation: glow-dark 4s ease-in-out infinite alternate;
}

@keyframes glow-dark {
  0% {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff00de, 0 0 35px #ff00de, 0 0 40px #ff00de, 0 0 50px #ff00de, 0 0 75px #ff00de;
  }
  50% {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #00ffff, 0 0 35px #00ffff, 0 0 40px #00ffff, 0 0 50px #00ffff, 0 0 75px #00ffff;
  }
  100% {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff6600, 0 0 35px #ff6600, 0 0 40px #ff6600, 0 0 50px #ff6600, 0 0 75px #ff6600;
  }
}
</style>
