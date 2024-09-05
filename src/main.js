import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './index.css'
import { MotionPlugin } from '@vueuse/motion'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { registerSW } from 'virtual:pwa-register'

// Import your components here
import Home from './components/Home.vue'
import About from './components/About.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import ProjectDetails from './components/ProjectDetails.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
    },
    {
      path: '/projects/:id',
      name: 'ProjectDetails',
      component: ProjectDetails,
      props: true,
    },
    { path: '/contact', component: Contact },
  ],
})

AOS.init({
  duration: 1000,
  once: true,
  mirror: false,
})

const app = createApp(App)
app.use(router)
app.use(MotionPlugin)
app.use(Toast)

// Register service worker
const updateSW = registerSW({
  onNeedRefresh() {
    console.log('New content available, please refresh.')
    // You can implement a user prompt here if desired
  },
  onOfflineReady() {
    console.log('App is ready for offline use.')
    // You can show a toast notification here if desired
  },
})

app.mount('#app')
