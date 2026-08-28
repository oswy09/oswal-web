<template>
  <img
    :src="optimizedSrc"
    :alt="alt"
    :class="imageClass"
    :style="style"
    :loading="loading"
    :decoding="decoding"
    :fetchpriority="fetchpriority"
    @load="onLoad"
    @error="onError"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  src: string
  alt: string
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'auto' | 'jpg' | 'png'
  loading?: 'lazy' | 'eager'
  decoding?: 'async' | 'sync' | 'auto'
  fetchpriority?: 'high' | 'low' | 'auto'
  imageClass?: string
  style?: string
  crop?: 'scale' | 'fill' | 'fit' | 'crop'
}

const props = withDefaults(defineProps<Props>(), {
  width: 400,
  height: undefined,
  quality: 80,
  format: 'webp',
  loading: 'lazy',
  decoding: 'async',
  fetchpriority: 'auto',
  imageClass: '',
  style: '',
  crop: 'scale'
})

const emit = defineEmits<{
  load: [event: Event]
  error: [event: Event]
}>()

// Generate optimized Cloudinary URL
const optimizedSrc = computed(() => {
  // Check if the image is from Cloudinary
  if (!props.src.includes('cloudinary.com')) {
    return props.src
  }

  // Build Cloudinary transformations
  const transformations = []
  
  // Add crop mode
  transformations.push(`c_${props.crop}`)
  
  // Add width
  if (props.width) {
    transformations.push(`w_${props.width}`)
  }
  
  // Add height if specified
  if (props.height) {
    transformations.push(`h_${props.height}`)
  }
  
  // Add format
  transformations.push(`f_${props.format}`)
  
  // Add quality
  transformations.push(`q_${props.quality}`)
  
  // Add auto optimization
  transformations.push('q_auto')
  
  // Insert transformations into Cloudinary URL
  const transformationString = transformations.join(',')
  
  // Replace /upload/ with /upload/{transformations}/
  return props.src.replace('/upload/', `/upload/${transformationString}/`)
})

const onLoad = (event: Event) => {
  emit('load', event)
}

const onError = (event: Event) => {
  emit('error', event)
  console.warn('Failed to load image:', props.src)
}
</script>

<style scoped>
img {
  transition: opacity 0.3s ease;
}

img[loading="lazy"] {
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
</style>