<template>
  <div class="scene">
    <!-- Vertical Lines Background -->
    <div class="vertical-lines">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>

    <!-- Floor (only shown during elevator animation) -->
    <div v-if="showElevator" class="floor" id="floor">
      <div class="lines"></div>
      <div class="diagonal-lines"></div>
      <div class="perspective-lines">
        <div v-for="n in 15" :key="n" class="perspective-line"></div>
      </div>
      <div class="horizontal-lines">
        <div v-for="n in 10" :key="n" class="horizontal-line"></div>
      </div>
      <div class="overlay"></div>
    </div>

    <!-- Close Button -->
    <router-link to="/" class="close-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </router-link>

    <!-- Sound Control -->
    <button 
      @click="toggleSounds" 
      :class="['sound-control-btn', { active: soundsEnabled }]"
      :title="soundsEnabled ? 'Desactivar sonidos del elevador' : 'Activar sonidos del elevador'"
    >
      <svg v-if="soundsEnabled" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg v-else viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <!-- Elevator Section -->
    <Transition name="fade">
      <div v-if="showElevator" class="elevator-container">
        <!-- Left Shaft Wall -->
        <div class="shaft-wall wall-left">
          <div class="wall-texture" :class="{ 'tex-move-up': isMoving && direction === 'up', 'tex-move-down': isMoving && direction === 'down' }"></div>
          <div class="wall-accent-line"></div>
          <div class="plant-wrap">
            <svg class="plant-svg" viewBox="0 0 80 150" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 110 L18 142 L62 142 L56 110 Z" fill="#b5562a" opacity="0.92"/>
              <rect x="14" y="105" width="52" height="8" rx="4" fill="#8f4320"/>
              <ellipse cx="40" cy="109" rx="22" ry="5" fill="#120b30" opacity="0.55"/>
              <path d="M40 106 Q36 90 40 72" stroke="#3d6e22" stroke-width="2.5" fill="none" stroke-linecap="round"/>
              <g class="plant-foliage">
                <path d="M39 96 Q14 84 8 60 Q26 55 38 80 Z" fill="#376022"/>
                <path d="M41 89 Q66 75 70 50 Q50 47 43 75 Z" fill="#44782b"/>
                <path d="M39 78 Q33 57 40 38 Q49 58 43 76 Z" fill="#509436"/>
                <path d="M39 88 Q18 85 14 70 Q30 72 39 84 Z" fill="#427530" opacity="0.85"/>
                <path d="M41 85 Q62 79 64 65 Q50 69 42 81 Z" fill="#427530" opacity="0.85"/>
                <path d="M39 96 Q24 86 12 63" stroke="rgba(255,255,255,0.1)" stroke-width="1" fill="none"/>
                <path d="M41 89 Q56 77 68 52" stroke="rgba(255,255,255,0.1)" stroke-width="1" fill="none"/>
                <ellipse cx="40" cy="40" rx="5" ry="7" fill="#5faa40" opacity="0.7"/>
              </g>
            </svg>
          </div>
        </div>

        <!-- Elevator -->
        <div class="elevator" :class="{ 'is-moving': isMoving }">
          <!-- Floor Display -->
          <div class="floor-display">
            <div class="display-screen">
              <span class="floor-number">{{ currentFloor }}</span>
              <span class="floor-name">{{ getCurrentFloorName }}</span>
              <span v-if="direction === 'up'" class="arrow up">↑</span>
              <span v-if="direction === 'down'" class="arrow down">↓</span>
            </div>
          </div>

          <!-- Elevator Frame -->
          <div class="elevator-frame">
            <!-- Elevator Content -->
            <div class="elevator-content">
              <div class="elevator-inner">
                <!-- Side Rails -->
                <div class="elevator-rails">
                  <div class="rail left"></div>
                  <div class="rail right"></div>
                </div>

                <!-- Doors -->
                <div class="doors">
                  <!-- Door Frame -->
                  <div class="door-frame left"></div>
                  <div class="door-frame right"></div>

                  <!-- Actual Doors -->
                  <div class="door left" :class="{ open: isOpen }">
                    <div class="door-handle"></div>
                    <div class="door-lines">
                      <div class="line"></div>
                      <div class="line"></div>
                    </div>
                  </div>
                  <div class="door right" :class="{ open: isOpen }">
                    <div class="door-handle"></div>
                    <div class="door-lines">
                      <div class="line"></div>
                      <div class="line"></div>
                    </div>
                  </div>

                  <!-- Floor Title (shows when doors are open) -->
                  <Transition name="fade">
                    <div v-if="isOpen && showFloorTitle" class="floor-title">
                      <div class="title-content">
                        <h1>{{ getCurrentFloorName }}</h1>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Shaft Wall -->
        <div class="shaft-wall wall-right">
          <div class="wall-texture" :class="{ 'tex-move-up': isMoving && direction === 'up', 'tex-move-down': isMoving && direction === 'down' }"></div>
          <div class="wall-accent-line"></div>
          <div class="wall-lamp">
            <div class="lamp-bracket"></div>
            <div class="lamp-head">
              <div class="lamp-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Content Sections -->
    <Transition name="fade">
      <div v-if="showContent" class="content-section">
        <div v-if="currentFloor === 1" class="services-section section-content">
          <ServicesOswal />
        </div>
        <div v-if="currentFloor === 2" class="projects-section">
          <Projects />
        </div>
        <div v-if="currentFloor === 3" class="contact-section section-content">
          <Contact />
        </div>
        <div v-if="currentFloor === 4" class="about-section section-content">
          <AboutMe />
        </div>
      </div>
    </Transition>

    <!-- Motion effect during elevator movement -->
    <Transition name="speed-fade">
      <div v-if="isMoving" class="speed-overlay">
        <div class="impact-flash"></div>
        <div class="speed-streak s1"></div>
        <div class="speed-streak s2"></div>
        <div class="speed-streak s3"></div>
        <div class="speed-streak s4"></div>
        <div class="speed-streak s5"></div>
      </div>
    </Transition>

    <!-- Floor Buttons -->
    <div class="floor-buttons">
      <div class="button-panel">
        <button
          v-for="section in sections"
          :key="section.floor"
          @click="goToFloor(section)"
          :class="{ active: currentFloor === section.floor }"
          class="floor-button"
        >
          <div class="button-light" :class="{ 'is-active': currentFloor === section.floor }"></div>
          <span class="floor-number">{{ section.floor }}</span>
          <span class="floor-name">{{ section.name }}</span>
        </button>
      </div>
    </div>

    <!-- Animated Cat -->
    <Transition name="fade">
      <div v-if="showCat" class="cat-container">
        <DotLottieVue 
          class="cat-animation"
          autoplay 
          loop 
          src="https://res.cloudinary.com/ddqbnr9vo/raw/upload/v1753813352/cute-cat_lwxphl.json" 
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, computed } from 'vue'
import { useRouter } from 'vue-router'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import Projects from './Projects.vue'
import ServicesOswal from './ServicesOswal.vue'
import AboutMe from './AboutMe.vue'
import Contact from './Contact.vue'
import { elevatorSounds } from '../services/elevatorSounds'

