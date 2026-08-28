<template>
  <div>
    <div class="cursor" ref="cursor"></div>
    <div class="cursor-follower" ref="cursorFollower"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const cursor = ref<HTMLElement | null>(null)
const cursorFollower = ref<HTMLElement | null>(null)

const updateCursor = (e: MouseEvent) => {
  if (cursor.value && cursorFollower.value) {
    cursor.value.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
    cursorFollower.value.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
  }
}

onMounted(() => {
  document.addEventListener('mousemove', updateCursor)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', updateCursor)
})
</script>

<style>

.cursor {
  width: 8px;
  height: 8px;
  background: #4831D4;
  border-radius: 100%;
  position: fixed;
  transform: translate3d(-50%, -50%, 0);
  pointer-events: none;
  z-index: 9999;
  transition: width 0.2s, height 0.2s;
  mix-blend-mode: normal;
}

.cursor-follower {
  width: 40px;
  height: 40px;
  background: rgba(72, 49, 212, 0.1);
  border: 1px solid #4831D4;
  border-radius: 100%;
  position: fixed;
  transform: translate3d(-50%, -50%, 0);
  pointer-events: none;
  z-index: 9998;
  transition: transform 0.3s ease, width 0.2s, height 0.2s;
  mix-blend-mode: normal;
}

body {
  cursor: none !important;
}

a, button, [role="button"], 
input[type="submit"], 
input[type="button"], 
input[type="reset"] {
  cursor: none !important;
}

/* Global cursor styles */
body {
  cursor: none !important;
}

a, button, [role="button"], 
input[type="submit"], 
input[type="button"], 
input[type="reset"] {
  cursor: none !important;
}
</style>