<template>
  <div id="particles-js" class="fixed inset-0 z-0"></div>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  isDarkMode: Boolean
});

let particlesInstance = null;

const initParticles = (isDark) => {
  if (particlesInstance) {
    particlesInstance.destroy();
  }

  particlesInstance = window.particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: isDark ? '#ffffff' : '#000000' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: isDark ? '#ffffff' : '#000000',
        opacity: 0.4,
        width: 1
      },
      move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out' }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
      modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } }
    },
    retina_detect: true
  });
};

onMounted(() => {
  if (typeof window.particlesJS === 'function') {
    initParticles(props.isDarkMode);
  } else {
    console.error('particles.js is not loaded');
  }
});

onUnmounted(() => {
  if (particlesInstance) {
    particlesInstance.destroy();
  }
});

watch(() => props.isDarkMode, (newValue) => {
  initParticles(newValue);
});
</script>

<style scoped>
#particles-js {
  pointer-events: none;
}
</style>