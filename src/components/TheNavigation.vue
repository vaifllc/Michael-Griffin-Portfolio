<template>
  <nav class="fixed w-full z-50 bg-white/10 dark:bg-black/10 backdrop-blur-lg shadow-lg transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span class="text-2xl font-bold text-white">MG</span>
            </div>
            <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Michael Griffin
            </span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="item in navItems"
            :key="item.name"
            :to="item.path"
            custom
            v-slot="{ href, navigate, isActive }"
          >
            <a
              :href="href"
              @click="navigateWithTransition(navigate)"
              class="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium transition-colors duration-300 relative group"
              :class="{ 'text-blue-500 dark:text-blue-400': isActive }"
            >
              {{ item.name }}
              <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </a>
          </router-link>

          <!-- Dark Mode Toggle -->
          <button @click="toggleDarkMode" class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300">
            <Icon :icon="isDarkMode ? 'ph:sun-bold' : 'ph:moon-bold'" class="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button @click="toggleMobileMenu" class="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
            <Icon :icon="mobileMenuOpen ? 'ph:x-bold' : 'ph:list-bold'" class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-full opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-full opacity-0"
    >
      <div v-if="mobileMenuOpen" class="md:hidden bg-white dark:bg-gray-800 shadow-lg">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link
            v-for="item in navItems"
            :key="item.name"
            :to="item.path"
            custom
            v-slot="{ href, navigate, isActive }"
          >
            <a
              :href="href"
              @click="navigateWithTransition(navigate); toggleMobileMenu();"
              class="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
              :class="[
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              ]"
            >
              {{ item.name }}
            </a>
          </router-link>
          <!-- Dark Mode Toggle for Mobile -->
          <button @click="toggleDarkMode" class="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
            <Icon :icon="isDarkMode ? 'ph:sun-bold' : 'ph:moon-bold'" class="h-6 w-6 inline-block mr-2" />
            {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
          </button>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const router = useRouter()
const mobileMenuOpen = ref(false)

const props = defineProps({
  isDarkMode: Boolean,
})

const emit = defineEmits(['toggleDarkMode', 'startPageTransition', 'endPageTransition'])

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
]

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const toggleDarkMode = () => {
  emit('toggleDarkMode')
}

const navigateWithTransition = (navigate) => {
  mobileMenuOpen.value = false
  emit('startPageTransition')
  setTimeout(() => {
    navigate()
    setTimeout(() => {
      emit('endPageTransition')
    }, 500)
  }, 100)
}
</script>

<style scoped>
/* Add any additional styles here */
</style>