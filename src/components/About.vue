<template>
  <section id="about" class="bg-gradient-to-b from-blue-500 from-5% to-gray-100 dark:from-cyan-500 dark:from-5% dark:to-gray-800 pt-28 pb-2 md:pb-6 text-slate-700 dark:text-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 md:pb-28">
      <h1 class="font-poppins md:text-6xl mb-16 text-4xl font-bold tracking-tight text-center" v-motion-fade-visible>
        About <span class="bg-gradient-to-b from-blue-500 from-5% to-gray-50 font-courgette font-semibold dark:from-cyan-500 dark:from-5% dark:to-gray-800 p-2 ml-1 dark:text-gray-100 text-gray-700 transition-colors duration-700 ease-in-out bg-blue-800 rounded-lg">Me</span>
      </h1>

      <div class="lg:grid lg:grid-cols-2 lg:gap-16">
        <div class="flex flex-col justify-center" v-motion-slide-visible-once-left>
          <h2 class="font-inter md:text-4xl text-left sm:leading-none max-w-lg mb-6 text-2xl font-semibold md:font-bold tracking-tight">
            Hi there, <span class="font-courgette font-semibold">I'm Michael Griffin</span>
          </h2>
          <p class="font-roboto md:text-xl font-medium leading-relaxed text-base text-justify mb-6">
          I'm a passionate developer with expertise in crafting innovative solutions for app development, tech innovation,
           and business transformation. My journey in the tech world is fueled by a deep desire to create impactful technology that drives positive change.
          </p>
          <p class="font-roboto md:text-xl font-medium leading-relaxed text-base text-justify">
           When I'm not immersed in code, you can find me spending quality time with my family, praising God at my local church, or even enjoying some time roller skating. I'm committed to continuous learning and am always ready to embrace new challenges in the dynamic landscape of technology.
          </p>
        </div>

        <div class="lg:w-full relative mx-auto mt-12" v-motion-slide-visible-once-right>
          <div class="relative h-full w-full flex items-center justify-center">
            <div class="profileCard_container relative xl:p-10 lg:p-4 border-2 border-dashed rounded-full border-spacing-4 border-gray-700 dark:border-gray-200/50">
              <button v-for="(tech, index) in techStack" :key="tech.id" :style="{ animationDelay: `${index * 1}s` }"
                class="profile_item rounded-full bg-cover cursor-pointer border border-gray-400/50 p-[2px] active:scale-95 hover:scale-95 transition-all duration-500"
                @mouseover="showTooltip(index)" @mouseleave="hideTooltip">
                <span class="flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 transition-all duration-500 rounded-full z-[2] dark:bg-gray-700 bg-gray-100">
                  <Icon :icon="tech.icon" class="w-6 h-6 sm:w-8 sm:h-8" />
                </span>
                <div v-if="tooltipIndex === index" class="tooltip">
                  {{ tech.label }}
                </div>
              </button>
              <div class="w-full bg-transparent h-full flex items-center justify-center p-6 rounded-full hover:scale-95 object-cover transition-all duration-500">
                <img class="profile-image" src="../assets/MichaelGriffin.jpg" alt="Michael Griffin" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- My Skills Section -->
      <div class="mt-16" v-motion-slide-visible-once-bottom>
        <h2 class="text-2xl font-semibold mb-6 text-center">My Skills</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Use SkillBar component to show skills dynamically -->
          <SkillBar v-for="skill in skills" :key="skill.name" :skill="skill.name" :percentage="skill.level" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useMotion } from '@vueuse/motion';
import { Icon } from '@iconify/vue';
import SkillBar from './SkillBar.vue';

useMotion();

const tooltipIndex = ref(null);

const techStack = [
  { id: 1, label: 'Vue.js', icon: 'logos:vue' },
  { id: 2, label: 'React', icon: 'logos:react' },
  { id: 3, label: 'Node.js', icon: 'logos:nodejs' },
  { id: 4, label: 'Python', icon: 'logos:python' },
  { id: 5, label: 'TailwindCSS', icon: 'logos:tailwindcss-icon' },
  { id: 6, label: 'JavaScript', icon: 'logos:javascript' },
  { id: 7, label: 'TypeScript', icon: 'logos:typescript-icon' },
  { id: 8, label: 'Git', icon: 'logos:git-icon' },
];

// Define the skills array to pass to SkillBar
const skills = [
  { name: 'Vue.js', level: 90 },
  { name: 'React', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'Python', level: 75 },
  { name: 'TailwindCSS', level: 95 },
  { name: 'JavaScript', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'Git', level: 88 },
];

const showTooltip = (index) => {
  pauseOrbit();
  tooltipIndex.value = index;
};

const hideTooltip = () => {
  resumeOrbit();
  tooltipIndex.value = null;
};

const pauseOrbit = () => {
  const items = document.querySelectorAll('.profile_item');
  items.forEach(item => {
    item.style.animationPlayState = 'paused';
  });
};

const resumeOrbit = () => {
  const items = document.querySelectorAll('.profile_item');
  items.forEach(item => {
    item.style.animationPlayState = 'running';
  });
};
</script>




<style scoped>
.profileCard_container {
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.profile_item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 0 0;
  animation: orbit 10s linear infinite;
  transform: translate(-50%, -50%);
  animation-play-state: running;
}

@keyframes orbit {
  0% {
    transform: translate(-50%, -50%) rotate(0deg) translate(150px) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) translate(150px) rotate(-360deg);
  }
}

/* Profile image styling */
.profile-image {
  width:200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
}

/* Tooltip styling */
.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  padding: 4px 8px;
  font-size: 0.75rem;
  color: #4a5568;
  background-color: #f7fafc;
  border-radius: 0.25rem;
  z-index: 10;
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px;
  border-style: solid;
  border-color: #f7fafc transparent transparent transparent;
}

/* Responsive changes for profileCard_container */
@media (max-width: 1280px) {
  .profileCard_container {
    width: 250px;
    height: 250px;
  }

  @keyframes orbit {
    0% {
      transform: translate(-50%, -50%) rotate(0deg) translate(125px) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg) translate(125px) rotate(-360deg);
    }
  }
}

@media (max-width: 640px) {
  .profileCard_container {
    width: 200px;
    height: 200px;
  }

  @keyframes orbit {
     0% {
       transform: translate(-50%, -50%) rotate(0deg) translate(100px) rotate(0deg);
     }
     100% {
       transform: translate(-50%, -50%) rotate(360deg) translate(100px) rotate(-360deg);
     }
   }
}

</style>