const router = useRouter()
const props = defineProps({
  targetFloor: {
    type: Number,
    required: true
  }
})

const currentFloor = ref(props.targetFloor)
const isOpen = ref(false)
const direction = ref<'up' | 'down' | null>(null)
const isMoving = ref(false)
const showElevator = ref(true)
const showFloorTitle = ref(false)
const showContent = ref(false)
const showCat = ref(false)
const soundsEnabled = ref(true)

interface Section {
  floor: number
  name: string
  route: string
}

const sections: Section[] = [
  { floor: 1, name: 'Servicios', route: '/services' },
  { floor: 2, name: 'Proyectos', route: '/projects' },
  { floor: 3, name: 'Contacto', route: '/contact' },
  { floor: 4, name: 'Sobre mí', route: '/about' }
]

const getCurrentFloorName = computed(() => {
  const section = sections.find(s => s.floor === currentFloor.value)
  return section ? section.name : ''
})

const goToFloor = (section: Section) => {
  if (currentFloor.value === section.floor || isMoving.value) return

  showContent.value = false
  showElevator.value = true
  direction.value = section.floor > currentFloor.value ? 'up' : 'down'
  isMoving.value = true
  showFloorTitle.value = false
  showCat.value = true

  isOpen.value = false

  setTimeout(() => {
    currentFloor.value = section.floor
    router.push(section.route)

    setTimeout(() => {
      isOpen.value = true
      showFloorTitle.value = true

      setTimeout(() => {
        showContent.value = true
        showElevator.value = false
        showCat.value = false
        direction.value = null
        isMoving.value = false
      }, 2500)
    }, 1500)
  }, 1000)
}

const toggleSounds = () => {
  soundsEnabled.value = !soundsEnabled.value
  elevatorSounds.setEnabled(soundsEnabled.value)
}

