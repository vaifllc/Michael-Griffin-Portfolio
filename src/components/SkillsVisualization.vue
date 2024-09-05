<template>
  <section class="py-16 bg-gradient-to-b from-blue-600 to-green-500 dark:from-cyan-600 dark:to-blue-700 relative overflow-hidden">
    <!-- Floating decorative elements for enhanced design -->
    <div class="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-30 blur-3xl"></div>
    <div class="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full opacity-30 blur-3xl"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <h2 class="text-4xl font-extrabold text-white mb-12 text-center tracking-wide animate__animated animate__fadeInDown">
        My Skills
      </h2>

      <div class="lg:flex lg:space-x-8">
        <!-- Radar Chart Section -->
        <div class="w-full max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 transition-transform hover:scale-105 duration-500 ease-in-out animate__animated animate__fadeInUp lg:flex-shrink-0">
          <Radar v-if="chartData" :data="chartData" :options="chartOptions" />
        </div>

        <!-- Explanation Section -->
        <div class="mt-12 lg:mt-0 lg:flex-grow">
          <h3 class="text-2xl font-semibold text-white dark:text-gray-300 mb-6">Explanation of Skills</h3>
          <ul class="text-white dark:text-gray-300 space-y-4">
            <li>
              <strong>Node.js (93):</strong> Extensive backend work, especially for cross-platform mobile applications.
            </li>
            <li>
              <strong>Vue.js (85):</strong> Two years of experience with Vue.js in full-stack development.
            </li>
            <li>
              <strong>React Native Expo (80):</strong> Used for mobile app development in your projects.
            </li>
            <li>
              <strong>TypeScript (80):</strong> Strong experience, adding type safety to your projects.
            </li>
            <li>
              <strong>Python (75):</strong> Scripting and backend experience with solid proficiency.
            </li>
            <li>
              <strong>Swift (76):</strong> Mid-level experience for iOS app development.
            </li>
            <li>
              <strong>Flutter (66):</strong> Experience with cross-platform mobile development.
            </li>
            <li>
              <strong>Laravel (90):</strong> Extensive use of this PHP framework for full-stack development.
            </li>
            <li>
              <strong>SQL (85):</strong> Skilled in database management for backend systems.
            </li>
            <li>
              <strong>JavaScript (90):</strong> High proficiency in both frontend and backend development.
            </li>
            <li>
              <strong>MongoDB (80):</strong> Experience with NoSQL databases for scalable applications.
            </li>
            <li>
              <strong>C# (70):</strong> Experience in desktop application development.
            </li>
            <li>
              <strong>Figma (65):</strong> Proficient in design and prototyping tools.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'
import { Radar } from 'vue-chartjs'

// Register necessary chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const props = defineProps({
  isDarkMode: Boolean
})

const skills = ref([
  { name: 'Node.js', level: 93 },           // Backend, high proficiency
  { name: 'Vue.js', level: 85 },            // Frontend, solid experience
  { name: 'React Native Expo', level: 80 }, // Mobile development
  { name: 'TypeScript', level: 80 },        // Frontend/back-end type safety
  { name: 'Python', level: 75 },            // Backend and scripting
  { name: 'Swift', level: 76 },             // iOS development
  { name: 'Flutter', level: 66 },           // Cross-platform mobile
  { name: 'Laravel', level: 90 },           // PHP framework for full-stack development
  { name: 'SQL', level: 85 },               // Backend database management
  { name: 'JavaScript', level: 90 },        // Core language for web development
  { name: 'MongoDB', level: 80 },           // NoSQL database management
  { name: 'C#', level: 70 },                // Desktop development
  { name: 'Figma', level: 65 }              // Design & prototyping tool
]);


// Chart Data
const chartData = computed(() => ({
  labels: skills.value.map(skill => skill.name),
  datasets: [
    {
      label: 'Skill Level',
      data: skills.value.map(skill => skill.level),
      // Enhance with gradient background
      backgroundColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;

        if (!chartArea) {
          return null;
        }
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, props.isDarkMode ? 'rgba(0, 255, 255, 0.4)' : 'rgba(54, 162, 235, 0.4)');
        gradient.addColorStop(1, props.isDarkMode ? 'rgba(0, 180, 255, 0.2)' : 'rgba(54, 162, 235, 0.1)');
        return gradient;
      },
      borderColor: props.isDarkMode ? 'rgb(0, 255, 255)' : 'rgb(54, 162, 235)',
      pointBackgroundColor: props.isDarkMode ? 'rgb(0, 255, 255)' : 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: props.isDarkMode ? 'rgb(0, 255, 255)' : 'rgb(54, 162, 235)',
      pointRadius: 6,
      pointHoverRadius: 8,
      borderWidth: 2,
      tension: 0.3, // smooth the lines
      hoverOffset: 8, // Enhance hover experience
    }
  ]
}))

// Chart Options for customization and animations
const chartOptions = computed(() => ({
  animation: {
    duration: 1500,
    easing: 'easeOutBounce', // Add bounce effect when the chart loads
  },
  scales: {
    r: {
      grid: {
        color: props.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderDash: [5, 5], // Dotted lines for grid
      },
      ticks: {
        color: props.isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
        backdropColor: 'transparent',
        stepSize: 20, // Adjust step size for more clarity
      },
      angleLines: {
        color: props.isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
        lineWidth: 1.5, // Thicker lines for better readability
      },
      pointLabels: {
        color: props.isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
        font: {
          size: 14,
          weight: 'bold', // Make labels stand out
        }
      }
    }
  },
  plugins: {
    tooltip: {
      backgroundColor: props.isDarkMode ? '#333' : '#fff',
      titleColor: props.isDarkMode ? '#fff' : '#333',
      bodyColor: props.isDarkMode ? '#fff' : '#333',
      borderColor: props.isDarkMode ? '#fff' : '#333',
      borderWidth: 1,
      callbacks: {
        label: function (context) {
          return `${context.label}: ${context.raw}%`; // Customize tooltip label
        }
      }
    },
    legend: {
      display: false
    }
  },
  responsive: true,
  maintainAspectRatio: false
}))
</script>

<style scoped>
section {
  transition: background-color 1s ease-in-out;
}

.animate__animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}

.blur-3xl {
  filter: blur(60px);
}

.transition-transform {
  transition: transform 0.5s;
}
</style>
