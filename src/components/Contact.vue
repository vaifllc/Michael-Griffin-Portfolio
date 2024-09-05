<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-500 to-green-500 dark:from-cyan-500 dark:to-blue-700">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-5xl font-bold mb-12 text-center text-white animate__animated animate__fadeInDown">
        Let's Connect
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Contact Info Section -->
        <div class="space-y-8 animate__animated animate__fadeInLeft">
          <h2 class="text-3xl font-semibold text-white">Get in Touch</h2>
          <p class="text-xl text-gray-200 leading-relaxed">
            I'm always excited to connect, collaborate, and discuss new opportunities. Don't hesitate to reach out!
          </p>

          <div class="space-y-6">
            <a href="mailto:michael@vaif.tech" class="flex items-center group">
              <div class="bg-white p-3 rounded-full mr-4 transform group-hover:scale-110 transition duration-300">
                <Icon icon="mdi:email" class="text-3xl text-blue-500" />
              </div>
              <span class="text-lg text-blue-200 group-hover:text-blue-400 transition duration-300">michael@vaif.tech</span>
            </a>
            <a href="https://www.linkedin.com/in/michael-griffin-936840146/" target="_blank" rel="noopener noreferrer" class="flex items-center group">
              <div class="bg-white p-3 rounded-full mr-4 transform group-hover:scale-110 transition duration-300">
                <Icon icon="mdi:linkedin" class="text-3xl text-blue-500" />
              </div>
              <span class="text-lg text-blue-200 group-hover:text-blue-400 transition duration-300">LinkedIn Profile</span>
            </a>
            <a href="https://github.com/vaifllc" target="_blank" rel="noopener noreferrer" class="flex items-center group">
              <div class="bg-white p-3 rounded-full mr-4 transform group-hover:scale-110 transition duration-300">
                <Icon icon="mdi:github" class="text-3xl text-blue-500" />
              </div>
              <span class="text-lg text-blue-200 group-hover:text-blue-400 transition duration-300">GitHub Profile</span>
            </a>
          </div>
        </div>

        <!-- Contact Form Section -->
        <form @submit.prevent="handleSubmit" class="space-y-6 animate__animated animate__fadeInRight bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
          <h2 class="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Send a Message</h2>

          <div class="relative">
    <input type="text" id="name" v-model="form.name" required class="peer w-full border-b-2 border-gray-300 text-white focus:outline-none focus:border-blue-600 placeholder-transparent pt-3 pb-2 px-0 text-lg transition duration-300 bg-transparent" placeholder="Your Name" />            <label for="name" class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Your Name</label>
          </div>

          <div class="relative">
<input type="email" id="email" v-model="form.email" required class="peer w-full border-b-2 border-gray-300 text-white focus:outline-none focus:border-blue-600 placeholder-transparent pt-3 pb-2 px-0 text-lg transition duration-300 bg-transparent" placeholder="Your Email" />            <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Your Email</label>
          </div>

          <div class="relative">
<textarea id="message" v-model="form.message" rows="4" required class="peer w-full border-b-2 border-gray-300 text-white focus:outline-none focus:border-blue-600 placeholder-transparent pt-3 pb-2 px-0 text-lg transition duration-300 bg-transparent resize-none" placeholder="Your Message"></textarea>            <label for="message" class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Your Message</label>
          </div>

          <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed" :disabled="isSubmitting">
            <span v-if="!isSubmitting">Send Message</span>
            <span v-else class="flex items-center justify-center">
              <Icon icon="mdi:loading" class="animate-spin mr-2" />
              Sending...
            </span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMotion } from '@vueuse/motion'
import { Icon } from '@iconify/vue'
import { useToast } from 'vue-toastification'
import emailjs from '@emailjs/browser'

useMotion()
const toast = useToast()

const form = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true

  try {
    const result = await emailjs.send(
      'service_57i4ogo',
      'template_xnctifg',
      {
        from_name: form.value.name,
        from_email: form.value.email,
        message: form.value.message
      },
      '6br3wCh-84cOYQ0Xn'
    )

    console.log('Email sent successfully:', result.text)
    toast.success('Message sent successfully!')

    // Reset the form
    form.value = {
      name: '',
      email: '',
      message: ''
    }
  } catch (error) {
    console.error('Failed to send email:', error)
    toast.error('Failed to send message. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.animate__animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.min-h-screen {
  background-size: 200% 200%;
  animation: gradientBG 15s ease infinite;
}
</style>