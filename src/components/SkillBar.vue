<template>
  <div class="mb-4">
    <div class="flex justify-between mb-1">
      <span class="text-base font-medium text-blue-700 dark:text-blue-300">{{ skill }}</span>
      <span class="text-sm font-medium text-blue-700 dark:text-blue-300">{{ percentage }}%</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        class="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
        :style="{ width: `${percentage}%` }"
        ref="bar"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  skill: String,
  percentage: Number
})

const bar = ref(null)

onMounted(() => {
  const { stop } = useIntersectionObserver(bar, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      bar.value.style.width = `${props.percentage}%`
      stop()
    }
  })
})
</script>