onMounted(() => {
  // Mostrar el gato durante la animación inicial
  showCat.value = true
  
  setTimeout(() => {
    isOpen.value = true
    showFloorTitle.value = true
    setTimeout(() => {
      showContent.value = true
      showElevator.value = false
      showCat.value = false
      showCat.value = false
    }, 2500)
  }, 1000)
})
</script>

<style scoped>
.scene {
  width: 100%;
  height: 100vh;
  position: relative;
  perspective: 1000px;
  overflow: hidden;
  background: #F4F9FC;
}

.close-button {
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: rgba(72, 49, 212, 0.1);
  border: none;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4831D4;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
}

.sound-control-btn {
  position: fixed;
  top: 2rem;
  right: 6rem;
  background: rgba(72, 49, 212, 0.1);
  border: none;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4831D4;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.sound-control-btn svg {
  width: 20px;
  height: 20px;
}

.sound-control-btn:hover {
  background: rgba(72, 49, 212, 0.2);
  transform: scale(1.05);
}

.sound-control-btn.active {
  background: rgba(72, 49, 212, 0.8);
  color: white;
  box-shadow: 0 0 15px rgba(72, 49, 212, 0.3);
}

.sound-control-btn:active {
  transform: scale(0.95);
}

.close-button:hover {
  background: rgba(72, 49, 212, 0.2);
  transform: rotate(90deg);
}

.vertical-lines {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: space-around;
  pointer-events: none;
  z-index: 0;
}

.line {
  width: 1px;
  height: 100%;
  background-color: rgba(72, 49, 212, 0.1);
}

.floor {
  position: fixed;
  width: 150%;
  height: 75%;
  left: -25%;
  bottom: -30%;
  transform: rotateX(60deg);
  background: linear-gradient(90deg, 
    rgba(142, 170, 180, 0.8) 0%, 
    rgba(172, 196, 204, 0.8) 25%, 
    rgba(142, 170, 180, 0.8) 50%, 
    rgba(172, 196, 204, 0.8) 75%, 
    rgba(142, 170, 180, 0.8) 100%);
  z-index: 1;
}

.lines {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(to right, rgba(100, 130, 140, 0.3) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(100, 130, 140, 0.3) 1px, transparent 1px);
  background-size: 10% 10%;
}

.diagonal-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(135deg, rgba(80, 110, 120, 0.4) 25%, transparent 25%),
    linear-gradient(225deg, rgba(80, 110, 120, 0.4) 25%, transparent 25%),
    linear-gradient(315deg, rgba(80, 110, 120, 0.4) 25%, transparent 25%),
    linear-gradient(45deg, rgba(80, 110, 120, 0.4) 25%, transparent 25%);
  background-size: 20% 20%;
  opacity: 0.5;
}

.perspective-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
}

.perspective-line {
  width: 1px;
  height: 100%;
  background: linear-gradient(to bottom, 
    rgba(100, 130, 140, 0.1) 0%, 
    rgba(100, 130, 140, 0.8) 100%);
  transform-origin: bottom;
}

.perspective-line:nth-child(odd) {
  transform: perspective(800px) rotateX(60deg) scaleY(1.2);
}

.perspective-line:nth-child(even) {
  transform: perspective(800px) rotateX(60deg) scaleY(1.1);
}

.horizontal-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.horizontal-line {
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, 
    rgba(100, 130, 140, 0.1) 0%, 
    rgba(100, 130, 140, 0.8) 50%,
    rgba(100, 130, 140, 0.1) 100%);
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, 
    rgba(142, 170, 180, 0) 0%, 
    rgba(142, 170, 180, 0.3) 100%);
}

.elevator-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  z-index: 2;
}

/* Shaft Walls */
.shaft-wall {
  width: 76px;
  height: 480px;
  background: linear-gradient(180deg, #3d2eab 0%, #2e228a 50%, #3d2eab 100%);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  box-shadow:
    inset 2px 0 10px rgba(0,0,0,0.25),
    inset -2px 0 10px rgba(0,0,0,0.25),
    0 0 20px rgba(72, 49, 212, 0.2);
  flex-shrink: 0;
}

/* Subtle horizontal texture lines */
.wall-texture {
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    0deg,
    rgba(255,255,255,0.06) 0px,
    transparent 1px,
    transparent 20px
  );
}

.wall-texture.tex-move-up   { animation: texScrollUp   0.4s linear infinite; }
.wall-texture.tex-move-down { animation: texScrollDown 0.4s linear infinite; }

