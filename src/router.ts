import { createRouter, createWebHistory } from 'vue-router'
import Hero from './components/Hero.vue'
import { elevatorSounds } from './services/elevatorSounds'

const LazyElevator = () => import('./components/Elevator.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Hero
  },
  {
    path: '/services',
    name: 'services',
    component: LazyElevator,
    props: { targetFloor: 1 }
  },
  {
    path: '/projects',
    name: 'projects',
    component: LazyElevator,
    props: { targetFloor: 2 }
  },
  {
    path: '/contact',
    name: 'contact',
    component: LazyElevator,
    props: { targetFloor: 3 }
  },
  {
    path: '/about',
    name: 'about',
    component: LazyElevator,
    props: { targetFloor: 4 }
  },

  {
    path: '/project/:slug',
    name: 'project-detail',
    component: () => import('./components/ProjectDetail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Mapear rutas a números de piso
const routeFloorMap: Record<string, number> = {
  'home': 0,
  'services': 1,
  'projects': 2,
  'contact': 3,
  'about': 4
}

let isNavigating = false

// Guard de navegación para sonidos del elevador
router.beforeEach(async (to, from, next) => {
  const toFloor = routeFloorMap[to.name as string] ?? -1
  const fromFloor = routeFloorMap[from.name as string] ?? -1
  
  // Solo reproducir sonidos si es navegación entre pisos del elevador
  if (toFloor >= 0 && fromFloor >= 0 && toFloor !== fromFloor && !isNavigating) {
    isNavigating = true
    
    // Reproducir sonido del elevador moviéndose
    const direction = toFloor > fromFloor ? 'up' : 'down'
    const floorDifference = Math.abs(toFloor - fromFloor)
    const movementDuration = floorDifference * 0.6 // 600ms por piso
    
    // Reproducir sonido de movimiento
    elevatorSounds.playMovingSound(direction, movementDuration)
    
    // Esperar el tiempo de movimiento antes de continuar
    setTimeout(() => {
      next()
    }, movementDuration * 1000)
  } else {
    // Navegación normal sin sonidos
    next()
  }
})

// Guard después de la navegación para sonido de llegada
router.afterEach((to, from) => {
  const toFloor = routeFloorMap[to.name as string] ?? -1
  const fromFloor = routeFloorMap[from.name as string] ?? -1
  
  // Solo reproducir "ding" si llegamos a un piso del elevador
  if (toFloor >= 0 && fromFloor >= 0 && toFloor !== fromFloor && isNavigating) {
    // Esperar un poco para que termine el sonido de movimiento
    setTimeout(() => {
      elevatorSounds.playDingSound()
      isNavigating = false
    }, 200)
  }
})

// Google Analytics - Rastreo de rutas
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

router.afterEach((to) => {
  // Rastrear cambios de página en Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-QCNHFYS3S9', {
      page_path: to.fullPath,
      page_title: to.name || to.path,
      page_location: window.location.origin + to.fullPath
    });
  }
})

export default router