@keyframes texScrollUp {
  0%   { background-position-y: 0; }
  100% { background-position-y: -18px; }
}
@keyframes texScrollDown {
  0%   { background-position-y: 0; }
  100% { background-position-y: 18px; }
}

/* Thin vertical accent line down the centre of each wall */
.wall-accent-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  background: linear-gradient(to bottom,
    transparent 0%,
    rgba(204, 243, 129, 0.25) 20%,
    rgba(204, 243, 129, 0.4) 50%,
    rgba(204, 243, 129, 0.25) 80%,
    transparent 100%);
}

/* Plant (left wall) */
.plant-wrap {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
}

.plant-svg { width: 80px; height: 150px; display: block; }

.plant-foliage {
  transform-origin: 40px 108px;
  animation: plantSway 3.8s ease-in-out infinite;
}

@keyframes plantSway {
  0%, 100% { transform: rotate(-2.5deg); }
  50%       { transform: rotate(2.5deg);  }
}

/* Wall lamp (right wall) */
.wall-lamp {
  position: absolute;
  top: 38%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lamp-bracket {
  width: 3px;
  height: 28px;
  background: linear-gradient(to bottom, #9b8ee8, #6A5AE0);
  border-radius: 2px;
}

.lamp-head {
  width: 30px;
  height: 20px;
  background: linear-gradient(to bottom, #7b6dda, #5244c7);
  border-radius: 4px 4px 14px 14px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 3px;
}

.lamp-glow {
  width: 14px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 243, 180, 0.95);
  box-shadow:
    0 0 10px 4px rgba(255, 220, 90, 0.55),
    0 0 28px 10px rgba(255, 200, 50, 0.18);
  animation: lampFlicker 5s ease-in-out infinite;
}

@keyframes lampFlicker {
  0%, 100% { opacity: 1; }
  46%       { opacity: 1; }
  47%       { opacity: 0.8; }
  48%       { opacity: 1; }
  93%       { opacity: 1; }
  94%       { opacity: 0.88; }
  95%       { opacity: 1; }
}

.elevator {
  position: relative;
  width: 320px;
  transition: transform 0.3s ease;
}

.elevator.is-moving {
  animation: elevatorMovement 0.5s infinite alternate ease-in-out;
}

.floor-display {
  position: absolute;
  top: -4.2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background: #1a1a1a;
  padding: 4px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.display-screen {
  background: #000;
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #FFD700;
  font-family: "Digital-7", monospace;
  font-size: 1.2rem;
  border: 1px solid #333;
  box-shadow: 
    inset 0 0 10px rgba(255, 215, 0, 0.2),
    0 0 15px rgba(255, 215, 0, 0.1);
}

.elevator-frame {
  background: linear-gradient(145deg, #4831D4, #5D4EC7);
  padding: 1rem;
  border-radius: 1rem;
  height: 420px;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.2),
    inset 0 2px 10px rgba(255, 255, 255, 0.1);
}

.elevator-content {
  background: #6A5AE0;
  height: calc(100% - 1rem);
  border-radius: 0.5rem;
  padding: 1rem;
  position: relative;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.2);
}

.elevator-inner {
  background: #5D4EC7;
  height: 100%;
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.3);
}

.elevator-rails {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.rail {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  background: rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}

.rail.left {
  left: 10px;
}

.rail.right {
  right: 10px;
}

.doors {
  position: absolute;
  inset: 0;
  display: flex;
}

.door-frame {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 8px;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2;
}

.door-frame.left {
  left: 0;
}

.door-frame.right {
  right: 0;
}

.door {
  width: 50%;
  height: 100%;
  background: linear-gradient(135deg, #4831D4, #5D4EC7);
  position: relative;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.door.left {
  transform-origin: left;
  border-right: 2px solid rgba(255, 255, 255, 0.1);
}

.door.right {
  transform-origin: right;
}

.door.left.open {
  transform: translateX(-100%);
}

.door.right.open {
  transform: translateX(100%);
}

.door-handle {
  position: absolute;
  top: 50%;
  width: 20px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}

.door.left .door-handle {
  right: 10px;
}

.door.right .door-handle {
  left: 10px;
}

.door-lines {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 40px;
}

.door-lines .line {
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  width: 100%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.floor-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 5;
  width: 100%;
  padding: 2rem;
}

.title-content {
  opacity: 0;
  animation: titleAppear 1s ease forwards 0.3s;
}

.floor-title h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
  color: white;
  text-shadow: none;
}

/* ── Comic speed-lines overlay ─────────────────── */
.speed-fade-enter-active { transition: opacity 0.12s ease; }
.speed-fade-leave-active { transition: opacity 0.55s ease; }
.speed-fade-enter-from,
.speed-fade-leave-to     { opacity: 0; }

.speed-overlay {
  position: fixed;
  inset: 0;
  z-index: 80;
  pointer-events: none;
  overflow: hidden;
}

.impact-flash {
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.22);
  animation: impactFlash 0.28s ease-out forwards;
}

@keyframes impactFlash {
  0%   { opacity: 1; }
  100% { opacity: 0; }
}

/* Horizontal motion streaks */
.speed-streak {
  position: absolute;
  left: -120%;
  height: 2px;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent);
  animation: speedStreak linear infinite;
}

.s1 { top: 12%; width: 45%; animation-duration: 0.28s; animation-delay: 0s; }
.s2 { top: 31%; width: 70%; animation-duration: 0.22s; animation-delay: 0.06s; height: 3px; background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent); }
.s3 { top: 50%; width: 55%; animation-duration: 0.32s; animation-delay: 0.03s; }
.s4 { top: 68%; width: 80%; animation-duration: 0.25s; animation-delay: 0.09s; height: 2px; background: linear-gradient(to right, transparent, rgba(204,243,129,0.45), transparent); }
.s5 { top: 84%; width: 40%; animation-duration: 0.2s;  animation-delay: 0.12s; }

@keyframes speedStreak {
  from { transform: translateX(0); }
  to   { transform: translateX(320%); }
}

/* ── Floor buttons ──────────────────────────────── */
.floor-buttons {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(to right, #2A2356, #1F1A40);
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.2),
    inset 0 2px 10px rgba(255, 255, 255, 0.05);
  z-index: 50;
}

.button-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.floor-button {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #4831D4, #6A5AE0);
  color: white;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.2),
    inset 0 2px 5px rgba(255, 255, 255, 0.1);
}

.button-light {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.button-light.is-active {
  background: #CCF381;
  box-shadow: 0 0 10px #CCF381;
}

.floor-button:hover {
  transform: scale(1.1);
}

.floor-button.active {
  background: white;
  color: #4831D4;
  box-shadow: 
    0 0 0 3px #4831D4,
    0 4px 15px rgba(0, 0, 0, 0.2);
}

.floor-number {
  font-size: 1.2rem;
  font-weight: bold;
}

.floor-name {
  font-size: 0.7rem;
  opacity: 0.8;
}

/* Animated Cat Styles */
.cat-container {
  position: fixed;
  bottom: 8rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  pointer-events: none;
}

.cat-animation {
  width: 120px;
  height: 120px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.content-section {
  padding: 0 !important;
  max-width: none !important;
}

.about-section,
.services-section,
.projects-section {
  padding: 0 !important;
  max-width: none !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes elevatorMovement {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-3px);
  }
}

@keyframes titleAppear {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .floor-buttons {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    right: auto;
    top: auto;
    transform: translateX(-50%);
    padding: 1rem 2rem;
    border-radius: 2rem;
  }

  .button-panel {
    flex-direction: row;
    gap: 0.8rem;
  }

  .floor-button {
    width: 3.5rem;
    height: 3.5rem;
  }

  .floor-number {
    font-size: 1rem;
  }

  .display-screen .floor-name {
    font-size: 0.75rem;
    color: #CCF381;
    font-weight: 600;
  }

  .display-screen {
    padding: 0.8rem 2rem;
    font-size: 1.6rem;
    gap: 0.8rem;
  }

  .elevator {
    width: 280px;
  }

  .floor-title h1 {
    font-size: 2rem;
  }

  .cat-container {
    bottom: 12rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .cat-animation {
    width: 100px;
    height: 100px;
  }
}

@media (max-width: 480px) {
  .floor-buttons {
    bottom: 1rem;
    padding: 0.8rem 1.5rem;
  }

  .floor-button {
    width: 3rem;
    height: 3rem;
  }

  .floor-number {
    font-size: 0.9rem;
  }

  .display-screen .floor-name {
    font-size: 0.7rem;
    color: #CCF381;
    font-weight: 600;
  }

  .display-screen {
    padding: 0.8rem 2.2rem;
    font-size: 1.5rem;
    gap: 0.7rem;
  }

  .cat-container {
    bottom: 10rem;
  }

  .cat-animation {
    width: 80px;
    height: 80px;
  }
}
</style>